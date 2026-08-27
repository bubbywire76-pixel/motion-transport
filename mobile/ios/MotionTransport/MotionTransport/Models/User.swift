import Foundation

struct User: Codable, Identifiable {
    let id: UUID
    var name: String
    var email: String
    var phoneNumber: String
    var userType: UserType // rider, driver, business
    var profileImageURL: URL?
    var createdAt: Date
    var isVerified: Bool = false
    
    enum UserType: String, Codable {
        case rider
        case driver
        case business
    }
}

struct AuthResponse: Codable {
    let user: User
    let token: String
    let refreshToken: String
}
