# CI/CD Setup Instructions

## Automated Firebase Deployment

I've created a GitHub Actions workflow that will automatically deploy your app to Firebase Hosting whenever you push to the `main` branch.

## Setup Steps

### 1. Create Firebase Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project: **pomcake-studio**
3. Go to **IAM & Admin** → **Service Accounts**
4. Click **Create Service Account**
   - Name: `github-actions`
   - Description: `Service account for GitHub Actions CI/CD`
5. Click **Create and Continue**
6. Grant these roles:
   - **Firebase Hosting Admin**
   - **Service Account User**
7. Click **Continue** → **Done**
8. Click on the newly created service account
9. Go to **Keys** tab → **Add Key** → **Create New Key**
10. Choose **JSON** format
11. Download the JSON file

### 2. Add GitHub Secrets

1. Go to your GitHub repository: https://github.com/ch810ya/pomcake-studio
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add these secrets:

#### FIREBASE_SERVICE_ACCOUNT
- Paste the **entire contents** of the JSON file you downloaded

#### VITE_FIREBASE_API_KEY
- Value: `AIzaSyCDFRxL47OpTVPzXIg5RzkZN0Ay1QvA1EI`

#### VITE_FIREBASE_AUTH_DOMAIN
- Value: `pomcake-studio.firebaseapp.com`

#### VITE_FIREBASE_PROJECT_ID
- Value: `pomcake-studio`

#### VITE_FIREBASE_STORAGE_BUCKET
- Value: `pomcake-studio.firebasestorage.app`

#### VITE_FIREBASE_MESSAGING_SENDER_ID
- Value: `1073947642004`

#### VITE_FIREBASE_APP_ID
- Value: `1:1073947642004:web:9835c3d992117c70264c81`

#### VITE_FIREBASE_MEASUREMENT_ID
- Value: `G-HMM6LTLZ9B`

### 3. Test the Workflow

Once you've added all the secrets:

```bash
git add .github/workflows/firebase-deploy.yml
git commit -m "Add CI/CD workflow"
git push origin main
```

The workflow will automatically:
1. ✅ Checkout your code
2. ✅ Install dependencies
3. ✅ Build the project with your Firebase config
4. ✅ Deploy to Firebase Hosting

You can monitor the deployment at:
https://github.com/ch810ya/pomcake-studio/actions

### 4. Future Deployments

From now on, every time you push to `main`:
```bash
git add .
git commit -m "your changes"
git push origin main
```

Your app will automatically deploy to: **https://pomcake-studio.web.app** 🚀

## Troubleshooting

If the deployment fails:
1. Check the **Actions** tab on GitHub for error logs
2. Verify all secrets are added correctly
3. Ensure the service account has the correct permissions
