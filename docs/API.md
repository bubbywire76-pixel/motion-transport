# Motion Transport - API Documentation

## Base URL
```
http://localhost:5000/api
```

## Health Check
```
GET /health
```

Response:
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T12:00:00Z"
}
```

---

## Ride Endpoints

### Book a Ride
```
POST /rides/book
```

**Request Body:**
```json
{
  "riderName": "John Doe",
  "phone": "+2348012345678",
  "pickupLocation": "Lagos",
  "destination": "Abuja",
  "rideType": "interstate",
  "passengers": 2,
  "notes": "Extra luggage",
  "dateTime": "2024-01-15T10:00:00Z"
}
```

**Response (201):**
```json
{
  "message": "Ride request submitted successfully. Dispatcher will contact you shortly.",
  "rideRequest": {
    "id": "ride_123",
    "riderName": "John Doe",
    "phone": "+2348012345678",
    "pickupLocation": "Lagos",
    "destination": "Abuja",
    "rideType": "interstate",
    "passengers": 2,
    "status": "PENDING",
    "createdAt": "2024-01-01T12:00:00Z"
  }
}
```

### Get Ride Request
```
GET /rides/:id
```

### Get All Rides (Admin)
```
GET /rides/admin/all
```

### Update Ride Status
```
PATCH /rides/:id/status
```

**Request Body:**
```json
{
  "status": "ACCEPTED"
}
```

---

## Driver Endpoints

### Register Driver
```
POST /drivers/register
```

**Request Body:**
```json
{
  "name": "Ahmed Hassan",
  "email": "ahmed@example.com",
  "phone": "+2348012345678",
  "vehicleType": "Car",
  "plateNumber": "ABC123XYZ",
  "licenseNumber": "DL123456",
  "yearsExperience": 5,
  "homeBaseCity": "Lagos",
  "interstateAvailability": true
}
```

**Response (201):**
```json
{
  "message": "Driver registration successful. Awaiting admin verification.",
  "driver": {
    "id": "driver_123",
    "name": "Ahmed Hassan",
    "email": "ahmed@example.com",
    "status": "PENDING_VERIFICATION",
    "createdAt": "2024-01-01T12:00:00Z"
  }
}
```

### Get All Drivers (Admin)
```
GET /drivers/admin/all
```

### Get Driver by ID
```
GET /drivers/:id
```

### Verify Driver (Admin)
```
PATCH /drivers/:id/verify
```

---

## Business Endpoints

### Register Business
```
POST /business/register
```

**Request Body:**
```json
{
  "businessName": "ABC Logistics",
  "contactPerson": "Jane Smith",
  "phone": "+2348012345678",
  "email": "jane@abclogistics.com",
  "address": "123 Business Street",
  "city": "Lagos",
  "logisticsNeedType": "goods-delivery",
  "expectedUsageFrequency": "DAILY"
}
```

**Response (201):**
```json
{
  "message": "Business registration submitted. Our team will contact you shortly.",
  "business": {
    "id": "biz_123",
    "businessName": "ABC Logistics",
    "email": "jane@abclogistics.com",
    "status": "PENDING_VERIFICATION",
    "createdAt": "2024-01-01T12:00:00Z"
  }
}
```

### Get All Businesses (Admin)
```
GET /business/admin/all
```

### Get Business by ID
```
GET /business/:id
```

---

## Fare Estimation Endpoints

### Get Fare Estimate
```
POST /fares/estimate
```

**Request Body:**
```json
{
  "rideType": "within-city",
  "vehicleType": "Car"
}
```

**Response (200):**
```json
{
  "rideType": "within-city",
  "vehicleType": "Car",
  "estimatedFareRange": "₦800-₦2,000",
  "minFare": 800,
  "maxFare": 2000,
  "currency": "NGN",
  "disclaimer": "This is an estimated range only. Final fare will be confirmed by your dispatcher based on exact distance, traffic, and vehicle availability."
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "errors": [
    {
      "msg": "Valid email required",
      "param": "email"
    }
  ]
}
```

### 404 Not Found
```json
{
  "error": "Ride not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Failed to book ride"
}
```

---

## Ride Types & Vehicle Types

### Ride Types
- `within-city`: Travel within the same city
- `within-state`: Travel within the same state
- `interstate`: Travel between states

### Vehicle Types
- `Keke`: Tricycle/Auto-rickshaw
- `Car`: Standard sedan or SUV
- `Bus`: Large passenger bus

### Nigerian Cities
- Lagos
- Abuja
- Ibadan
- Kano
- Port Harcourt
- Enugu
- Benin City
- Kaduna
- Etc.
