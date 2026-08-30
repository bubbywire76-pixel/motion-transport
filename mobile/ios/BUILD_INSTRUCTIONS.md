# iOS Build & Run Instructions

Quick reference for building and running the Motion Transport iOS app locally.

## Prerequisites

- **Xcode 15.0+** → [Download](https://developer.apple.com/download/all/)
- **Cocoapods** → `sudo gem install cocoapods`
- **iOS 15.0+** target device/simulator

## Quick Start

### 1. Install Dependencies
```bash
cd mobile/ios/MotionTransport
pod install
```

### 2. Open Project in Xcode
```bash
open MotionTransport.xcworkspace
```
⚠️ **Important:** Always use `.xcworkspace`, not `.xcodeproj`

### 3. Configure Development Team
1. In Xcode: Select **MotionTransport** target
2. Go to **Signing & Capabilities**
3. **Team:** Select your personal team or organization
4. Wait for provisioning profiles to auto-generate

### 4. Run on Simulator
```bash
# Via Xcode
# 1. Select target device (e.g., iPhone 15)
# 2. Press Cmd+R (or Product → Run)

# Via command line
xcodebuild build -workspace MotionTransport.xcworkspace \
  -scheme MotionTransport \
  -destination 'platform=iOS Simulator,name=iPhone 15'
```

### 5. Run on Physical Device
1. **Connect iPhone** via USB
2. **Trust this computer** on the device
3. **Select device** in Xcode (top-left scheme selector)
4. **Run** (Cmd+R)

## Common Issues

### Pod Install Fails
```bash
# Update pod specs
pod repo update

# Clean and reinstall
rm -rf Pods Podfile.lock
pod install
```

### "Code Signing" Errors
```bash
# Clean build folder
Cmd+Shift+K

# Delete derived data
rm -rf ~/Library/Developer/Xcode/DerivedData/MotionTransport*

# Re-select team in Signing & Capabilities
```

### Simulator Crashes
```bash
# Reset simulator
xcrun simctl erase all

# Run specific simulator
xcrun simctl boot "iPhone 15"
open /Applications/Xcode.app/Contents/Developer/Applications/Simulator.app
```

## Testing

### Run Unit Tests
```bash
xcodebuild test -workspace MotionTransport.xcworkspace \
  -scheme MotionTransport \
  -destination 'platform=iOS Simulator,name=iPhone 15'
```

### View Test Results
```bash
# Open test results in Xcode
# Product → Scheme → Edit Scheme → Test → Pre-actions/Post-actions
```

## Building for Release

### Create Archive
```bash
xcodebuild archive \
  -workspace MotionTransport.xcworkspace \
  -scheme MotionTransport \
  -configuration Release \
  -archivePath ./build/MotionTransport.xcarchive
```

### Export IPA
```bash
xcodebuild -exportArchive \
  -archivePath ./build/MotionTransport.xcarchive \
  -exportPath ./build/export \
  -exportOptionsPlist ./ExportOptions.plist
```

### Result
IPA file: `./build/export/MotionTransport.ipa`

## Environment Configuration

### API Base URL
Edit `Utilities/Constants.swift`:
```swift
struct APIConstants {
    static let baseURL = "https://api.motionapp.ng" // Change for dev/staging
    static let apiVersion = "v1"
    static let timeout: TimeInterval = 30
}
```

### Debug vs Release
- **Debug:** Logs enabled, debug symbols included
- **Release:** Optimized, minimal logging, app store ready

## Useful Xcode Shortcuts

| Action | Shortcut |
|--------|----------|
| Run app | `Cmd+R` |
| Stop app | `Cmd+.` |
| Build | `Cmd+B` |
| Archive | `Cmd+Shift+B` |
| Clean | `Cmd+Shift+K` |
| Run tests | `Cmd+U` |
| Toggle console | `Cmd+Shift+C` |
| Debug navigator | `Cmd+6` |
| Breakpoints | `Cmd+\ (backslash)` |

## Performance Profiling

### Using Instruments
```bash
# In Xcode: Product → Profile (Cmd+I)
# Or via command line:
xcodebuild profile -workspace MotionTransport.xcworkspace -scheme MotionTransport
```

### Check Memory Usage
- Xcode → Debug Navigator → Memory
- Target: \< 150MB for Motion Transport

### Battery Impact
- Xcode → Debug Navigator → Energy Impact
- Monitor location services and network calls

## Debugging Tips

### Print Logs
```swift
print("Debug message: \(value)")

// Using OSLog for production
import os.log
os_log("Message: %{public}@", log: .default, type: .debug, "value")
```

### Set Breakpoints
1. Click line number in code editor
2. Blue breakpoint appears
3. Run → Execution pauses at breakpoint
4. Step Over/Into: F6/F7

### View Network Requests
- Xcode → Debug → Console
- URLSession logs requests automatically
- Or use Charles Proxy for deeper inspection

### Inspect View Hierarchy
```bash
# In Xcode:
# Debug → View Debugging → Capture View Hierarchy
# Or press Cmd+Option+Shift+4 and drag
```

## Next Steps

- ✅ Build and run locally
- ✅ Make code changes
- ✅ Run tests
- ✅ Create PR to `main` branch
- ✅ GitHub Actions builds and archives
- ✅ Deploy to TestFlight
- ✅ Submit to App Store

For deployment details, see [DEPLOYMENT_GUIDE.md](../../DEPLOYMENT_GUIDE.md)
