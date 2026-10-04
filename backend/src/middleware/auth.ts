import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

export interface AuthenticatedRequest extends Request {
  authUser?: {
    id: string
    role: string
  }
}

export function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  const authorization = req.header('Authorization')
  const token = authorization?.match(/^Bearer\s+(.+)$/i)?.[1]

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' })
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload
    if (typeof payload.sub !== 'string' || typeof payload.role !== 'string') {
      return res.status(401).json({ error: 'Invalid authentication token' })
    }
    req.authUser = { id: payload.sub, role: payload.role }
    return next()
  } catch {
    return res.status(401).json({ error: 'Invalid or expired authentication token' })
  }
}

export function requireRole(role: string) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (req.authUser?.role !== role) {
      return res.status(403).json({ error: 'You do not have permission to do this' })
    }
    return next()
  }
}
