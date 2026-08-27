import Foundation

class AuthViewModel: ObservableObject {
    @Published var isAuthenticated = false
    @Published var currentUser: User?
    @Published var isLoading = false
    @Published var errorMessage: String?
    
    private let apiClient = APIClient.shared
    private let keychainService = KeychainService.shared
    
    init() {
        checkAuthenticationStatus()
    }
    
    func login(phoneNumber: String, password: String) async {
        DispatchQueue.main.async {
            self.isLoading = true
            self.errorMessage = nil
        }
        
        do {
            let response = try await apiClient.login(phoneNumber: phoneNumber, password: password)
            
            DispatchQueue.main.async {
                self.currentUser = response.user
                self.isAuthenticated = true
                self.isLoading = false
            }
            
            // Store token securely
            try keychainService.store(token: response.token)
        } catch {
            DispatchQueue.main.async {
                self.errorMessage = error.localizedDescription
                self.isLoading = false
            }
        }
    }
    
    func logout() async {
        do {
            try await apiClient.logout()
            
            DispatchQueue.main.async {
                self.currentUser = nil
                self.isAuthenticated = false
            }
            
            try keychainService.deleteToken()
        } catch {
            DispatchQueue.main.async {
                self.errorMessage = error.localizedDescription
            }
        }
    }
    
    private func checkAuthenticationStatus() {
        if let _ = keychainService.retrieveToken() {
            isAuthenticated = true
        }
    }
}
