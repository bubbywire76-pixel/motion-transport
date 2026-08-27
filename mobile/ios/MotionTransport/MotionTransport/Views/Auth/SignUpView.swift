import SwiftUI

struct SignUpView: View {
    @Environment(\.dismiss) var dismiss
    @State private var name = ""
    @State private var phoneNumber = ""
    @State private var email = ""
    @State private var password = ""
    @State private var confirmPassword = ""
    @State private var userType: User.UserType = .rider
    @State private var isLoading = false
    @State private var errorMessage: String?
    
    var body: some View {
        VStack(spacing: 24) {
            // Header
            HStack {
                Button(action: { dismiss() }) {
                    HStack {
                        Image(systemName: "chevron.left")
                        Text("Back")
                    }
                    .foregroundColor(Color(red: 0.11, green: 0.30, blue: 0.24))
                }
                Spacer()
            }
            .padding(.bottom, 16)
            
            Text("Create Account")
                .font(.system(size: 24, weight: .bold))
                .frame(maxWidth: .infinity, alignment: .leading)
            
            // User Type Selection
            Picker("I am a", selection: $userType) {
                Text("Rider").tag(User.UserType.rider)
                Text("Driver").tag(User.UserType.driver)
                Text("Business").tag(User.UserType.business)
            }
            .pickerStyle(.segmented)
            
            // Form Fields
            VStack(spacing: 12) {
                TextField("Full Name", text: $name)
                    .padding(12)
                    .background(Color(red: 0.96, green: 0.95, blue: 0.91))
                    .cornerRadius(8)
                
                TextField("Phone Number", text: $phoneNumber)
                    .keyboardType(.phonePad)
                    .padding(12)
                    .background(Color(red: 0.96, green: 0.95, blue: 0.91))
                    .cornerRadius(8)
                
                TextField("Email", text: $email)
                    .keyboardType(.emailAddress)
                    .padding(12)
                    .background(Color(red: 0.96, green: 0.95, blue: 0.91))
                    .cornerRadius(8)
                
                SecureField("Password", text: $password)
                    .padding(12)
                    .background(Color(red: 0.96, green: 0.95, blue: 0.91))
                    .cornerRadius(8)
                
                SecureField("Confirm Password", text: $confirmPassword)
                    .padding(12)
                    .background(Color(red: 0.96, green: 0.95, blue: 0.91))
                    .cornerRadius(8)
            }
            
            if let error = errorMessage {
                Text(error)
                    .font(.caption)
                    .foregroundColor(.red)
                    .padding(12)
                    .background(Color.red.opacity(0.1))
                    .cornerRadius(8)
            }
            
            Spacer()
            
            // Sign Up Button
            Button(action: { /* Handle signup */ }) {
                if isLoading {
                    ProgressView()
                        .tint(.white)
                } else {
                    Text("Create Account")
                        .font(.headline)
                        .foregroundColor(.white)
                }
            }
            .frame(maxWidth: .infinity)
            .frame(height: 48)
            .background(Color(red: 0.11, green: 0.30, blue: 0.24))
            .cornerRadius(8)
            .disabled(isLoading || name.isEmpty || phoneNumber.isEmpty)
        }
        .padding(24)
        .navigationBarBackButtonHidden(true)
    }
}

#Preview {
    SignUpView()
}
