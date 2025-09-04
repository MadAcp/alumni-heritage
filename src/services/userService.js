import { USE_LOCAL_STORAGE, API_CONFIG, STORAGE_CONFIG } from '../config/serviceConfig';
import firebaseService from './firebaseService';
import bcrypt from 'bcryptjs';

// Local Storage Current User Key
const CURRENT_USER_KEY = STORAGE_CONFIG.CURRENT_USER_KEY;

class UserService {
  // Initialize localStorage with users
  async initialize() {
    // Initialize firebase with demo credentials users
    await firebaseService.generateDummyUsers();
    await firebaseService.generateDummyDepartments();
  }

  // Authenticate user
  async authenticateUser(email, password) {
    // Call to firebaseService to authenticate user from firebase
    const firebaseResult = await firebaseService.authenticateFirebaseUser(email, password);
    if (firebaseResult.success) {
      this.setCurrentUser(firebaseResult.user);
      return firebaseResult;
    }
  }

  // Update user profile
  async updateUserProfile(userId, updatedProfile) {
    // Call to firebaseService to update user in firebase
    // Create updated user object
    const currentUserUpdated = this.getCurrentUser();
    currentUserUpdated.profile = { ...updatedProfile.profile };
    currentUserUpdated.departmentId = updatedProfile.departmentId;
    currentUserUpdated.startYear = updatedProfile.startYear;
    currentUserUpdated.departmentName = updatedProfile.departmentName;

    const firebaseResult = await firebaseService.updateFirebaseUser(userId, currentUserUpdated);
    
    // Update current user if it's the same user
    if (currentUserUpdated && currentUserUpdated.id === userId) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUserUpdated));
    }
    // Return the updated user data
    return { success: true, user: currentUserUpdated };
  }

  // Add new user
  async createUser(userData) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const updatedNewUserSchema = {
      "email": userData.email,
      "password": hashedPassword,
      "role": "alumni",
      "departmentId": userData.departmentId,
      "departmentName": userData.departmentName,
      "startYear": userData.startYear,
      "status": "pending",
      "profile": {
        "personalInfo": {
          "firstName": userData.firstName,
          "middleName": "",
          "lastName": userData.lastName,
          "dateOfBirth": userData.dateOfBirth,
          "gender": userData.gender,
          "nationality": "",
          "contactInfo": {
            "email": userData.email,
            "phone": "",
            "address": {
              "street": "",
              "city": "",
              "state": "",
              "zipCode": "",
              "country": ""
            }
          }
        },
        "academicInfo": {
          "studentId": "",
          "degree": "",
          "major": "",
          "minor": "",
          "graduationYear": 0,
          "gpa": "",
          "honors": "",
          "thesis": "",
          "academicAwards": []
        },
        "professionalInfo": {
          "currentPosition": "",
          "currentCompany": "",
          "industry": "",
          "yearsOfExperience": 0,
          "skills": [],
          "certifications": []
        },
        "alumniActivities": {
          "membershipLevel": "",
          "donationHistory": [],
          "volunteerWork": [],
          "eventsAttended": []
        },
        "achievements": {
          "professional": [],
          "community": []
        }
      }
    };

    // Call to firebaseService to create user in firebase
    const newId = await firebaseService.generateUserId();
    const newUser = {
      id: newId,
      ...updatedNewUserSchema
    };
    const firebaseResult = firebaseService.createFirebaseUser(newUser);
    firebaseResult["user"] = newUser;
    return firebaseResult;
  }

  // ===== UTILITY METHODS =====

  getCurrentUser() {
    try {
      const currentUser = localStorage.getItem(CURRENT_USER_KEY);
      return (currentUser && currentUser !== 'undefined') ? JSON.parse(currentUser) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  setCurrentUser(user) {
    try {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Error setting current user:', error);
    }
  }

  clearCurrentUser() {
    try {
      localStorage.removeItem(CURRENT_USER_KEY);
    } catch (error) {
      console.error('Error clearing current user:', error);
    }
  }
}

// Create and export a single instance
const userService = new UserService();
export default userService;
