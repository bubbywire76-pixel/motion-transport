# Motion Transport

**Motion** is Nigeria's premium ride-hailing and logistics platform connecting business owners, dispatchers, and motorists nationwide.

## Tagline
*Book Your Ride, Move With Ease*

## Project Structure

```
motion-transport/
├── frontend/              # Next.js + React UI
├── backend/               # Node.js + Express API
├── docs/                  # Documentation
└── README.md
```

## Features

- 🏠 **Home Screen** - Motion branding, quick-access navigation
- 🚕 **Book a Ride** - Nationwide coverage across Nigerian cities
- 💰 **Fare Estimate** - Transparent pricing for within-city, within-state, and interstate rides
- 👨‍💼 **Driver Registration** - Motorist onboarding with vehicle details
- 🏢 **Business Registration** - Logistics and fleet management
- 📞 **Contact Dispatch** - Direct dispatcher communication
- ⚙️ **Admin Dashboard** - Ride requests, registrations, dispatcher alerts

## Design System

- **Primary Color:** Deep emerald green (`#1B4D3E`) / Midnight navy (`#0F2438`)
- **Accent Color:** Warm gold/champagne (`#D4AF37`)
- **Background:** Cream/off-white (`#F5F1E8`)
- **Text:** Charcoal (`#2C2C2C`)
- **Typography:** Serif headings (Georgia) + Sans-serif body (Inter/Poppins)

## Tech Stack

### Frontend
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- React Hook Form
- Zustand (state management)

### Backend
- Node.js + Express
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Nodemailer / Twilio (notifications)

### Database
- PostgreSQL with Prisma

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/bubbywire76-pixel/motion-transport.git
cd motion-transport

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run migrations
npm run db:migrate --workspace=backend

# Start development server
npm run dev
```

### Available Scripts

- `npm run dev` - Start frontend and backend in development mode
- `npm run build` - Build both frontend and backend
- `npm start` - Start production backend
- `npm run lint` - Lint all code

## Database Schema

See `/backend/prisma/schema.prisma` for complete schema.

### Core Tables
- **users** - Riders, drivers, businesses
- **ride_requests** - Booking requests
- **drivers** - Driver profiles
- **businesses** - Business registrations
- **fare_estimates** - Pricing calculations
- **dispatcher_alerts** - Notifications

## API Endpoints

See `/backend/docs/API.md` for complete API documentation.

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For support, contact: support@motionapp.ng
