# Motion Transport - Database Schema Documentation

## Overview
PostgreSQL database with Prisma ORM for type-safe database access.

## Tables

### RideRequest
Stores all ride booking requests from users.

```prisma
model RideRequest {
  id              String   @id @default(cuid())
  riderName       String
  phone           String
  pickupLocation  String
  destination     String
  rideType        String   // within-city, within-state, interstate
  passengers      Int
  notes           String?
  status          String   @default("PENDING")
  scheduledTime   DateTime?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

**Status Values:** PENDING, ACCEPTED, IN_PROGRESS, COMPLETED, CANCELLED

### Driver
Driver/Motorist profiles and verification status.

```prisma
model Driver {
  id                      String   @id @default(cuid())
  name                    String
  email                   String   @unique
  phone                   String
  vehicleType             String   // Keke, Car, Bus
  plateNumber             String   @unique
  licenseNumber           String   @unique
  yearsExperience         Int
  homeBaseCity            String
  interstateAvailability  Boolean  @default(false)
  status                  String   @default("PENDING_VERIFICATION")
  createdAt               DateTime @default(now())
  updatedAt               DateTime @updatedAt
}
```

**Status Values:** PENDING_VERIFICATION, VERIFIED, REJECTED, SUSPENDED

### Business
Business/Corporate registration for fleet and logistics services.

```prisma
model Business {
  id                      String   @id @default(cuid())
  businessName            String
  contactPerson           String
  phone                   String
  email                   String   @unique
  address                 String
  city                    String
  logisticsNeedType       String   // staff-transport, goods-delivery, regular-dispatch
  expectedUsageFrequency  String   @default("MONTHLY")
  status                  String   @default("PENDING_VERIFICATION")
  createdAt               DateTime @default(now())
  updatedAt               DateTime @updatedAt
}
```

**Status Values:** PENDING_VERIFICATION, VERIFIED, REJECTED, ACTIVE

### FareEstimate
Fare pricing matrix for different ride types and vehicle types.

```prisma
model FareEstimate {
  id          String   @id @default(cuid())
  rideType    String   // within-city, within-state, interstate
  vehicleType String   // Keke, Car, Bus
  minFare     Int      // in Naira
  maxFare     Int      // in Naira
  currency    String   @default("NGN")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### DispatcherAlert
Notification system for dispatcher alerts.

```prisma
model DispatcherAlert {
  id            String   @id @default(cuid())
  dispatcherId  String
  rideRequestId String
  message       String
  status        String   @default("PENDING")
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

**Status Values:** PENDING, SENT, DELIVERED

## Migrations

### Initial Setup
```bash
npm run db:migrate
```

### Push Schema (Development)
```bash
npm run db:push
```

### View Database
```bash
npm run db:studio
```

## Indexing Strategy

- **RideRequest:** Indexed by status and createdAt for efficient filtering and sorting
- **Driver:** Indexed by status and homeBaseCity for verification workflows and location-based queries
- **Business:** Indexed by status and city for verification and regional analysis
- **DispatcherAlert:** Indexed by status and dispatcherId for alert management
