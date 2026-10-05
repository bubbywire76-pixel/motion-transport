# Motion Transport - React Native Mobile App

A cross-platform mobile application built with React Native and Expo for the Motion Transport ride-hailing and logistics platform in Nigeria.

## Features

- ✅ User authentication (login/signup)
- ✅ Home dashboard with quick actions
- ✅ Ride history tracking
- ✅ User profile management
- ✅ Material Design UI with React Native Paper
- ✅ JWT-based secure authentication
- ✅ Location services integration (Expo Location)
- ✅ Toast notifications
- ✅ Responsive design for iOS and Android
- ✅ TypeScript support
- ✅ Error handling and loading states
- ✅ Environment configuration (dev/staging/prod)

## Upcoming Features

- 🚀 Book a Ride screen with location services
- 🚀 Fare estimation calculator
- 🚀 Driver registration flow
- 🚀 Business registration
- 🚀 Payment methods management
- 🚀 Real-time ride tracking
- 🚀 Driver ratings and reviews
- 🚀 Offline support
- 🚀 Push notifications

## Quick Start

### Prerequisites

- Node.js 16+
- npm 7+
- Xcode 14+ (iOS) or Android Studio (Android)
- Backend running at `http://localhost:5000`

### Installation

```bash
# From project root
npm install

# Install mobile dependencies
cd mobile/react-native
npm install
```

### Development

```bash
# Start Expo dev server
npm run dev

# Or specific platform
npm run dev:ios      # iOS Simulator
npm run dev:android  # Android Emulator
npm run dev:web      # Web (preview only)
```

### Environment Setup

```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local with your API base URL
```

## Project Structure

- `/app` - Screen components and navigation
- `/components` - Reusable UI components
- `/services` - API clients and business logic
- `/context` - React Context providers
- `/theme` - Styling and theme configuration
- `/config` - Environment and app configuration
- `/types` - TypeScript type definitions
- `/assets` - Images, icons, and static files

## Technology Stack

- **Framework**: React Native with Expo
- **UI Library**: React Native Paper (Material Design)
- **Navigation**: React Navigation v6
- **State Management**: React Context + Zustand
- **API Client**: Axios
- **Authentication**: JWT
- **Storage**: Expo SecureStore (tokens), AsyncStorage
- **Location**: Expo Location
- **Notifications**: react-native-toast-message
- **Language**: TypeScript

## Building for Production

### iOS

```bash
npm run build:ios
# Follow EAS CLI prompts for submission
```

### Android

```bash
npm run build:android
# Follow EAS CLI prompts for submission
```

## Documentation

See [BUILD.md](./BUILD.md) for comprehensive setup and deployment guide.

## API Integration

The app connects to the Motion Transport backend API. Ensure the backend is running:

```bash
npm start --workspace=backend
```

Default API endpoint: `http://localhost:5000/api`

### Authentication

- User credentials are sent to `/auth/login` or `/auth/signup`
- Backend returns JWT token
- Token is securely stored and automatically included in all requests
- Token automatically cleared on 401 response

## UI/UX

### Color Scheme

- **Primary**: #008B8B (Teal)
- **Accent**: #FF8C00 (Orange)
- **Background**: #F5F5F5 (Light Gray)
- **Surface**: #FFFFFF (White)

### Accessibility

- All interactive elements have accessibility labels
- Color contrast meets WCAG standards
- Touch targets minimum 48pt x 48pt
- Support for screen readers

## Testing

### Manual Testing

1. Test on iOS Simulator and Android Emulator
2. Test on physical devices (iOS and Android)
3. Test with slow network conditions
4. Test offline functionality

### Test Credentials

Use any valid email/password combination for signup:
- Email: test@example.com
- Password: password123

## Troubleshooting

### Metro Bundler Issues

```bash
npm run dev -- --clear
```

### Clear Cache

```bash
rm -rf node_modules .expo
npm install
npm run dev
```

### Platform-Specific Rebuilds

```bash
# iOS
rm -rf ios
npx expo prebuild --clean

# Android
rm -rf android
npx expo prebuild --clean
```

See [BUILD.md](./BUILD.md) for more troubleshooting tips.

## Contributing

1. Create a feature branch: `git checkout -b feat/feature-name`
2. Follow TypeScript and React best practices
3. Test on both platforms
4. Update documentation
5. Create a pull request

## Code Style

- TypeScript for all new code
- Functional components with hooks
- Follow React Native accessibility guidelines
- Use descriptive names for variables and functions
- Add comments for complex logic

## License

This project is part of the Motion Transport platform. See LICENSE file for details.

## Support

For issues or questions, check:
1. [BUILD.md](./BUILD.md) troubleshooting section
2. Backend API documentation
3. GitHub issues
4. Project team

## Roadmap

- Q4 2024: Core booking and ride history features
- Q1 2025: Driver and business registration
- Q2 2025: Real-time tracking and notifications
- Q3 2025: Offline support and advanced features

## Related Projects

- [Motion Transport Backend](../backend)
- [Motion Transport Frontend](../frontend)
- [Motion Transport iOS](../ios) - Native iOS app
