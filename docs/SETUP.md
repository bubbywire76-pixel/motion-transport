# Motion Transport - Setup & Installation Guide

## Prerequisites

- Node.js 18+ (https://nodejs.org/)
- PostgreSQL 14+ (https://www.postgresql.org/)
- Git
- npm or yarn package manager

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/bubbywire76-pixel/motion-transport.git
cd motion-transport
```

### 2. Install Dependencies

```bash
npm install
```

This will install dependencies for both frontend and backend (monorepo setup).

### 3. Setup Environment Variables

#### Backend Configuration

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` with your database credentials:

```env
PORT=5000
NODE_ENV=development
DATABASE_URL="postgresql://username:password@localhost:5432/motion_db"
JWT_SECRET=your_super_secret_key_here_change_in_production
JWT_EXPIRY=7d
FRONTEND_URL=http://localhost:3000
```

#### Frontend Configuration

```bash
cd ../frontend
touch .env.local
```

Edit `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_NAME=Motion
```

### 4. Setup PostgreSQL Database

```bash
# Create database
createdb motion_db

# Or via psql
psql -U postgres
CREATE DATABASE motion_db;
```

### 5. Run Database Migrations

```bash
cd backend
npm run db:migrate
```

This will create all necessary tables defined in `prisma/schema.prisma`.

### 6. Start Development Servers

#### Option A: Run both together

```bash
npm run dev
```

This starts:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

#### Option B: Run separately

```bash
# Terminal 1 - Frontend
cd frontend
npm run dev
# Opens on http://localhost:3000

# Terminal 2 - Backend
cd backend
npm run dev
# Runs on http://localhost:5000
```

## Project Structure

```
motion-transport/
├── frontend/                          # Next.js frontend
│   ├── src/
│   │   ├── pages/                    # Page components
│   │   │   ├── index.tsx             # Home page
│   │   │   ├── book-ride.tsx         # Book a ride
│   │   │   ├── fare-estimate.tsx     # Fare calculator
│   │   │   ├── driver-register.tsx   # Driver registration
│   │   │   ├── business-register.tsx # Business registration
│   │   │   ├── contact.tsx           # Contact dispatcher
│   │   │   └── about.tsx             # About Motion
│   │   └── styles/
│   │       └── globals.css           # Global styles
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   └── next.config.js
│
├── backend/                           # Node.js/Express API
│   ├── src/
│   │   ├── routes/
│   │   │   ├── rides.ts              # Ride endpoints
│   │   │   ├── drivers.ts            # Driver endpoints
│   │   │   ├── business.ts           # Business endpoints
│   │   │   └── fares.ts              # Fare calculation
│   │   └── index.ts                  # Main server file
│   ├── prisma/
│   │   └── schema.prisma             # Database schema
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── .env (create this)
│
├── docs/
│   ├── API.md                        # API documentation
│   ├── DATABASE.md                   # Database schema
│   └── SETUP.md                      # This file
│
├── package.json                       # Monorepo root
└── README.md
```

## Available Scripts

### Root Commands

```bash
npm run dev              # Start both frontend and backend
npm run build            # Build both frontend and backend
npm start                # Start production backend
npm run lint             # Lint all code
```

### Frontend Commands

```bash
cd frontend
npm run dev              # Development server (port 3000)
npm run build            # Build for production
npm start                # Start production server
npm run lint             # Lint code
tsconfig check           # Type check
```

### Backend Commands

```bash
cd backend
npm run dev              # Development server (port 5000)
npm run build            # Compile TypeScript
npm start                # Start production server
npm run lint             # Lint code
npm run db:migrate       # Run database migrations
npm run db:push          # Push schema to database
npm run db:studio        # Open Prisma Studio (visual DB editor)
```

## Database Management

### View Database in Prisma Studio

```bash
cd backend
npm run db:studio
```

Opens interactive database viewer at http://localhost:5555

### Create New Migration

```bash
cd backend
npx prisma migrate dev --name add_new_field
```

### Reset Database (Development Only)

```bash
cd backend
npx prisma migrate reset
```

## Testing API Endpoints

Use Postman, Insomnia, or cURL to test endpoints:

```bash
# Health check
curl http://localhost:5000/api/health

# Book a ride
curl -X POST http://localhost:5000/api/rides/book \
  -H "Content-Type: application/json" \
  -d '{
    "riderName": "John Doe",
    "phone": "+2348012345678",
    "pickupLocation": "Lagos",
    "destination": "Abuja",
    "rideType": "interstate",
    "passengers": 2
  }'
```

See `docs/API.md` for complete endpoint documentation.

## Build for Production

### Frontend

```bash
cd frontend
npm run build
npm start
```

### Backend

```bash
cd backend
npm run build
NODE_ENV=production npm start
```

## Troubleshooting

### Database Connection Error

Check your `DATABASE_URL` in `backend/.env`:

```bash
# Test connection
psql "postgresql://username:password@localhost:5432/motion_db"
```

### Port Already in Use

Change PORT in `.env`:

```env
PORT=5001  # Use different port
```

### Module Not Found Errors

Reinstall dependencies:

```bash
rm -rf node_modules
npm install
```

### Prisma Issues

Regenerate Prisma client:

```bash
cd backend
npx prisma generate
```

## Deployment

See individual deployment guides:
- Frontend: Deploy to Vercel, Netlify, or your hosting
- Backend: Deploy to Heroku, Railway, AWS, or your server

Update environment variables on your hosting platform accordingly.

## Support

For issues or questions:
- GitHub Issues: https://github.com/bubbywire76-pixel/motion-transport/issues
- Email: support@motionapp.ng
