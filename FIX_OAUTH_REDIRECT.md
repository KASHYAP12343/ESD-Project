# Fix Google OAuth Redirect URI Mismatch Error

## Problem
Error 400: redirect_uri_mismatch - This occurs when the redirect URI in Google Cloud Console doesn't match what Spring Boot is using.

## Solution

### Step 1: Go to Google Cloud Console

1. Open: https://console.cloud.google.com/
2. Select your project (or create one if needed)
3. Go to **APIs & Services** → **Credentials**
4. Find your OAuth 2.0 Client ID (the one with client ID: `195121771432-iu7pd7kotaul593ms415dlfmn6rjif0p.apps.googleusercontent.com`)
5. Click on it to edit

### Step 2: Add Authorized Redirect URIs

In the **Authorized redirect URIs** section, add these URIs:

```
http://localhost:8080/login/oauth2/code/google
http://127.0.0.1:8080/login/oauth2/code/google
```

**Important Notes:**
- The URI must be **exactly** as shown above
- Include the protocol (`http://`)
- Include the port (`8080`)
- The path is `/login/oauth2/code/google` (this is Spring Boot's default)

### Step 3: Save Changes

1. Click **Save** at the bottom
2. Wait a few seconds for changes to propagate

### Step 4: Test Again

1. Restart your Spring Boot application (if running)
2. Try logging in again at: http://localhost:8080

## Alternative: If Using Different Port

If you're using a different port (not 8080), add the redirect URI with your port:

```
http://localhost:YOUR_PORT/login/oauth2/code/google
```

## Verification

After adding the redirect URI, you should be able to:
1. Click "Sign in with Google" 
2. See Google's consent screen
3. Complete authentication
4. Be redirected back to your application

## Troubleshooting

### Still getting the error?
1. **Clear browser cache** - Sometimes cached redirect URIs cause issues
2. **Wait 1-2 minutes** - Google's changes can take a moment to propagate
3. **Check for typos** - The URI must match exactly (including trailing slashes)
4. **Verify the Client ID** - Make sure you're editing the correct OAuth client

### Multiple Redirect URIs
You can add multiple redirect URIs if needed:
- `http://localhost:8080/login/oauth2/code/google` (for localhost)
- `http://127.0.0.1:8080/login/oauth2/code/google` (alternative localhost)
- `https://yourdomain.com/login/oauth2/code/google` (for production)

## Quick Reference

**Redirect URI Pattern for Spring Boot OAuth2:**
```
http://localhost:PORT/login/oauth2/code/{registrationId}
```

Where:
- `PORT` = Your server port (8080 in this case)
- `{registrationId}` = The registration ID in your config (usually "google")

