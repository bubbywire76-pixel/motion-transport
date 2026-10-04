import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'

import rideRoutes from './routes/rides'
import driverRoutes from './routes/drivers'
import businessRoutes from './routes/business'
import fareRoutes from './routes/fares'
import authRoutes from './routes/auth'

dotenv.config()

const app = express()
const PORT = Number(process.env.PORT || 5000)

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  throw new Error('JWT_SECRET must be configured with at least 32 random characters')
}
if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
  throw new Error('PORT must be a valid TCP port')
}

// Middleware
app.use(helmet())
const allowedOrigins = process.env.CORS_ORIGINS
  ?.split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)
app.use(cors(allowedOrigins?.length ? { origin: allowedOrigins } : undefined))
app.use(express.json({ limit: '100kb' }))
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/rides', rideRoutes)
app.use('/api/drivers', driverRoutes)
app.use('/api/business', businessRoutes)
app.use('/api/fares', fareRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`🚀 Motion Backend running on http://localhost:${PORT}`)
})
