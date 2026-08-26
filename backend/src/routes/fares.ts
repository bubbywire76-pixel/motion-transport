import express, { Router, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'

const router = Router()

// Fare calculation logic
const FARE_RATES: Record<string, Record<string, [number, number]>> = {
  'within-city': {
    'Keke': [600, 1500],
    'Car': [800, 2000],
    'Bus': [1500, 2500],
  },
  'within-state': {
    'Keke': [1500, 5000],
    'Car': [2000, 6500],
    'Bus': [3500, 8000],
  },
  'interstate': {
    'Keke': [5000, 20000],
    'Car': [7000, 30000],
    'Bus': [15000, 45000],
  },
}

// Calculate Fare Estimate
router.post('/estimate', [
  body('rideType').isIn(['within-city', 'within-state', 'interstate']).withMessage('Invalid ride type'),
  body('vehicleType').isIn(['Keke', 'Car', 'Bus']).withMessage('Invalid vehicle type'),
], async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const { rideType, vehicleType } = req.body

    const rates = FARE_RATES[rideType]?.[vehicleType]
    if (!rates) {
      return res.status(400).json({ error: 'Invalid combination of ride type and vehicle' })
    }

    const [minFare, maxFare] = rates

    res.json({
      rideType,
      vehicleType,
      estimatedFareRange: `₦${minFare.toLocaleString()}-₦${maxFare.toLocaleString()}`,
      minFare,
      maxFare,
      disclaimer: 'This is an estimated range only. Final fare will be confirmed by your dispatcher based on exact distance, traffic, and vehicle availability.',
      currency: 'NGN',
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to calculate fare' })
  }
})

export default router
