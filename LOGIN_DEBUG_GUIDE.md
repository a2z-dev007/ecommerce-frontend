# 🔍 Login Debug Guide

## Current Status

I've added detailed console logging to help identify the exact issue.

## Steps to Debug

### 1. Clear Everything
```javascript
// Open browser console (F12)
localStorage.clear();
sessionStorage.clear();
location.reload();
```

### 2. Open Console
Keep the console open (F12) and watch for messages

### 3. Try Login

You should see these messages in order:

```
🔐 Starting login...
📡 Calling login API...
📨 Raw response: { success: true, message: "...", data: {...} }
📦 Auth data: { user: {...}, accessToken: "...", refreshToken: "..." }
👤 User data: { _id: "...", firstName: "...", role: "admin", ... }
🔑 Has accessToken: true
🔄 Has refreshToken: true
💾 Token stored
💾 Refresh token stored
✏️ Normalized name: Admin User
✏️ Normalized id: 123...
✅ Returning auth data
✅ Login API success: {...}
📦 Login data received: {...}
👤 User: {...}
🎭 Role: admin
🔀 Checking redirect for role: admin
🚀 Redirecting to admin dashboard...
➡️ Executing redirect to: /admin/dashboard
```

Then the page should redirect.

## What to Look For

### Scenario 1: API Call Fails
If you see:
```
🔐 Starting login...
📡 Calling login API...
❌ Login API error: ...
💥 Login mutation error: ...
```

**Problem**: Backend API issue
**Check**:
- Is backend running? `http://localhost:5000`
- Check Network tab for the request
- Look at the error response

### Scenario 2: No Token in Response
If you see:
```
📦 Auth data: { user: {...} }
🔑 Has accessToken: false
```

**Problem**: Backend not returning accessToken
**Solution**: Check backend response structure

### Scenario 3: No User Data
If you see:
```
👤 User data: undefined
```

**Problem**: Backend not returning user
**Solution**: Check backend login response

### Scenario 4: Wrong Role
If you see:
```
🎭 Role: user
🏠 Redirecting to home...
```

**Problem**: User role is not "admin" or "staff"
**Solution**: Update user role in database
```bash
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

### Scenario 5: Redirect Not Happening
If you see all the logs including:
```
➡️ Executing redirect to: /admin/dashboard
```

But page doesn't redirect:

**Problem**: Browser blocking redirect
**Solution**: Try manually:
```javascript
window.location.href = '/admin/dashboard';
```

## Manual Tests

### Test 1: Check Backend
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"your-password"}'
```

Should return:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { ... },
    "accessToken": "...",
    "refreshToken": "..."
  }
}
```

### Test 2: Check Token Storage
After login attempt, in console:
```javascript
console.log('Token:', localStorage.getItem('token'));
console.log('Refresh:', localStorage.getItem('refreshToken'));
```

Both should have values if login succeeded.

### Test 3: Manual Redirect
If login succeeds but doesn't redirect:
```javascript
window.location.href = '/admin/dashboard';
```

If this works, there's a timing issue.

## Common Issues & Solutions

### Issue 1: "Cannot read property 'data' of undefined"
**Cause**: Backend response structure different
**Fix**: Check what backend actually returns

### Issue 2: "accessToken is undefined"
**Cause**: Backend returns different key
**Fix**: Check backend response, might be "token" not "accessToken"

### Issue 3: "User role is undefined"
**Cause**: User object doesn't have role
**Fix**: Check user in database has role field

### Issue 4: Redirect happens but to wrong page
**Cause**: Role check failing
**Fix**: Verify user.role is exactly "admin" or "staff"

### Issue 5: Multiple toasts (success + error)
**Cause**: Multiple API calls or errors
**Fix**: Check Network tab for duplicate requests

## Network Tab Checklist

1. Open Network tab (F12 → Network)
2. Try login
3. Look for `/auth/login` request
4. Check:
   - Status: Should be 200
   - Response: Should have `data.data.accessToken`
   - Response: Should have `data.data.user`
   - Response: User should have `role: "admin"`

## Quick Fix Options

### Option 1: Increase Timeout
If redirect is too fast:
```typescript
setTimeout(() => {
  window.location.href = ROUTES.ADMIN_DASHBOARD;
}, 500); // Increase from 100 to 500
```

### Option 2: Remove Timeout
If timeout is causing issues:
```typescript
// Direct redirect
if (userRole === 'admin' || userRole === 'staff') {
  window.location.href = ROUTES.ADMIN_DASHBOARD;
}
```

### Option 3: Use Router
If window.location doesn't work:
```typescript
router.push(ROUTES.ADMIN_DASHBOARD);
```

## What to Share

If still not working, share:

1. **All console logs** (copy entire console output)
2. **Network tab** → login request → Response tab (screenshot or copy)
3. **localStorage values**:
   ```javascript
   console.log('Token:', localStorage.getItem('token'));
   console.log('Refresh:', localStorage.getItem('refreshToken'));
   ```
4. **User role from database**:
   ```bash
   db.users.findOne({ email: "admin@example.com" }).role
   ```

This will help identify the exact issue!

## Expected Flow

```
User clicks "Sign In"
    ↓
Form submits
    ↓
useLogin mutation called
    ↓
authApi.login() called
    ↓
POST /auth/login
    ↓
Backend validates
    ↓
Backend returns { success, data: { user, accessToken, refreshToken } }
    ↓
Extract data.data
    ↓
Store tokens in localStorage
    ↓
Normalize user data
    ↓
Return to mutation
    ↓
onSuccess called
    ↓
setUser(data.user)
    ↓
Show success toast
    ↓
Check user role
    ↓
If admin/staff: redirect to /admin/dashboard
    ↓
Page changes
    ↓
Admin panel loads
```

Any break in this flow will show in the console logs!
