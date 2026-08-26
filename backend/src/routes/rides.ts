import express, { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { body, validationResult } from 'express-validator'

const router = Router()
const prisma = new PrismaClient()

// Book a Ride
router.post('/book', [
  body('riderName').notEmpty().withMessage('Rider name is required'),
  body('phone').isMobilePhone().withMessage('Valid phone number required'),
  body('pickupLocation').notEmpty().withMessage('Pickup location required'),
  body('destination').notEmpty().withMessage('Destination required'),
  body('rideType').isIn(['within-city', 'within-state', 'interstate']).withMessage('Invalid ride type'),
  body('passengers').isInt({ min: 1 }).withMessage('At least 1 passenger required'),
], async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const { riderName, phone, pickupLocation, destination, rideType, passengers, notes, dateTime } = req.body

    const rideRequest = await prisma.rideRequest.create({
      data: {
        riderName,
        phone,
        pickupLocation,
        destination,
        rideType,
        passengers,
        notes,
        scheduledTime: dateTime ? new Date(dateTime) : new Date(),
        status: 'PENDING',
      },
    })

    res.status(201).json({
      message: 'Ride request submitted successfully. Dispatcher will contact you shortly.',
      rideRequest,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to book ride' })
  }
})

// Get all ride requests (Admin)
router.get('/admin/all', async (req: Request, res: Response) => {
  try {
    const rides = await prisma.rideRequest.findMany({
      orderBy: { createdAt: 'desc' },
    })
    res.json(rides)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch ride requests' })
  }
})

// Get ride request by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const ride = await prisma.rideRequest.findUnique({
      where: { id },
    })
    if (!ride) return res.status(404).json({ error: 'Ride not found' })
    res.json(ride)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch ride' })
  }
})

// Update ride status
router.patch('/:id/status', [
  body('status').isIn(['PENDING', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']),
], async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

  try {
    const { id } = req.params
    const { status } = req.body

    const updated = await prisma.rideRequest.update({
      where: { id },
      data: { status },
    })
    res.json(updated)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update ride' })
  }
})

export default router
