import { Router, Request, Response } from 'express'
import { Prisma, PrismaClient } from '@prisma/client'
import { body, validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import jwt, { SignOptions } from 'jsonwebtoken'
import { rateLimit } from 'express-rate-limit'
import { AuthenticatedRequest, requireAuth } from '../middleware/auth'

const router = Router()
const prisma = new PrismaClient({})

const accountLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many account attempts. Try again in 15 minutes.' },
})

function publicUser(user: {
  id: string
  email: string
  firstName: string
  lastName: string
  phone: string | null
  role: string
  createdAt: Date
  updatedAt: Date
}) {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone ?? undefined,
    role: user.role,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  }
}

function createToken(user: { id: string; role: string }) {
  const secret = process.env.JWT_SECRET
  if (!secret || secret.length < 32) {
    throw new Error('JWT_SECRET must be configured with at least 32 characters')
  }

  return jwt.sign({ role: user.role }, secret, {
    subject: user.id,
    expiresIn: (process.env.JWT_EXPIRY || '7d') as SignOptions['expiresIn'],
    issuer: 'motion-transport-api',
    audience: 'motion-mobile',
  })
}

router.post(
  '/signup',
  accountLimiter,
  [
    body('email').isEmail().normalizeEmail().withMessage('A valid email address is required'),
    body('password')
      .isLength({ min: 12, max: 128 })
      .withMessage('Password must be between 12 and 128 characters'),
    body('firstName').trim().isLength({ min: 1, max: 80 }).withMessage('First name is required'),
    body('lastName').trim().isLength({ min: 1, max: 80 }).withMessage('Last name is required'),
    body('phone').optional({ checkFalsy: true }).trim().isLength({ max: 32 }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, error: errors.array()[0].msg })
    }

    const { email, password, firstName, lastName, phone } = req.body
    try {
      const passwordHash = await bcrypt.hash(password, 12)
      const user = await prisma.user.create({
        data: {
          email: email.toLowerCase(),
          passwordHash,
          firstName,
          lastName,
          phone: phone || null,
        },
      })

      return res.status(201).json({
        success: true,
        data: {
          token: createToken(user),
          user: publicUser(user),
        },
      })
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        return res.status(409).json({ success: false, error: 'An account with this email already exists' })
      }
      console.error('Account registration failed:', error)
      return res.status(500).json({ success: false, error: 'Could not create account' })
    }
  },
)

router.post(
  '/login',
  accountLimiter,
  [
    body('email').isEmail().normalizeEmail().withMessage('A valid email address is required'),
    body('password').isString().isLength({ min: 1, max: 128 }).withMessage('Password is required'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, error: errors.array()[0].msg })
    }

    try {
      const user = await prisma.user.findUnique({
        where: { email: String(req.body.email).toLowerCase() },
      })
      const validPassword = user
        ? await bcrypt.compare(req.body.password, user.passwordHash)
        : false

      if (!user || !validPassword) {
        return res.status(401).json({ success: false, error: 'Email or password is incorrect' })
      }

      return res.json({
        success: true,
        data: {
          token: createToken(user),
          user: publicUser(user),
        },
      })
    } catch (error) {
      console.error('Account login failed:', error)
      return res.status(500).json({ success: false, error: 'Could not sign in' })
    }
  },
)

router.get('/me', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.authUser!.id },
    })
    if (!user) {
      return res.status(401).json({ success: false, error: 'Account no longer exists' })
    }
    return res.json({ success: true, data: publicUser(user) })
  } catch (error) {
    console.error('Account lookup failed:', error)
    return res.status(500).json({ success: false, error: 'Could not load account' })
  }
})

router.post('/logout', requireAuth, (_req: Request, res: Response) => {
  return res.json({ success: true, message: 'Signed out. Remove the token from this device.' })
})

export default router
