# Motion Transport iOS App

Nigeria's premium ride-hailing and logistics platform - Native iOS Application.

## Overview

This is the native iOS application for Motion Transport, built with SwiftUI and targeting iOS 15+. The app supports ride booking, driver registration, real-time tracking, and business fleet management.

## Tech Stack

- **Language:** Swift 5.9+
- **UI Framework:** SwiftUI
- **Architecture:** MVVM
- **Networking:** URLSession / Alamofire
- **Database:** Core Data / Realm
- **Maps:** MapKit / Google Maps
- **Push Notifications:** APNs (Apple Push Notification service)
- **Authentication:** JWT + Keychain
- **Build System:** Xcode 15+

## Project Structure

```
mobile/ios/MotionTransport/
├── MotionTransport/
│   ├── MotionTransportApp.swift          # App entry point
│   ├── ContentView.swift                 # Root view
│   ├── Models/                           # Data models
│   │   ├── User.swift
│   │   ├── Ride.swift
│   │   └── Driver.swift
│   ├── ViewModels/                       # MVVM view models
│   │   └── AuthViewModel.swift
│   ├── Views/                            # UI Screens
│   │   ├── Auth/
│   │   │   ├── LoginView.swift
│   │   │   └── SignUpView.swift
│   │   └── Home/
│   │       ├── HomeView.swift
│   │       └── BookingSheetView.swift
│   ├── Services/                         # Business logic
│   │   ├── APIClient.swift               # API communication
│   │   ├── LocationManager.swift         # Location services
│   │   └── KeychainService.swift         # Secure storage
│   └── Utilities/
│       └── Constants.swift               # App constants & colors
├── Tests/
│   └── AuthViewModelTests.swift          # Unit tests
├── Podfile                               # CocoaPods dependencies
└── README.md                             # This file
```

## Features

### Authentication
- [ ] Login/Signup for riders, drivers, and business users
- [ ] Phone number verification with OTP
- [ ] Biometric authentication (Face ID, Touch ID)
- [ ] Secure JWT token management

### Rider Features
- [ ] Home screen with quick-access buttons
- [ ] Book a Ride form with location autocomplete
- [ ] Real-time ride tracking with animated map
- [ ] Fare calculator with visual breakdown
- [ ] Ride history with filters and search
- [ ] Rating and review drivers
- [ ] Emergency SOS button
- [ ] Saved places (home, work, favorites)

### Driver Features
- [ ] Driver registration with document upload
- [ ] Verification workflow with selfie capture
- [ ] Accept/reject ride requests
- [ ] Real-time turn-by-turn navigation
- [ ] Earnings dashboard with statistics
- [ ] Trip history and detailed reports
- [ ] Document verification tracking

### Business Features
- [ ] Business registration and verification
- [ ] Admin dashboard with KPIs
- [ ] Fleet management interface
- [ ] Bulk booking for staff transport
- [ ] Invoice and billing management
- [ ] Analytics and reporting

### General Features
- [ ] Real-time in-app messaging
- [ ] Push notifications for ride updates
- [ ] Offline mode (cached data viewing)
- [ ] Multi-language support (English, Yoruba, Hausa)
- [ ] Accessibility features (VoiceOver, Dynamic Type)
- [ ] Dark mode support

## Getting Started

### Requirements
- Xcode 15.0 or later
- iOS 15.0 or later
- Swift 5.9 or later
- Cocoapods

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bubbywire76-pixel/motion-transport.git
   cd motion-transport/mobile/ios/MotionTransport
   ```

2. **Install dependencies**
   ```bash
   pod install
   ```

3. **Open the workspace**
   ```bash
   open MotionTransport.xcworkspace
   ```

4. **Configure API**
   - Copy `APIConstants.swift` and set your API base URL
   - Create a `.env` file with required environment variables

5. **Build and Run**
   - Select the MotionTransport target
   - Select your simulator or device
   - Press Cmd+R to build and run

## Development

### Code Style
- Follow [Swift API Design Guidelines](https://swift.org/documentation/api-design-guidelines/)
- Use 4 spaces for indentation
- Use descriptive variable and function names
- Write meaningful comments for complex logic

### Adding New Features

1. Create feature branch: `git checkout -b feat/feature-name`
2. Implement feature following MVVM architecture
3. Add unit tests with 80%+ coverage
4. Create pull request with detailed description

### Testing

```bash
# Run all tests
xcodebuild test -workspace MotionTransport.xcworkspace -scheme MotionTransport -destination 'platform=iOS Simulator,name=iPhone 15'

# Run specific test class
xcodebuild test -workspace MotionTransport.xcworkspace -scheme MotionTransport -only-testing:MotionTransportTests/AuthViewModelTests
```

## API Integration

The app communicates with the Motion Transport backend API. See `Services/APIClient.swift` for implemented endpoints:

- `POST /auth/login` - User authentication
- `POST /auth/logout` - User logout
- `POST /rides/book` - Book a ride
- `GET /rides/:id` - Get ride details
- `POST /drivers/register` - Register as driver
- `GET /drivers/earnings` - Get driver earnings

## Performance Benchmarks

- App launch time: < 3 seconds
- API response handling: < 2 seconds
- Memory footprint: < 150MB
- Offline functionality: Critical features available
- Battery optimization: Background tracking optimized

## Security

- All API communication uses TLS 1.3
- JWT tokens stored securely in Keychain
- Request signing and validation
- Certificate pinning for API calls
- No sensitive data in logs
- Secure file upload for documents

## Deployment

### Staging (TestFlight)
```bash
xcodebuild archive -workspace MotionTransport.xcworkspace -scheme MotionTransport -archivePath ./build/MotionTransport.xcarchive
# Upload to TestFlight via Xcode Organizer
```

### Production (App Store)
1. Update version number in Info.plist
2. Create release build
3. Archive and upload to App Store Connect
4. Submit for review
5. Wait for App Store approval

## Troubleshooting

### Pod Installation Issues
```bash
pod repo update
rm Podfile.lock
pod install
```

### Build Errors
- Clean build folder: Cmd+Shift+K
- Delete derived data: `rm -rf ~/Library/Developer/Xcode/DerivedData/*`
- Update Xcode to latest version

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- Email: ios-support@motionapp.ng
- Issues: [GitHub Issues](https://github.com/bubbywire76-pixel/motion-transport/issues)
- Docs: [Wiki](https://github.com/bubbywire76-pixel/motion-transport/wiki)

## Color Scheme

- **Primary Emerald Green:** #1B4D3E
- **Secondary Navy:** #003366
- **Accent Gold:** #D4AF37
- **Background Cream:** #F5F1E8
