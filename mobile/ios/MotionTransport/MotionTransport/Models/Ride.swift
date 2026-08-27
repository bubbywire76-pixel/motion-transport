import Foundation
import CoreLocation

struct Ride: Codable, Identifiable {
    let id: UUID
    var riderID: UUID
    var driverID: UUID?
    var pickupLocation: Location
    var destinationLocation: Location
    var status: RideStatus
    var fare: Fare
    var scheduledTime: Date?
    var startTime: Date?
    var endTime: Date?
    var distance: Double? // in kilometers
    var duration: TimeInterval? // in seconds
    var riderRating: Int?
    var driverRating: Int?
    var cancellationReason: String?
    var createdAt: Date
    
    enum RideStatus: String, Codable {
        case requested
        case accepted
        case inProgress
        case completed
        case cancelled
    }
}

struct Location: Codable {
    var latitude: Double
    var longitude: Double
    var address: String
    
    var coordinate: CLLocationCoordinate2D {
        CLLocationCoordinate2D(latitude: latitude, longitude: longitude)
    }
}

struct Fare: Codable {
    var baseFare: Double
    var perKmRate: Double
    var perMinuteRate: Double
    var estimatedFare: Double
    var finalFare: Double?
    var paymentMethod: String
}
