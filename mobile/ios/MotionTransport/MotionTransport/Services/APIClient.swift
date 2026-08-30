import Foundation

class APIClient {
    static let shared = APIClient()
    
    private let baseURL: URL
    private let session: URLSession
    private var authToken: String?
    
    init(baseURL: URL = URL(string: "https://api.motionapp.ng")!, session: URLSession = .shared) {
        self.baseURL = baseURL
        self.session = session
    }
    
    // MARK: - Authentication
    func login(phoneNumber: String, password: String) async throws -> AuthResponse {
        let endpoint = baseURL.appendingPathComponent("auth/login")
        var request = URLRequest(url: endpoint)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let body = ["phoneNumber": phoneNumber, "password": password]
        request.httpBody = try JSONSerialization.data(withJSONObject: body)
        
        let (data, response) = try await session.data(for: request)
        try validateResponse(response)
        return try JSONDecoder().decode(AuthResponse.self, from: data)
    }
    
    func logout() async throws {
        let endpoint = baseURL.appendingPathComponent("auth/logout")
        var request = URLRequest(url: endpoint)
        request.httpMethod = "POST"
        addAuthHeader(to: &request)
        
        let (_, response) = try await session.data(for: request)
        try validateResponse(response)
        authToken = nil
    }
    
    // MARK: - Rides
    func bookRide(pickup: Location, destination: Location) async throws -> Ride {
        let endpoint = baseURL.appendingPathComponent("rides/book")
        var request = URLRequest(url: endpoint)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        addAuthHeader(to: &request)
        
        let body = [
            "pickupLocation": pickup,
            "destinationLocation": destination
        ] as [String: Any]
        request.httpBody = try JSONSerialization.data(withJSONObject: body)
        
        let (data, response) = try await session.data(for: request)
        try validateResponse(response)
        return try JSONDecoder().decode(Ride.self, from: data)
    }
    
    func getRideDetails(_ rideID: UUID) async throws -> Ride {
        let endpoint = baseURL.appendingPathComponent("rides/\(rideID)")
        var request = URLRequest(url: endpoint)
        addAuthHeader(to: &request)
        
        let (data, response) = try await session.data(for: request)
        try validateResponse(response)
        return try JSONDecoder().decode(Ride.self, from: data)
    }
    
    func cancelRide(_ rideID: UUID, reason: String) async throws {
        let endpoint = baseURL.appendingPathComponent("rides/\(rideID)/cancel")
        var request = URLRequest(url: endpoint)
        request.httpMethod = "DELETE"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        addAuthHeader(to: &request)
        
        let body = ["reason": reason]
        request.httpBody = try JSONSerialization.data(withJSONObject: body)
        
        let (_, response) = try await session.data(for: request)
        try validateResponse(response)
    }
    
    // MARK: - Drivers
    func registerDriver(_ driver: Driver) async throws -> Driver {
        let endpoint = baseURL.appendingPathComponent("drivers/register")
        var request = URLRequest(url: endpoint)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        addAuthHeader(to: &request)
        
        let encoder = JSONEncoder()
        request.httpBody = try encoder.encode(driver)
        
        let (data, response) = try await session.data(for: request)
        try validateResponse(response)
        return try JSONDecoder().decode(Driver.self, from: data)
    }
    
    func getDriverEarnings() async throws -> Earnings {
        let endpoint = baseURL.appendingPathComponent("drivers/earnings")
        var request = URLRequest(url: endpoint)
        addAuthHeader(to: &request)
        
        let (data, response) = try await session.data(for: request)
        try validateResponse(response)
        return try JSONDecoder().decode(Earnings.self, from: data)
    }
    
    // MARK: - Helper Methods
    private func addAuthHeader(to request: inout URLRequest) {
        if let token = authToken {
            request.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
        }
    }
    
    private func validateResponse(_ response: URLResponse) throws {
        guard let httpResponse = response as? HTTPURLResponse else { return }
        
        switch httpResponse.statusCode {
        case 200...299:
            return
        case 401:
            throw APIError.unauthorized
        case 403:
            throw APIError.forbidden
        case 404:
            throw APIError.notFound
        case 500...:
            throw APIError.serverError
        default:
            throw APIError.unknown
        }
    }
}

enum APIError: Error {
    case unauthorized
    case forbidden
    case notFound
    case serverError
    case unknown
}
