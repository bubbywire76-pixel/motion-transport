import SwiftUI

struct LoginView: View {
    @StateObject private var viewModel = AuthViewModel()
    @State private var phoneNumber = ""
    @State private var password = ""
    @State private var showPassword = false
    
    var body: some View {
        NavigationStack {
            VStack(spacing: 24) {
                // Header
                VStack(spacing: 8) {
                    Text("Motion Transport")
                        .font(.system(size: 28, weight: .bold, design: .default))
                        .foregroundColor(Color(red: 0.11, green: 0.30, blue: 0.24)) // Emerald green
                    Text("Nigeria's Premium Ride-Hailing")
                        .font(.subheadline)
                        .foregroundColor(.gray)
                }
                .padding(.top, 40)
                .padding(.bottom, 32)
                
                // Form Fields
                VStack(spacing: 16) {
                    // Phone Number
                    TextField("Phone Number", text: $phoneNumber)
                        .keyboardType(.phonePad)
                        .textContentType(.telephoneNumber)
                        .padding(12)
                        .background(Color(red: 0.96, green: 0.95, blue: 0.91)) // Cream
                        .cornerRadius(8)
                    
                    // Password
                    HStack {
                        if showPassword {
                            TextField("Password", text: $password)
                        } else {
                            SecureField("Password", text: $password)
                        }
                        
                        Button(action: { showPassword.toggle() }) {
                            Image(systemName: showPassword ? "eye.slash" : "eye")
                                .foregroundColor(.gray)
                        }
                    }
                    .padding(12)
                    .background(Color(red: 0.96, green: 0.95, blue: 0.91))
                    .cornerRadius(8)
                }
                
                // Error Message
                if let error = viewModel.errorMessage {
                    Text(error)
                        .font(.caption)
                        .foregroundColor(.red)
                        .padding(12)
                        .background(Color.red.opacity(0.1))
                        .cornerRadius(8)
                }
                
                Spacer()
                
                // Login Button
                Button(action: {
                    Task {
                        await viewModel.login(phoneNumber: phoneNumber, password: password)
                    }
                }) {
                    if viewModel.isLoading {
                        ProgressView()
                            .tint(.white)
                    } else {
                        Text("Sign In")
                            .font(.headline)
                            .foregroundColor(.white)
                    }
                }
                .frame(maxWidth: .infinity)
                .frame(height: 48)
                .background(Color(red: 0.11, green: 0.30, blue: 0.24))
                .cornerRadius(8)
                .disabled(viewModel.isLoading || phoneNumber.isEmpty || password.isEmpty)
                
                // Sign Up Link
                HStack {
                    Text("Don't have an account?")
                        .foregroundColor(.gray)
                    NavigationLink("Sign Up") {
                        SignUpView()
                    }
                    .foregroundColor(Color(red: 0.83, green: 0.68, blue: 0.22)) // Gold
                }
            }
            .padding(24)
            .navigationBarBackButtonHidden(true)
        }
    }
}

#Preview {
    LoginView()
}
