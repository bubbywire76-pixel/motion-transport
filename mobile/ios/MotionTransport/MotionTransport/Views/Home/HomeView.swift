import SwiftUI
import MapKit

struct HomeView: View {
    @StateObject private var locationManager = LocationManager()
    @State private var cameraPosition: MapCameraPosition = .automatic
    @State private var showBookingSheet = false
    
    var body: some View {
        ZStack {
            // Map View
            Map(position: $cameraPosition)
                .ignoresSafeArea()
            
            VStack {
                // Top Bar
                HStack {
                    VStack(alignment: .leading) {
                        Text("Your Location")
                            .font(.caption)
                            .foregroundColor(.gray)
                        Text("Lagos, Nigeria")
                            .font(.headline)
                    }
                    Spacer()
                    Image(systemName: "bell")
                        .font(.title3)
                        .foregroundColor(Color(red: 0.11, green: 0.30, blue: 0.24))
                }
                .padding(16)
                .background(Color.white)
                .cornerRadius(12)
                .shadow(radius: 4)
                .padding(12)
                
                Spacer()
                
                // Quick Actions
                VStack(spacing: 12) {
                    // Book Ride Button
                    Button(action: { showBookingSheet = true }) {
                        HStack {
                            Image(systemName: "car.fill")
                            Text("Book a Ride")
                            Spacer()
                        }
                        .font(.headline)
                        .foregroundColor(.white)
                        .padding(16)
                        .background(Color(red: 0.11, green: 0.30, blue: 0.24))
                        .cornerRadius(12)
                    }
                    
                    // Send Package Button
                    Button(action: { }) {
                        HStack {
                            Image(systemName: "box.truck.fill")
                            Text("Send a Package")
                            Spacer()
                        }
                        .font(.headline)
                        .foregroundColor(.white)
                        .padding(16)
                        .background(Color(red: 0, green: 0.2, blue: 0.4)) // Navy
                        .cornerRadius(12)
                    }
                }
                .padding(12)
            }
        }
        .sheet(isPresented: $showBookingSheet) {
            BookingSheetView(isPresented: $showBookingSheet)
        }
        .onAppear {
            locationManager.startUpdatingLocation()
        }
    }
}

#Preview {
    HomeView()
}
