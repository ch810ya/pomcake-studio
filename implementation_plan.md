# Firebase Deployment Plan

## Goal
Deploy the Pomcake Studio application to Firebase Hosting and verify the Firestore connection.

## User Review Required
- **Firebase Login**: You will need to run `firebase login` in the terminal to authenticate the CLI.
- **Firebase Init**: We will initialize the project for hosting.

## Proposed Changes

### 1. Firebase CLI Setup
- Install `firebase-tools` globally (if not already).
- Login to Firebase.

### 2. Project Initialization
- Run `firebase init hosting` to configure the project.
- Set build directory to `dist`.
- Configure as a single-page app (rewrite all urls to /index.html).

### 3. Build and Deploy
- Run `npm run build` to create the production build.
- Run `firebase deploy` to push to the live URL.

### 4. Verification
- Check the deployed URL.
- Verify data persistence in the live app.

## Verification Plan
### Automated Tests
- None for deployment.

### Manual Verification
- Access the deployed URL.
- Login and check the dashboard.
- Add a test sale and verify it appears in the Firebase Console.
