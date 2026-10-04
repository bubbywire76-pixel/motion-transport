# Motion Transport Mobile App - Build & Deployment Guide

This guide covers setup, development, and deployment of the Motion Transport React Native mobile app.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Structure](#project-structure)
3. [Development Setup](#development-setup)
4. [Running on iOS](#running-on-ios)
5. [Running on Android](#running-on-android)
6. [Building for Production](#building-for-production)
7. [Environment Configuration](#environment-configuration)
8. [Troubleshooting](#troubleshooting)
9. [API Integration](#api-integration)
10. [Architecture](#architecture)

## Prerequisites

### System Requirements

- **Node.js**: v20 LTS (Expo SDK 50 is not compatible with the installed Node 24 runtime)
- **npm**: v7 or higher
- **Git**: Latest version

### iOS Development (macOS only)

- **Xcode**: 14.0 or higher
- **CocoaPods**: Latest version
- **iOS Simulator**: Available with Xcode

### Android Development (macOS, Linux, or Windows)

- **Android Studio**: Latest version
- **Android SDK**: API level 28 or higher
- **Android Emulator**: Available with Android Studio
- **JAVA_HOME**: Properly configured

## Project Structure

```
mobile/react-native/
├── index.ts                 # Explicit Expo entry point for the hoisted workspace
├── App.tsx                  # React Navigation root layout
├── app/                      # Screens and navigation
│   ├── _layout.tsx          # Root layout with navigation setup
│   ├── lifestyle/           # Bills, flights, and activity screens
│   ├── auth/                # Authentication screens
│   │   ├── login.tsx
│   │   └── signup.tsx
│   └── home/                # Home tab screens
│       ├── index.tsx        # Home/Dashboard screen
│       ├── profile.tsx      # User profile screen
│       └── ride-history.tsx # Ride history screen
├── components/              # Reusable UI components
│   ├── common/              # Generic components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Header.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── ErrorMessage.tsx
│   │   └── index.ts
│   └── screens/             # Screen-specific components
├── services/                # API and business logic services
│   ├── api.ts              # Axios client setup
│   ├── auth.ts             # Authentication service
│   ├── ride.ts             # Ride booking service
│   ├── lifestyle.ts        # Live biller catalog and payment checkout
│   ├── travel.ts            # Live flight search and booking checkout
│   ├── driver.ts           # Driver registration service
│   └── location.ts         # Location services
├── context/                 # React Context for state management
│   └── AuthContext.tsx     # Authentication context
├── theme/                   # Styling and theme configuration
│   └── theme.ts            # React Native Paper theme
├── config/                  # Configuration files
│   └── environment.ts      # Environment variables
├── types/                   # TypeScript type definitions
│   └── index.ts
├── assets/                  # Images, icons, fonts
├── app.json                # Expo configuration
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript configuration
└── BUILD.md               # This file
```

## Development Setup

### 1. Install Dependencies

From the project root:

```bash
npm install
```

From the mobile app directory:

```bash
cd mobile/react-native
npm install
```

Or install the specific workspace:

```bash
npm install --workspace=motion-mobile
```

### 2. Environment Configuration

Copy the environment template:

```bash
cd mobile/react-native
Copy-Item .env.example .env
```

Set `EXPO_PUBLIC_API_URL` in `.env`:

- Android emulator: `http://10.0.2.2:5000/api`
- iOS simulator: `http://localhost:5000/api`
- Physical phone: `http://<computer-LAN-IP>:5000/api`; the phone and computer must share a network.

Production and staging builds must use an HTTPS backend URL. Never put backend,
Flutterwave, or airline-provider secrets in this app configuration.

### 3. Start Backend API

Make sure the backend is running before starting the mobile app:

```bash
# From root directory
npm start --workspace=backend
```

The backend should be available at `http://localhost:5000`.

Before starting the backend, copy `backend/.env.example` to `backend/.env`,
configure `DATABASE_URL`, and generate a `JWT_SECRET` with at least 32 random
characters. Apply the Prisma migration with:

```bash
npm run db:migrate --workspace=backend
```

## Running on iOS

### Prerequisites

- macOS with Xcode installed
- iOS Simulator running (or physical device)

### Development

```bash
cd mobile/react-native
npm run dev:ios
```

Or use the generic dev command:

```bash
npm run dev
```

Then press `i` to open in iOS Simulator.

This app uses `expo-dev-client`; an installed development build is required
before the QR code can launch the native app. Link the project to an Expo
account once, then build and install a development client:

```bash
npx eas-cli@latest init
npx eas-cli@latest build --platform ios --profile development
```

### First Run

For a local native build, generate the iOS project and install CocoaPods:

```bash
cd mobile/react-native
npx expo prebuild --clean
```

### Testing on Physical Device

1. Build and install the iOS development client using the command above.
2. Set `EXPO_PUBLIC_API_URL` in `.env` to the computer's LAN address.
3. Run `npm run dev` with the phone and computer on the same Wi-Fi network.
4. Scan the QR code with the installed Motion development client.

### Building for App Store

```bash
# Link the app to your Expo account (one-time setup)
npx eas-cli@latest init

# Build for App Store
npm run build:ios
```

## Running on Android

### Prerequisites

- Android Studio installed
- Android Emulator set up (API level 28+)
- `ANDROID_HOME` environment variable configured

### Development

```bash
cd mobile/react-native
npm run dev:android
```

Or use the generic dev command:

```bash
npm run dev
```

Then press `a` to open in Android Emulator.

For a physical device, create and install an Android development client:

```bash
npx eas-cli@latest init
npx eas-cli@latest build --platform android --profile development
```

### First Run

The first run may take longer as dependencies are compiled.

### Testing on Physical Device

1. Install the Android development build from the EAS build page.
2. Set `EXPO_PUBLIC_API_URL` in `.env` to the computer's LAN address.
3. Run `npm run dev` with the phone and computer on the same Wi-Fi network.
4. Scan the QR code with the installed Motion development client.

### Building for Play Store

```bash
# Build for Google Play
npm run build:android
```

## Building for Production

Set the production `EXPO_PUBLIC_API_URL` in your EAS environment to an HTTPS
backend. EAS produces installable iOS and Android builds; `npm run build` runs
the type check and exports JavaScript bundles only.

### iOS Production Build

```bash
npm run build:ios
# Then follow EAS CLI prompts for App Store submission
```

### Android Production Build

```bash
npm run build:android
# Then follow EAS CLI prompts for Play Store submission
```

### Manual Build (without EAS)

#### iOS

```bash
cd mobile/react-native
npx expo prebuild --clean
cd ios
pod install
cd ..
xcode-select --install
```

Then open in Xcode and build.

#### Android

```bash
cd mobile/react-native
npx expo prebuild --clean
cd android
./gradlew build
```

## Environment Configuration

### Development

```env
EXPO_PUBLIC_API_URL=http://localhost:5000/api
EXPO_PUBLIC_RELEASE_CHANNEL=development
```

### Staging

```env
EXPO_PUBLIC_API_URL=https://staging-api.motionxport.com/api
EXPO_PUBLIC_RELEASE_CHANNEL=staging
```

### Production

```env
EXPO_PUBLIC_API_URL=https://api.motionxport.com/api
EXPO_PUBLIC_RELEASE_CHANNEL=production
```

## Troubleshooting

### Issue: Metro Bundler Errors

**Solution:**
```bash
npm run dev -- --clear
# Or
rm -rf node_modules .expo
npm install
```

### Issue: iOS Build Fails

**Solution:**
```bash
cd mobile/react-native
rm -rf ios
npx expo prebuild --clean
```

### Issue: Android Build Fails

**Solution:**
```bash
cd mobile/react-native
rm -rf android
npx expo prebuild --clean
```

### Issue: API Connection Fails

**Check:**
- Backend is running (`npm start --workspace=backend`)
- API_BASE_URL in .env.local is correct
- No firewall blocking localhost access
- If on physical device, use actual IP instead of localhost

### Issue: Expo Go QR Code Not Scanning

**Solution:**
- Make sure phone is on same network as development machine
- Use correct `npm run dev` command
- Check that Metro bundler started successfully
- Try restarting Expo Go

### Issue: Permissions Not Granted

**Solution:**
- iOS: Check app permissions in Settings > Motion Transport
- Android: Grant permissions when app prompts
- Or reinstall app with: `npm run dev -- --clear`

## API Integration

The backend implements account signup, login, and JWT session restoration.
Bills and flight screens make live API requests but currently have no provider
routes. They show a service-unavailable message instead of sample billers,
sample fares, or a false success state. Add Flutterwave credentials and the
provider integration to the backend before enabling real bill payments.
Provider coverage must be confirmed against the live biller catalog for each
country and service. Flight search and ticket issuance likewise require a
contracted travel provider.

The activity feature counts actual steps from the device pedometer during a
walk and saves completed walks locally. It is not an all-day background
HealthKit or Health Connect step counter.

### Authentication Flow

1. User logs in with email/password
2. Backend returns JWT token
3. Token stored securely in Expo SecureStore
4. Token automatically added to all API requests
5. On 401 response, token cleared and user redirected to login

### Making API Calls

```typescript
import apiClient from '@services/api';

// GET request
const response = await apiClient.get('/rides/estimate', {
  params: { pickupLat: 0, pickupLng: 0 }
});

// POST request
const response = await apiClient.post('/rides/book', {
  pickupLocation: {...},
  dropoffLocation: {...}
});
```

### Error Handling

All API errors are caught and formatted consistently:

```typescript
try {
  await apiClient.get('/some-endpoint');
} catch (error) {
  const message = error instanceof Error ? error.message : 'Unknown error';
  Toast.show({
    type: 'error',
    text1: 'Error',
    text2: message
  });
}
```

## Architecture

### Navigation Structure

```
Root Layout
├── Auth Stack (when not logged in)
│   ├── Login Screen
│   └── Signup Screen
└── Tab Navigator (when logged in)
    ├── Home Stack
    │   └── Home Screen (Dashboard)
    ├── Rides Tab
    │   └── Ride History Screen
    ├── Life Tab
    │   ├── Bills & Payments
    │   ├── Flights
    │   └── Daily Activity
    └── Profile Tab
        └── Profile Screen
```

### Live payments and travel

The bills and flight screens require a live Motion backend integration that
provides billers, secure payment checkout, flight search, and booking checkout.
The current backend does not yet expose these endpoints or connect to a
payment/travel provider. Until it does, the app reports the API error and does
not display sample billers or fares or claim that a payment or booking
succeeded. Keep provider credentials on the server, never in the mobile app.
Supported countries, billers, airlines, and payment methods depend on the
contracted provider and must be verified; a single integration cannot be
assumed to cover every African financial institution.

### Activity tracking

Daily activity uses the device pedometer via `expo-sensors`. The app requests
Motion access when a walk is started and saves completed walk sessions locally.
Steps are counted only while a walk is active; sensor availability varies by
device.

### State Management

- **Authentication**: React Context (AuthContext)
- **UI State**: Local component state
- **Async State**: Zustand (optional, for future expansion)

### Services Layer

- **api.ts**: Axios client with interceptors
- **auth.ts**: Login, signup, token refresh
- **ride.ts**: Ride booking, fare estimation
- **lifestyle.ts**: Billers and secure bill-payment checkout
- **travel.ts**: Live flight search and secure booking checkout
- **driver.ts**: Driver registration
- **location.ts**: Location services using Expo Location

### Theme System

- React Native Paper for Material Design
- Custom theme with Motion colors:
  - Primary: #008B8B (Teal)
  - Accent: #FF8C00 (Orange)
- Light and dark theme support (dark theme ready, light theme default)

## Development Guidelines

### Code Style

- Use TypeScript for all new code
- Use functional components with hooks
- Follow React Native accessibility guidelines
- Use descriptive variable and function names

### Component Structure

```typescript
interface ComponentProps {
  label: string;
  onPress: () => void;
  // ... other props
}

export const Component: React.FC<ComponentProps> = ({
  label,
  onPress,
  // ... other props
}) => {
  // Component implementation
};
```

### Error Handling

Always wrap async operations in try-catch:

```typescript
try {
  const result = await someAsyncOperation();
} catch (error) {
  const message = error instanceof Error ? error.message : 'Unknown error';
  console.error('Operation failed:', message);
  // Show user-friendly error
}
```

## Testing

### Manual Testing Checklist

- [ ] Login with valid credentials
- [ ] Login with invalid credentials (error handling)
- [ ] Sign up new account
- [ ] Navigate between tabs
- [ ] Logout successfully
- [ ] App restores session on restart
- [ ] All screens render without errors
- [ ] Buttons and forms responsive to touch

### Device Testing

- [ ] Test on iPhone simulator
- [ ] Test on Android emulator
- [ ] Test on physical iOS device
- [ ] Test on physical Android device
- [ ] Test with slow network (throttle in DevTools)
- [ ] Test with no network (offline)

## Performance Optimization

### Best Practices

1. Use `React.memo` for expensive components
2. Use `useCallback` for stable function references
3. Avoid inline object/array literals in props
4. Use FlatList for long lists (built into Ride History)
5. Lazy load screens/components when possible
6. Profile with React DevTools

### Monitoring

- Use React DevTools for component profiling
- Check Metro Bundler output for warnings
- Monitor app size with `expo build:ios --type archive`

## Security Considerations

1. **Never commit API keys or secrets** to version control
2. **Use Expo SecureStore** for sensitive data (tokens)
3. **Validate all user input** before sending to API
4. **Use HTTPS** in production (configured in app.json)
5. **Implement request timeouts** (10s default in api.ts)
6. **Clear tokens on logout** to prevent token reuse

## Contributing

When adding new features:

1. Create feature branch: `git checkout -b feat/new-feature`
2. Follow component structure guidelines
3. Add TypeScript types for all props
4. Test on both iOS and Android
5. Update documentation
6. Create pull request with description

## Support

For issues or questions:

1. Check troubleshooting section above
2. Review API documentation at `http://localhost:5000/api-docs` (if available)
3. Check backend logs for API errors
4. File issue on GitHub with reproduction steps

## Additional Resources

- [React Native Documentation](https://reactnative.dev)
- [Expo Documentation](https://docs.expo.dev)
- [React Navigation Guide](https://reactnavigation.org)
- [React Native Paper](https://callstack.github.io/react-native-paper)
- [TypeScript React Native](https://reactnative.dev/docs/typescript)
