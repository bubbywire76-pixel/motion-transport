import express, { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { body, validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'

const router = Router()
const prisma = new PrismaClient()

// Register Driver
router.post('/register', [
  body('name').notEmpty().withMessage('Name required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('phone').isMobilePhone('any').withMessage('Valid phone required'),
  body('vehicleType').isIn(['Keke', 'Car', 'Bus']).withMessage('Invalid vehicle type'),
  body('plateNumber').notEmpty().withMessage('Plate number required'),
  body('licenseNumber').notEmpty().withMessage('License number required'),
  body('yearsExperience').isInt({ min: 0 }).withMessage('Valid experience required'),
  body('homeBaseCity').notEmpty().withMessage('Home city required'),
], async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const { name, email, phone, vehicleType, plateNumber, licenseNumber, yearsExperience, homeBaseCity, interstateAvailability } = req.body

    // Check if driver already exists
    const existing = await prisma.driver.findUnique({ where: { email } })
    if (existing) return res.status(400).json({ error: 'Email already registered' })

    const driver = await prisma.driver.create({
      data: {
        name,
        email,
        phone,
        vehicleType,
        plateNumber,
        licenseNumber,
        yearsExperience,
        homeBaseCity,
        interstateAvailability: interstateAvailability || false,
        status: 'PENDING_VERIFICATION',
      },
    })

    res.status(201).json({
      message: 'Driver registration successful. Awaiting admin verification.',
      driver,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to register driver' })
  }
})

// Get all drivers (Admin)
router.get('/admin/all', async (req: Request, res: Response) => {
  try {
    const drivers = await prisma.driver.findMany({
      orderBy: { createdAt: 'desc' },
    })
    res.json(drivers)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch drivers' })
  }
})

// Get driver by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const driver = await prisma.driver.findUnique({ where: { id } })
    if (!driver) return res.status(404).json({ error: 'Driver not found' })
    res.json(driver)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch driver' })
  }
})

// Verify driver (Admin)
router.patch('/:id/verify', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const driver = await prisma.driver.update({
      where: { id },
      data: { status: 'VERIFIED' },
    })
    res.json({ message: 'Driver verified successfully', driver })
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify driver' })
  }
})

export default router
