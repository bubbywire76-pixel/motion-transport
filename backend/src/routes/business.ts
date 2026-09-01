import express, { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { body, validationResult } from 'express-validator'

const router = Router()
const prisma = new PrismaClient()

// Register Business
router.post('/register', [
  body('businessName').notEmpty().withMessage('Business name required'),
  body('contactPerson').notEmpty().withMessage('Contact person required'),
  body('phone').isMobilePhone('any').withMessage('Valid phone required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('address').notEmpty().withMessage('Address required'),
  body('city').notEmpty().withMessage('City required'),
  body('logisticsNeedType').isIn(['staff-transport', 'goods-delivery', 'regular-dispatch']).withMessage('Invalid logistics type'),
], async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const { businessName, contactPerson, phone, email, address, city, logisticsNeedType, expectedUsageFrequency } = req.body

    // Check if business already registered
    const existing = await prisma.business.findUnique({ where: { email } })
    if (existing) return res.status(400).json({ error: 'Email already registered' })

    const business = await prisma.business.create({
      data: {
        businessName,
        contactPerson,
        phone,
        email,
        address,
        city,
        logisticsNeedType,
        expectedUsageFrequency: expectedUsageFrequency || 'MONTHLY',
        status: 'PENDING_VERIFICATION',
      },
    })

    res.status(201).json({
      message: 'Business registration submitted. Our team will contact you shortly.',
      business,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to register business' })
  }
})

// Get all businesses (Admin)
router.get('/admin/all', async (req: Request, res: Response) => {
  try {
    const businesses = await prisma.business.findMany({
      orderBy: { createdAt: 'desc' },
    })
    res.json(businesses)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch businesses' })
  }
})

// Get business by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const business = await prisma.business.findUnique({ where: { id } })
    if (!business) return res.status(404).json({ error: 'Business not found' })
    res.json(business)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch business' })
  }
})

export default router
