import Foundation

struct Driver: Codable, Identifiable {
    let id: UUID
    var userID: UUID
    var licenseNumber: String
    var licenseExpiry: Date
    var vehicleRegistration: String
    var vehicleType: VehicleType
    var vehicleColor: String
    var licensePlate: String
    var verificationStatus: VerificationStatus
    var isAvailable: Bool = true
    var currentLocation: Location?
    var rating: Double = 0.0
    var totalRides: Int = 0
    var earnings: Earnings
    var documents: [Document] = []
    var createdAt: Date
    
    enum VehicleType: String, Codable {
        case sedan
        case suv
        case van
        case truck
    }
    
    enum VerificationStatus: String, Codable {
        case pending
        case verified
        case rejected
        case suspended
    }
}

struct Earnings: Codable {
    var dailyEarnings: Double
    var weeklyEarnings: Double
    var monthlyEarnings: Double
    var totalEarnings: Double
    var completedTrips: Int
    var totalDistanceCovered: Double
    var totalHoursOnline: Double
}

struct Document: Codable, Identifiable {
    let id: UUID
    var type: DocumentType
    var url: URL
    var verificationStatus: String
    var uploadedAt: Date
    
    enum DocumentType: String, Codable {
        case driverLicense
        case vehicleRegistration
        case insurance
        case inspection
    }
}
