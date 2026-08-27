import SwiftUI

struct BookingSheetView: View {
    @Binding var isPresented: Bool
    @State private var pickupLocation = ""
    @State private var destinationLocation = ""
    @State private var passengers = 1
    @State private var selectedTime: Date = Date()
    @State private var estimatedFare = 0.0
    
    var body: some View {
        NavigationStack {
            VStack(spacing: 20) {
                // Header
                HStack {
                    Text("Book a Ride")
                        .font(.title2)
                        .fontWeight(.bold)
                    Spacer()
                    Button(action: { isPresented = false }) {
                        Image(systemName: "xmark.circle.fill")
                            .font(.title2)
                            .foregroundColor(.gray)
                    }
                }
                
                // Location Fields
                VStack(spacing: 12) {
                    HStack {
                        Image(systemName: "location.fill")
                            .foregroundColor(Color(red: 0.11, green: 0.30, blue: 0.24))
                        TextField("Pickup Location", text: $pickupLocation)
                    }
                    .padding(12)
                    .background(Color(red: 0.96, green: 0.95, blue: 0.91))
                    .cornerRadius(8)
                    
                    HStack {
                        Image(systemName: "mappin.circle.fill")
                            .foregroundColor(Color(red: 0.83, green: 0.68, blue: 0.22))
                        TextField("Destination", text: $destinationLocation)
                    }
                    .padding(12)
                    .background(Color(red: 0.96, green: 0.95, blue: 0.91))
                    .cornerRadius(8)
                }
                
                // Passengers
                HStack {
                    Text("Passengers:")
                        .fontWeight(.semibold)
                    Spacer()
                    HStack(spacing: 12) {
                        Button(action: { if passengers > 1 { passengers -= 1 } }) {
                            Image(systemName: "minus")
                                .font(.body)
                                .foregroundColor(.white)
                                .frame(width: 28, height: 28)
                                .background(Color(red: 0.11, green: 0.30, blue: 0.24))
                                .cornerRadius(6)
                        }
                        Text("\(passengers)")
                            .fontWeight(.semibold)
                        Button(action: { passengers += 1 }) {
                            Image(systemName: "plus")
                                .font(.body)
                                .foregroundColor(.white)
                                .frame(width: 28, height: 28)
                                .background(Color(red: 0.11, green: 0.30, blue: 0.24))
                                .cornerRadius(6)
                        }
                    }
                }
                .padding(12)
                .background(Color(red: 0.96, green: 0.95, blue: 0.91))
                .cornerRadius(8)
                
                // Estimated Fare
                HStack {
                    Text("Estimated Fare:")
                        .fontWeight(.semibold)
                    Spacer()
                    Text("₦\(String(format: "%.2f", estimatedFare))")
                        .fontWeight(.bold)
                        .foregroundColor(Color(red: 0.83, green: 0.68, blue: 0.22))
                }
                .padding(12)
                .background(Color(red: 0.96, green: 0.95, blue: 0.91))
                .cornerRadius(8)
                
                Spacer()
                
                // Book Button
                Button(action: { }) {
                    Text("Confirm Booking")
                        .font(.headline)
                        .foregroundColor(.white)
                }
                .frame(maxWidth: .infinity)
                .frame(height: 48)
                .background(Color(red: 0.11, green: 0.30, blue: 0.24))
                .cornerRadius(8)
            }
            .padding(20)
        }
    }
}

#Preview {
    BookingSheetView(isPresented: .constant(true))
}
