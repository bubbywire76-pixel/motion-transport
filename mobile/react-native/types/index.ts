export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  profileImage?: string;
  role: "user" | "driver" | "business" | "admin";
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  refreshToken?: string;
  user: User;
}

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
  city?: string;
  state?: string;
  postalCode?: string;
}

export interface Ride {
  id: string;
  userId: string;
  driverId?: string;
  pickupLocation: Location;
  dropoffLocation: Location;
  rideType: "economy" | "comfort" | "premium";
  status: "pending" | "accepted" | "in_progress" | "completed" | "cancelled";
  estimatedFare: number;
  actualFare?: number;
  distance: number;
  duration: number;
  scheduledTime?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FareEstimate {
  distance: number;
  duration: number;
  baseFare: number;
  distanceFare: number;
  timeFare: number;
  surgeFare: number;
  totalFare: number;
}

export interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicleType: "Keke" | "Car" | "Bus";
  plateNumber: string;
  licenseNumber: string;
  yearsExperience: number;
  homeBaseCity: string;
  interstateAvailability: boolean;
  status: "PENDING_VERIFICATION" | "VERIFIED" | "SUSPENDED" | "REJECTED";
  createdAt: string;
  updatedAt: string;
}

export interface Business {
  id: string;
  userId: string;
  companyName: string;
  registrationNumber: string;
  taxId?: string;
  contactPerson: string;
  phoneNumber: string;
  businessType: "logistics" | "fleet" | "corporate";
  fleetSize?: number;
  status: "pending" | "approved" | "suspended";
  createdAt: string;
  updatedAt: string;
}

export interface ApiError {
  message: string;
  code?: string;
  statusCode: number;
  details?: Record<string, any>;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
}
