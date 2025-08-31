# Service Layer Architecture

This document explains how to use the new service layer that provides seamless switching between localStorage and backend API.

## 🏗️ Architecture Overview

The service layer is designed with a **single flag** to switch between localStorage and API modes, making the transition to production seamless.

### Key Benefits
- **Zero code changes** when switching from localStorage to API
- **Consistent interface** for all CRUD operations
- **Automatic data persistence** in localStorage
- **Easy testing** with localStorage mode
- **Production ready** with API mode

## 🔧 Configuration

### Quick Switch
To switch between localStorage and API, change one flag in `src/config/serviceConfig.js`:

```javascript
// Set to false when ready to use backend API
export const USE_LOCAL_STORAGE = true;
```

### Environment Variables
Set these environment variables for API mode:

```bash
# .env file
REACT_APP_API_URL=http://your-backend-api.com/api
```

## 📁 File Structure

```
src/
├── services/
│   └── userService.js          # Main service class
├── config/
│   └── serviceConfig.js        # Configuration and flags
└── data/
    └── users.json              # Default data (unchanged)
```

## 🚀 Usage Examples

### Basic Operations

```javascript
import userService from '../services/userService';

// Get all users
const users = await userService.getAllUsers();

// Get user by ID
const user = await userService.getUserById('U001');

// Get user by email
const user = await userService.getUserByEmail('john@example.com');

// Authenticate user
const result = await userService.authenticateUser(email, password);
if (result.success) {
  // User authenticated
  console.log(result.user);
}
```

### Profile Updates

```javascript
// Update entire profile
const result = await userService.updateUserProfile(userId, updatedProfile);

// Update specific field
const result = await userService.updateUserField(userId, 'personalInfo.firstName', 'John');

// Add item to array
const result = await userService.addItemToUserArray(userId, 'professionalInfo.skills', 'React');

// Remove item from array
const result = await userService.removeItemFromUserArray(userId, 'professionalInfo.skills', 0);
```

### User Management

```javascript
// Create new user
const result = await userService.createUser(userData);

// Delete user
const result = await userService.deleteUser(userId);
```

## 🔄 Switching Modes

### Current: localStorage Mode
- Data is stored in browser's localStorage
- No backend required
- Perfect for development and testing
- Data persists between browser sessions

### Future: API Mode
- Data is fetched from backend API
- Real-time data synchronization
- Production-ready with proper authentication
- Scalable and secure

## 🎯 Migration Path

### Phase 1: Development (Current)
- ✅ Use localStorage mode
- ✅ Test all CRUD operations
- ✅ Validate data structure
- ✅ Ensure UI works correctly

### Phase 2: Backend Development
- 🔄 Build backend API endpoints
- 🔄 Match service interface
- 🔄 Test API responses

### Phase 3: Production Switch
- 🔄 Set `USE_LOCAL_STORAGE = false`
- 🔄 Configure API endpoints
- 🔄 Deploy with real backend

## 🛠️ Service Methods

### Core Methods
- `getAllUsers()` - Get all users
- `getUserById(userId)` - Get user by ID
- `getUserByEmail(email)` - Get user by email
- `authenticateUser(email, password)` - User login

### Profile Management
- `updateUserProfile(userId, profile)` - Update entire profile
- `updateUserField(userId, fieldPath, value)` - Update specific field
- `addItemToUserArray(userId, fieldPath, item)` - Add to array field
- `removeItemFromUserArray(userId, fieldPath, index)` - Remove from array field

### User Management
- `createUser(userData)` - Create new user
- `deleteUser(userId)` - Delete user

### Utility Methods
- `getCurrentUser()` - Get logged-in user
- `setCurrentUser(user)` - Set current user
- `clearCurrentUser()` - Clear current user (logout)
- `clearAllData()` - Clear all localStorage data
- `resetToDefaultData()` - Reset to default data

## 🔒 Data Persistence

### localStorage Keys
- `alumni_users_data` - All users data
- `alumni_current_user` - Currently logged-in user

### Data Flow
1. **Initialization**: Copies default data from `users.json` to localStorage
2. **Operations**: All CRUD operations update localStorage
3. **Synchronization**: Current user data stays in sync with main data
4. **Persistence**: Data survives browser restarts

## 🧪 Testing

### localStorage Mode
- Perfect for unit testing
- No network dependencies
- Fast execution
- Predictable data state

### API Mode
- Integration testing
- Network error handling
- Performance testing
- Real-world scenarios

## 🚨 Error Handling

The service includes comprehensive error handling:

```javascript
try {
  const result = await userService.updateUserProfile(userId, profile);
  if (result.success) {
    // Success
    console.log(result.user);
  } else {
    // Error with message
    console.error(result.message);
  }
} catch (error) {
  // Network or unexpected error
  console.error('Service error:', error);
}
```

## 🔧 Customization

### Adding New Methods
```javascript
// In userService.js
async customOperation(userId, data) {
  if (USE_LOCAL_STORAGE) {
    return this.customOperationInLocalStorage(userId, data);
  } else {
    return this.customOperationInAPI(userId, data);
  }
}
```

### Configuration Options
```javascript
// In serviceConfig.js
export const API_CONFIG = {
  BASE_URL: 'http://your-api.com',
  TIMEOUT: 15000,
  RETRY_ATTEMPTS: 5,
};
```

## 📊 Performance

### localStorage Mode
- **Speed**: Instant operations
- **Memory**: Browser storage limits
- **Network**: No network calls
- **Scalability**: Limited by browser storage

### API Mode
- **Speed**: Network dependent
- **Memory**: Server-side storage
- **Network**: HTTP requests
- **Scalability**: Server-side scaling

## 🎉 Benefits

1. **Zero Breaking Changes**: Switch modes without code changes
2. **Consistent Interface**: Same API regardless of mode
3. **Easy Testing**: localStorage mode for development
4. **Production Ready**: API mode for deployment
5. **Data Persistence**: localStorage keeps data between sessions
6. **Error Handling**: Comprehensive error management
7. **Performance**: Fast localStorage operations
8. **Scalability**: Easy backend integration

## 🚀 Next Steps

1. **Test localStorage mode** thoroughly
2. **Build backend API** endpoints
3. **Test API mode** with backend
4. **Switch to API mode** for production
5. **Monitor performance** and errors
6. **Scale backend** as needed

---

**Note**: The current implementation maintains all existing functionality while adding the service layer. No changes to the UI or user experience are required.
