# Login Troubleshooting Guide

## Latest Fix Applied

Changed from `router.push()` to `window.location.href` for more reliable redirects.

## Test Now

1. **Clear browser storage:**
   ```javascript
   localStorage.clear();
   ```

2. **Refresh page:** Press Ctrl+Shift+R (hard refresh)

3. **Login with admin credentials**

4. **Expected:** Page should redirect to `/admin/dashboard` after ~100ms

## What Changed

### Before (Unreliable)
```typescript
router.push(ROUTES.ADMIN_DASHBOARD);
```

### After (Reliable)
```typescript
window.location.href = ROUTES.ADMIN_DASHBOARD;
```

## Why This Works

- `router.push()` is client-side navigation (can fail silently)
- `window.location.href` is full page navigation (always works)
- Added 100ms delay to ensure state is saved first

## Console Logs to Check

Open browser console (F12) and you should see:

```
Calling login API with: your-email@example.com
Raw API response: {...}
Extracted auth data: {...}
User from response: {...}
User role: admin
Token stored
Refresh token stored
Login success data: {...}
User role: admin
Checking role for redirect: admin
Redirecting to admin dashboard: /admin/dashboard
```

Then the page should redirect.

## If Still Not Working

### Check 1: User Role in Database

```bash
# Connect to MongoDB
mongosh

# Check user
db.users.findOne({ email: "admin@example.com" })

# Should show: { role: "admin", ... }
```

If role is not "admin" or "staff":
```bash
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

### Check 2: Backend Response

In Network tab, click on the login request and check Response:

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "...",
      "firstName": "Admin",
      "lastName": "User",
      "email": "admin@example.com",
      "role": "admin"  ← Must be "admin" or "staff"
    },
    "accessToken": "eyJ...",
    "refreshToken": "eyJ..."
  }
}
```

### Check 3: Tokens Stored

After login, in console:
```javascript
console.log('Token:', localStorage.getItem('token'));
console.log('Refresh:', localStorage.getItem('refreshToken'));
```

Both should have values.

### Check 4: Manual Redirect

If login succeeds but doesn't redirect:
```javascript
window.location.href = '/admin/dashboard';
```

If this works, there's a timing issue. Increase the timeout:

```typescript
// In frontend/src/features/auth/queries.ts
setTimeout(() => {
  window.location.href = ROUTES.ADMIN_DASHBOARD;
}, 500); // Increase from 100 to 500
```

## Alternative: Remove Timeout

If the timeout is causing issues, remove it:

```typescript
// Direct redirect without timeout
if (userRole === 'admin' || userRole === 'staff') {
  window.location.href = ROUTES.ADMIN_DASHBOARD;
} else {
  window.location.href = ROUTES.HOME;
}
```

## Nuclear Option: Force Redirect on Any Success

If nothing works, force redirect on any successful login:

```typescript
onSuccess: (data) => {
  console.log('Login success, forcing redirect');
  setUser(data.user);
  toast.success('Login successful');
  
  // Force redirect immediately
  window.location.href = '/admin/dashboard';
}
```

Then manually check role in the admin layout.

## Check Admin Layout Protection

Make sure admin layout allows access:

```typescript
// In frontend/src/app/(admin)/admin/layout.tsx
// Should NOT have any role checks that block access
```

## Summary of Changes

1. ✅ Fixed token extraction (accessToken vs token)
2. ✅ Fixed response structure (data.data)
3. ✅ Added user data normalization
4. ✅ Added refresh token storage
5. ✅ Changed to window.location.href for redirect
6. ✅ Added console logging for debugging

## Next Steps

1. Try login with the new changes
2. Check console for logs
3. If still not working, share:
   - Console logs
   - Network response
   - localStorage values

The redirect should work now with `window.location.href`!
