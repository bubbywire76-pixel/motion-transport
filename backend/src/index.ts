import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'

import rideRoutes from './routes/rides'
import driverRoutes from './routes/drivers'
import businessRoutes from './routes/business'
import fareRoutes from './routes/fares'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
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
