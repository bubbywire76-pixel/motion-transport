# Motion Transport iOS - Deployment Guide

This guide walks you through building, signing, and distributing the Motion Transport iOS app via TestFlight and the App Store.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Set Up Apple Developer Account](#set-up-apple-developer-account)
3. [Configure Code Signing](#configure-code-signing)
4. [Set Up GitHub Secrets](#set-up-github-secrets)
5. [Build Locally](#build-locally)
6. [Upload to TestFlight](#upload-to-testflight)
7. [Submit to App Store](#submit-to-app-store)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- **Xcode 15.0+** installed
- **Apple Developer Account** (paid $99/year)
- **CocoaPods** installed: `sudo gem install cocoapods`
- **Transporter** or **Xcode** for app submission
- **macOS 12+** for code signing

---

## Set Up Apple Developer Account

### 1. Enroll in Apple Developer Program
- Visit [developer.apple.com](https://developer.apple.com)
- Sign in with your Apple ID (or create one)
- Enroll in the Apple Developer Program ($99/year)
- Complete identity verification

### 2. Create App ID
1. Go to [App IDs](https://developer.apple.com/account/resources/identifiers/list)
2. Click **+** to register new App ID
3. **Select App IDs** → **Continue**
4. **Register an App ID:**
   - Platform: iOS
   - Description: Motion Transport
   - Bundle ID: `com.motionapp.ios` (exact match required)
   - Capabilities: Enable
     - Sign in with Apple
     - Push Notifications
     - Maps
     - Location Services
5. Click **Continue** → **Register**

### 3. Create Signing Certificate
1. Go to [Certificates](https://developer.apple.com/account/resources/certificates/list)
2. Click **+** to create new certificate
3. **Select Certificate Type:**
   - For development: **Apple Development**
   - For production: **Apple Distribution**
4. **Generate CSR:**
   ```bash
   # On your Mac, open Keychain Access
   # Menu → Keychain Access → Certificate Assistant → Request a Certificate from a Certificate Authority
   # Fill in your email and name
   # Save to disk as CertificateSigningRequest.certSigningRequest
   ```
5. Upload the CSR file
6. Download the certificate (.cer file)
7. Double-click to install in Keychain

### 4. Create Provisioning Profiles
1. Go to [Provisioning Profiles](https://developer.apple.com/account/resources/profiles/list)
2. Click **+** to create new profile
3. **Select type:**
   - Development: **iOS App Development**
   - Production/TestFlight: **App Store**
4. Select App ID: `com.motionapp.ios`
5. Select certificate(s) you created
6. Select devices (for development only)
7. Give it a name: `MotionTransport Distribution`
8. Download and open (double-click) to install

---

## Configure Code Signing

### 1. In Xcode Project Settings
1. Open `MotionTransport.xcworkspace` in Xcode
2. Select the **MotionTransport** target
3. Go to **Signing & Capabilities** tab
4. **Team:** Select your Apple Development Team
5. **Bundle Identifier:** Confirm it's `com.motionapp.ios`
6. **Signing Certificate:**
   - Development: Apple Development
   - Release: Apple Distribution
7. **Provisioning Profile:**
   - Development: iOS App Development
   - Release: MotionTransport Distribution

### 2. Verify Code Signing
```bash
cd mobile/ios/MotionTransport

# List available signing identities
security find-identity -v -p codesigning

# List provisioning profiles
ls ~/Library/MobileDevice/Provisioning\ Profiles/
```

---

## Set Up GitHub Secrets

GitHub Actions workflows require secrets to code sign and deploy. Add these to your repository:

### Steps:
1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret** for each:

#### iOS Code Signing Secrets:

**`IOS_CERTIFICATE_P12_BASE64`**
```bash
# Export signing certificate from Keychain to P12 format
# In Keychain Access: right-click certificate → Export
# Export as: "MyCertificate.p12"
# Set password when prompted

base64 -i MyCertificate.p12 -o certificate_base64.txt
# Copy contents of certificate_base64.txt
```

**`IOS_CERTIFICATE_PASSWORD`**
- Password you set when exporting the P12 certificate

**`IOS_PROVISIONING_PROFILE_BASE64`**
```bash
# Convert provisioning profile to base64
base64 -i ~/Library/MobileDevice/Provisioning\ Profiles/[YOUR_PROFILE_UUID].mobileprovision

# Copy the output
```

**`IOS_PROVISIONING_PROFILE_SPECIFIER`**
- Name of provisioning profile: `MotionTransport Distribution`

**`IOS_CODE_SIGN_IDENTITY`**
- Your signing certificate identity (e.g., `Apple Distribution: Your Name (ABC123XYZ)`)

#### App Store Connect Secrets:

**`APPSTORE_API_KEY_ID`**
```bash
# Go to App Store Connect → Users and Access → Keys
# Create new key with App Manager role
# Save the Key ID (e.g., ABC1D2E3F4)
```

**`APPSTORE_API_ISSUER_ID`**
- Found in App Store Connect → Users and Access → Keys
- Format: UUID

**`APPSTORE_API_KEY`**
```bash
# Download the .p8 private key file from App Store Connect
# This is sensitive — store it only in GitHub Secrets
# Paste the entire contents including -----BEGIN PRIVATE KEY-----
```

**`SLACK_WEBHOOK_URL`** (Optional)
- For build notifications to Slack
- Create at [api.slack.com/apps](https://api.slack.com/apps)

---

## Build Locally

### 1. Install Dependencies
```bash
cd mobile/ios/MotionTransport
pod install
```

### 2. Build for Development
```bash
xcodebuild build \
  -workspace MotionTransport.xcworkspace \
  -scheme MotionTransport \
  -configuration Debug \
  -destination 'generic/platform=iOS'
```

### 3. Run Tests
```bash
xcodebuild test \
  -workspace MotionTransport.xcworkspace \
  -scheme MotionTransport \
  -destination 'platform=iOS Simulator,name=iPhone 15'
```

### 4. Create Release Build (IPA)
```bash
# Step 1: Archive
xcodebuild archive \
  -workspace MotionTransport.xcworkspace \
  -scheme MotionTransport \
  -configuration Release \
  -archivePath ./build/MotionTransport.xcarchive \
  -allowProvisioningUpdates

# Step 2: Export IPA
xcodebuild -exportArchive \
  -archivePath ./build/MotionTransport.xcarchive \
  -exportPath ./build/export \
  -exportOptionsPlist ./ExportOptions.plist

# IPA location: ./build/export/MotionTransport.ipa
```

---

## Upload to TestFlight

### Via GitHub Actions (Recommended)
Automatic on push to `main` branch:
```bash
git checkout main
git merge feat/mobile-apps-setup
git push origin main
```

### Via Manual Upload
```bash
# After creating IPA (see Build Locally section)

xcrun altool --upload-app \
  -f ./build/export/MotionTransport.ipa \
  -t ios \
  -apiKey YOUR_API_KEY_ID \
  -apiIssuer YOUR_API_ISSUER_ID
```

### Add Testers
1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Select **Motion Transport** app
3. **TestFlight** tab → **Testers**
4. **Add a new test group** (e.g., "Internal Testers")
5. Enter tester email addresses
6. Send invites

### Test the App
- Testers receive email with TestFlight link
- Download TestFlight app from App Store
- Install Motion Transport from TestFlight
- Report bugs in feedback form

---

## Submit to App Store

### 1. Prepare App for Review
```bash
# Update version in Xcode:
# Target → General → Version (e.g., 1.0.0)
# Build Number (e.g., 1)
```

### 2. Create Release Notes
```markdown
# Motion Transport v1.0.0

## What's New
- Launch of Motion Transport iOS app
- Book rides and manage driver account
- Real-time tracking with maps
- Secure payment integration
- Multi-language support

## Bug Fixes & Improvements
- Initial release
```

### 3. Add App Screenshots (Optional)
1. [App Store Connect](https://appstoreconnect.apple.com) → Motion Transport
2. **App Information** → **Screenshots**
3. Upload 2-5 screenshots for each device size
4. Add captions describing key features

### 4. Fill App Review Information
1. **App Privacy**
   - Declare data collection practices
   - Go to [App Privacy Report](https://appstoreconnect.apple.com/privacy)
2. **App Review Information**
   - Test account credentials (if needed)
   - Demo video or notes
3. **Content Rating**
   - Complete age rating questionnaire
4. **Version Release**
   - Manual release or automatic after approval

### 5. Submit for Review
1. [App Store Connect](https://appstoreconnect.apple.com) → Motion Transport
2. **App Store** → **Prepare for Submission**
3. Review all information
4. Click **Submit for Review**
5. Apple reviews within 24-48 hours

### 6. Monitor Review Status
- Email notifications for each step
- Check status in App Store Connect
- Common rejection reasons:
  - Missing privacy policy
  - Crash on startup
  - Incomplete functionality
  - Missing app icons

---

## Troubleshooting

### Build Failures

**Error: "No matching provisioning profile found"**
```bash
# Delete cached profiles and reinstall
rm -rf ~/Library/MobileDevice/Provisioning\ Profiles/*
# Re-download from developer.apple.com
```

**Error: "Code signing identity not found"**
```bash
# List available identities
security find-identity -v -p codesigning

# Export certificate from Keychain and re-import
```

**Error: "Pod install failed"**
```bash
cd mobile/ios/MotionTransport
rm -rf Pods Podfile.lock
pod repo update
pod install
```

### Code Signing Issues

**Missing private key for signing certificate**
```bash
# Ensure certificate is in local Keychain
# Keychain Access → Certificates → Show "iPhone Developer"
# Should show a private key underneath
```

**Certificate expired**
```bash
# Create new certificate in developer.apple.com
# Update Xcode Signing settings
```

### TestFlight Upload Issues

**Error: "Invalid provisioning profile"**
- Ensure provisioning profile matches App ID
- Profile must be "App Store" type for TestFlight

**Build takes too long**
- Check network connection
- Retry upload
- Transporter logs: `~/Library/Logs/Transporter/`

### App Rejection

**"Crash on Launch"**
- Test on physical device
- Check Console logs (Xcode → Window → Devices and Simulators)
- Review crash logs from App Store Connect

**"Missing Privacy Policy"**
- Add privacy policy URL in App Store Connect
- Policy must cover all data collection

**"Incomplete Functionality"**
- Ensure all promised features work
- Test on multiple iOS versions (15.0+)

---

## Useful Commands

```bash
# Check iOS deployment target
xcodebuild -workspace MotionTransport.xcworkspace -scheme MotionTransport -showBuildSettings | grep IPHONEOS_DEPLOYMENT_TARGET

# List available simulators
xcrun simctl list

# Open Xcode Organizer (device management)
open "xcode://Developer"

# Clean build artifacts
xcodebuild clean -workspace MotionTransport.xcworkspace -scheme MotionTransport

# Generate crash symbols
dwarfdump --uuid ./build/MotionTransport.xcarchive/dSYMs/MotionTransport.app.dSYM
```

---

## Support

- **Xcode Documentation:** [developer.apple.com/xcode](https://developer.apple.com/xcode)
- **App Store Connect Help:** [help.apple.com/app-store-connect](https://help.apple.com/app-store-connect)
- **Apple Developer Forums:** [developer.apple.com/forums](https://developer.apple.com/forums)
- **Motion Transport Issues:** [GitHub Issues](https://github.com/bubbywire76-pixel/motion-transport/issues)

---

## Next Steps

1. ✅ Set up Apple Developer Account
2. ✅ Configure code signing & provisioning
3. ✅ Add GitHub Secrets
4. ✅ Push feature branch to `main`
5. ✅ GitHub Actions builds and archives IPA
6. ✅ Upload to TestFlight for testing
7. ✅ Submit to App Store for review
8. ✅ App available for download worldwide

Good luck with your app launch! 🚀
