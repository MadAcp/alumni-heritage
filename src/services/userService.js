import { USE_LOCAL_STORAGE, API_CONFIG, STORAGE_CONFIG } from '../config/serviceConfig';

// Local Storage Keys
const USERS_STORAGE_KEY = STORAGE_CONFIG.USERS_KEY;
const CURRENT_USER_KEY = STORAGE_CONFIG.CURRENT_USER_KEY;

class UserService {
  constructor() {
    this.initializeLocalStorage();
    localStorage.setItem('test_key', 'test_value');
  }

  // Initialize localStorage with default data if empty
  initializeLocalStorage() {
    if (!localStorage.getItem(USERS_STORAGE_KEY)) {
      // Import the default users data synchronously
      try {
        // For now, we'll use a synchronous approach
        // In a real app, you might want to handle this differently
        const defaultData = {
          "users": [
            {
              "id": "U001",
              "email": "john.doe@alumni.edu",
              "password": "password123",
              "profile": {
                "personalInfo": {
                  "firstName": "John",
                  "middleName": "Michael",
                  "lastName": "Doe",
                  "dateOfBirth": "1985-03-15",
                  "gender": "Male",
                  "nationality": "American",
                  "contactInfo": {
                    "email": "john.doe@alumni.edu",
                    "phone": "+1-555-0123",
                    "address": {
                      "street": "123 Main Street",
                      "city": "New York",
                      "state": "NY",
                      "zipCode": "10001",
                      "country": "USA"
                    }
                  }
                },
                "academicInfo": {
                  "studentId": "STU001",
                  "degree": "Bachelor of Science",
                  "major": "Computer Science",
                  "minor": "Mathematics",
                  "graduationYear": 2007,
                  "gpa": "3.85",
                  "honors": "Magna Cum Laude",
                  "thesis": "Machine Learning Applications in Data Analysis",
                  "academicAwards": [
                    "Dean's List (2004-2007)",
                    "Computer Science Department Award",
                    "Mathematics Excellence Award"
                  ]
                },
                "professionalInfo": {
                  "currentPosition": "Senior Software Engineer",
                  "currentCompany": "TechCorp Inc.",
                  "industry": "Technology",
                  "yearsOfExperience": 16,
                  "skills": [
                    "JavaScript",
                    "React",
                    "Node.js",
                    "Python",
                    "Machine Learning",
                    "AWS"
                  ],
                  "certifications": [
                    "AWS Certified Solutions Architect",
                    "Google Cloud Professional Developer",
                    "Microsoft Certified: Azure Developer Associate"
                  ]
                },
                "alumniActivities": {
                  "membershipLevel": "Gold",
                  "donationHistory": [
                    { "amount": 500, "purpose": "Scholarship Fund", "year": 2022 },
                    { "amount": 250, "purpose": "Library Renovation", "year": 2021 },
                    { "amount": 1000, "purpose": "Research Grant", "year": 2020 }
                  ],
                  "volunteerWork": [
                    "Alumni Mentorship Program",
                    "Career Fair Organizer",
                    "Student Interview Panel"
                  ],
                  "eventsAttended": [
                    "2023 Homecoming Celebration",
                    "2022 Alumni Reunion",
                    "2021 Virtual Networking Event"
                  ]
                },
                "achievements": {
                  "professional": [
                    "Led team of 15 developers to deliver major product launch",
                    "Reduced system downtime by 40% through infrastructure improvements",
                    "Mentored 20+ junior developers in career growth"
                  ],
                  "community": [
                    "Board member of local tech community organization",
                    "Volunteer at local coding bootcamp for underprivileged youth",
                    "Speaker at regional technology conferences"
                  ]
                }
              }
            },
            {
              "id": "U002",
              "email": "sarah.smith@alumni.edu",
              "password": "password123",
              "profile": {
                "personalInfo": {
                  "firstName": "Sarah",
                  "middleName": "Elizabeth",
                  "lastName": "Smith",
                  "dateOfBirth": "1988-07-22",
                  "gender": "Female",
                  "nationality": "Canadian",
                  "contactInfo": {
                    "email": "sarah.smith@alumni.edu",
                    "phone": "+1-555-0456",
                    "address": {
                      "street": "456 Oak Avenue",
                      "city": "Toronto",
                      "state": "ON",
                      "zipCode": "M5V 3A8",
                      "country": "Canada"
                    }
                  }
                },
                "academicInfo": {
                  "studentId": "STU002",
                  "degree": "Master of Business Administration",
                  "major": "Business Administration",
                  "minor": "Finance",
                  "graduationYear": 2010,
                  "gpa": "3.92",
                  "honors": "Summa Cum Laude",
                  "thesis": "Strategic Management in Global Markets",
                  "academicAwards": [
                    "Graduate Business Excellence Award",
                    "Finance Department Scholarship",
                    "International Business Fellowship"
                  ]
                },
                "professionalInfo": {
                  "currentPosition": "Director of Operations",
                  "currentCompany": "Global Solutions Ltd.",
                  "industry": "Consulting",
                  "yearsOfExperience": 13,
                  "skills": [
                    "Strategic Planning",
                    "Project Management",
                    "Team Leadership",
                    "Financial Analysis",
                    "Process Optimization",
                    "Stakeholder Management"
                  ],
                  "certifications": [
                    "Project Management Professional (PMP)",
                    "Certified Business Analysis Professional (CBAP)",
                    "Six Sigma Black Belt"
                  ]
                },
                "alumniActivities": {
                  "membershipLevel": "Platinum",
                  "donationHistory": [
                    { "amount": 1000, "purpose": "Business School Endowment", "year": 2023 },
                    { "amount": 750, "purpose": "Student Travel Fund", "year": 2022 },
                    { "amount": 500, "purpose": "Alumni Association", "year": 2021 }
                  ],
                  "volunteerWork": [
                    "Business School Advisory Board",
                    "Career Development Workshop Leader",
                    "International Student Mentor"
                  ],
                  "eventsAttended": [
                    "2023 Business Leadership Summit",
                    "2022 International Alumni Conference",
                    "2021 Virtual Career Workshop"
                  ]
                },
                "achievements": {
                  "professional": [
                    "Increased company revenue by 35% through strategic initiatives",
                    "Led successful merger of three business units",
                    "Established new international market presence in Asia"
                  ],
                  "community": [
                    "Chair of local business networking group",
                    "Advisor to startup incubator program",
                    "Speaker at women in business conferences"
                  ]
                }
              }
            }
          ]
        };
        
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(defaultData));
      } catch (error) {
        console.error('Error initializing localStorage:', error);
      }
    } else {
      //console.log('Users data already exists in localStorage');
    }
  }

  // Get all users
  async getAllUsers() {
    if (USE_LOCAL_STORAGE) {
      return this.getUsersFromLocalStorage();
    } else {
      return this.getUsersFromAPI();
    }
  }

  // Get user by ID
  async getUserById(userId) {
    if (USE_LOCAL_STORAGE) {
      return this.getUserByIdFromLocalStorage(userId);
    } else {
      return this.getUserByIdFromAPI(userId);
    }
  }

  // Get user by email
  async getUserByEmail(email) {
    if (USE_LOCAL_STORAGE) {
      return this.getUserByEmailFromLocalStorage(email);
    } else {
      return this.getUserByEmailFromAPI(email);
    }
  }

  // Authenticate user
  async authenticateUser(email, password) {
    if (USE_LOCAL_STORAGE) {
      return this.authenticateUserFromLocalStorage(email, password);
    } else {
      return this.authenticateUserFromAPI(email, password);
    }
  }

  // Update user profile
  async updateUserProfile(userId, updatedProfile) {
    if (USE_LOCAL_STORAGE) {
      return this.updateUserProfileInLocalStorage(userId, updatedProfile);
    } else {
      return this.updateUserProfileInAPI(userId, updatedProfile);
    }
  }

  // Add new user
  async createUser(userData) {
    const updatedUserSchema = {
      "email": userData.email,
      "password": userData.password,
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
    if (USE_LOCAL_STORAGE) {
      return this.createUserInLocalStorage(updatedUserSchema);
    } else {
      return this.createUserInAPI(updatedUserSchema);
    }
  }

  // Delete user
  async deleteUser(userId) {
    if (USE_LOCAL_STORAGE) {
      return this.deleteUserFromLocalStorage(userId);
    } else {
      return this.deleteUserFromAPI(userId);
    }
  }

  // Update specific field in user profile
  async updateUserField(userId, fieldPath, value) {
    if (USE_LOCAL_STORAGE) {
      return this.updateUserFieldInLocalStorage(userId, fieldPath, value);
    } else {
      return this.updateUserFieldInAPI(userId, fieldPath, value);
    }
  }

  // Add item to array field (e.g., skills, certifications)
  async addItemToUserArray(userId, fieldPath, item) {
    if (USE_LOCAL_STORAGE) {
      return this.addItemToUserArrayInLocalStorage(userId, fieldPath, item);
    } else {
      return this.addItemToUserArrayInAPI(userId, fieldPath, item);
    }
  }

  // Remove item from array field
  async removeItemFromUserArray(userId, fieldPath, itemIndex) {
    if (USE_LOCAL_STORAGE) {
      return this.removeItemFromUserArrayInLocalStorage(userId, fieldPath, itemIndex);
    } else {
      return this.removeItemFromUserArrayInAPI(userId, fieldPath, itemIndex);
    }
  }

  // ===== LOCAL STORAGE METHODS =====

  getUsersFromLocalStorage() {
    try {
      const usersData = localStorage.getItem(USERS_STORAGE_KEY);
      return usersData ? JSON.parse(usersData) : { users: [] };
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return { users: [] };
    }
  }

  getUserByIdFromLocalStorage(userId) {
    try {
      const usersData = this.getUsersFromLocalStorage();
      return usersData.users.find(user => user.id === userId) || null;
    } catch (error) {
      console.error('Error getting user by ID from localStorage:', error);
      return null;
    }
  }

  getUserByEmailFromLocalStorage(email) {
    try {
      const usersData = this.getUsersFromLocalStorage();
      return usersData.users.find(user => user.email === email) || null;
    } catch (error) {
      console.error('Error getting user by email from localStorage:', error);
      return null;
    }
  }

  authenticateUserFromLocalStorage(email, password) {
    try {
      const user = this.getUserByEmailFromLocalStorage(email);
      if (user && user.password === password) {
        // Store current user in localStorage
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        return { success: true, user };
      }
      return { success: false, message: 'Invalid credentials' };
    } catch (error) {
      console.error('Error authenticating user from localStorage:', error);
      return { success: false, message: 'Authentication error' };
    }
  }

    updateUserProfileInLocalStorage(userId, updatedProfile) {
    try {
      const usersData = this.getUsersFromLocalStorage();
      
      const userIndex = usersData.users.findIndex(user => user.id === userId);
      
      if (userIndex === -1) {
        throw new Error('User not found');
      }

      // Update the user's profile
      usersData.users[userIndex].profile = { ...updatedProfile };
      
      // Save back to localStorage
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(usersData));
      
      // Update current user if it's the same user
      const currentUser = this.getCurrentUser();
      if (currentUser && currentUser.id === userId) {
        currentUser.profile = { ...updatedProfile };
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
      }

      // Return the updated user data
      return { success: true, user: usersData.users[userIndex] };
    } catch (error) {
      console.error('Error updating user profile in localStorage:', error);
      return { success: false, message: error.message };
    }
  }

  createUserInLocalStorage(userData) {
    try {
      const usersData = this.getUsersFromLocalStorage();
      
      // Generate unique ID
      const newId = `U${String(usersData.users.length + 1).padStart(3, '0')}`;
      
      const newUser = {
        id: newId,
        ...userData
      };

      usersData.users.push(newUser);
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(usersData));
      
      return { success: true, user: newUser };
    } catch (error) {
      console.error('Error creating user in localStorage:', error);
      return { success: false, message: error.message };
    }
  }

  deleteUserFromLocalStorage(userId) {
    try {
      const usersData = this.getUsersFromLocalStorage();
      const userIndex = usersData.users.findIndex(user => user.id === userId);
      
      if (userIndex === -1) {
        throw new Error('User not found');
      }

      usersData.users.splice(userIndex, 1);
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(usersData));
      
      return { success: true };
    } catch (error) {
      console.error('Error deleting user from localStorage:', error);
      return { success: false, message: error.message };
    }
  }

  updateUserFieldInLocalStorage(userId, fieldPath, value) {
    try {
      const usersData = this.getUsersFromLocalStorage();
      const userIndex = usersData.users.findIndex(user => user.id === userId);
      
      if (userIndex === -1) {
        throw new Error('User not found');
      }

      // Navigate to the nested field and update it
      const fieldParts = fieldPath.split('.');
      let current = usersData.users[userIndex];
      
      for (let i = 0; i < fieldParts.length - 1; i++) {
        if (!current[fieldParts[i]]) {
          current[fieldParts[i]] = {};
        }
        current = current[fieldParts[i]];
      }
      
      current[fieldParts[fieldParts.length - 1]] = value;
      
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(usersData));
      
      // Update current user if it's the same user
      const currentUser = this.getCurrentUser();
      if (currentUser && currentUser.id === userId) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(usersData.users[userIndex]));
      }

      return { success: true, user: usersData.users[userIndex] };
    } catch (error) {
      console.error('Error updating user field in localStorage:', error);
      return { success: false, message: error.message };
    }
  }

  addItemToUserArrayInLocalStorage(userId, fieldPath, item) {
    try {
      const usersData = this.getUsersFromLocalStorage();
      const userIndex = usersData.users.findIndex(user => user.id === userId);
      
      if (userIndex === -1) {
        throw new Error('User not found');
      }

      // Navigate to the array field and add item
      const fieldParts = fieldPath.split('.');
      let current = usersData.users[userIndex];
      
      for (let i = 0; i < fieldParts.length - 1; i++) {
        if (!current[fieldParts[i]]) {
          current[fieldParts[i]] = {};
        }
        current = current[fieldParts[i]];
      }
      
      if (!Array.isArray(current[fieldParts[fieldParts.length - 1]])) {
        current[fieldParts[fieldParts.length - 1]] = [];
      }
      
      current[fieldParts[fieldParts.length - 1]].push(item);
      
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(usersData));
      
      // Update current user if it's the same user
      const currentUser = this.getCurrentUser();
      if (currentUser && currentUser.id === userId) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(usersData.users[userIndex]));
      }

      return { success: true, user: usersData.users[userIndex] };
    } catch (error) {
      console.error('Error adding item to user array in localStorage:', error);
      return { success: false, message: error.message };
    }
  }

  removeItemFromUserArrayInLocalStorage(userId, fieldPath, itemIndex) {
    try {
      const usersData = this.getUsersFromLocalStorage();
      const userIndex = usersData.users.findIndex(user => user.id === userId);
      
      if (userIndex === -1) {
        throw new Error('User not found');
      }

      // Navigate to the array field and remove item
      const fieldParts = fieldPath.split('.');
      let current = usersData.users[userIndex];
      
      for (let i = 0; i < fieldParts.length - 1; i++) {
        if (!current[fieldParts[i]]) {
          throw new Error('Field path not found');
        }
        current = current[fieldParts[i]];
      }
      
      const arrayField = fieldParts[fieldParts.length - 1];
      if (!Array.isArray(current[arrayField])) {
        throw new Error('Field is not an array');
      }
      
      if (itemIndex < 0 || itemIndex >= current[arrayField].length) {
        throw new Error('Invalid item index');
      }
      
      current[arrayField].splice(itemIndex, 1);
      
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(usersData));
      
      // Update current user if it's the same user
      const currentUser = this.getCurrentUser();
      if (currentUser && currentUser.id === userId) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(usersData.users[userIndex]));
      }

      return { success: true, user: usersData.users[userIndex] };
    } catch (error) {
      console.error('Error removing item from user array in localStorage:', error);
      return { success: false, message: error.message };
    }
  }

  // ===== API METHODS (for future use) =====

  async getUsersFromAPI() {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/users`);
      if (!response.ok) throw new Error('Failed to fetch users');
      return await response.json();
    } catch (error) {
      console.error('Error fetching users from API:', error);
      throw error;
    }
  }

  async getUserByIdFromAPI(userId) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/users/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch user');
      return await response.json();
    } catch (error) {
      console.error('Error fetching user by ID from API:', error);
      throw error;
    }
  }

  async getUserByEmailFromAPI(email) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/users/email/${email}`);
      if (!response.ok) throw new Error('Failed to fetch user');
      return await response.json();
    } catch (error) {
      console.error('Error fetching user by email from API:', error);
      throw error;
    }
  }

  async authenticateUserFromAPI(email, password) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) throw new Error('Authentication failed');
      
      const result = await response.json();
      if (result.success) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(result.user));
      }
      
      return result;
    } catch (error) {
      console.error('Error authenticating user from API:', error);
      throw error;
    }
  }

  async updateUserProfileInAPI(userId, updatedProfile) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/users/${userId}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProfile),
      });
      
      if (!response.ok) throw new Error('Failed to update profile');
      
      const result = await response.json();
      
      // Update current user if it's the same user
      const currentUser = this.getCurrentUser();
      if (currentUser && currentUser.id === userId) {
        currentUser.profile = { ...updatedProfile };
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
      }
      
      return result;
    } catch (error) {
      console.error('Error updating user profile in API:', error);
      throw error;
    }
  }

  async createUserInAPI(userData) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) throw new Error('Failed to create user');
      
      return await response.json();
    } catch (error) {
      console.error('Error creating user in API:', error);
      throw error;
    }
  }

  async deleteUserFromAPI(userId) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/users/${userId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete user');
      
      return await response.json();
    } catch (error) {
      console.error('Error deleting user from API:', error);
      throw error;
    }
  }

  async updateUserFieldInAPI(userId, fieldPath, value) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/users/${userId}/field`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fieldPath, value }),
      });
      
      if (!response.ok) throw new Error('Failed to update field');
      
      const result = await response.json();
      
      // Update current user if it's the same user
      const currentUser = this.getCurrentUser();
      if (currentUser && currentUser.id === userId) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(result.user));
      }
      
      return result;
    } catch (error) {
      console.error('Error updating user field in API:', error);
      throw error;
    }
  }

  async addItemToUserArrayInAPI(userId, fieldPath, item) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/users/${userId}/array/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fieldPath, item }),
      });
      
      if (!response.ok) throw new Error('Failed to add item to array');
      
      const result = await response.json();
      
      // Update current user if it's the same user
      const currentUser = this.getCurrentUser();
      if (currentUser && currentUser.id === userId) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(result.user));
      }
      
      return result;
    } catch (error) {
      console.error('Error adding item to user array in API:', error);
      throw error;
    }
  }

  async removeItemFromUserArrayInAPI(userId, fieldPath, itemIndex) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/users/${userId}/array/remove`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fieldPath, itemIndex }),
      });
      
      if (!response.ok) throw new Error('Failed to remove item from array');
      
      const result = await response.json();
      
      // Update current user if it's the same user
      const currentUser = this.getCurrentUser();
      if (currentUser && currentUser.id === userId) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(result.user));
      }
      
      return result;
    } catch (error) {
      console.error('Error removing item from user array in API:', error);
      throw error;
    }
  }

  // ===== UTILITY METHODS =====

  getCurrentUser() {
    try {
      const currentUser = localStorage.getItem(CURRENT_USER_KEY);
      return currentUser ? JSON.parse(currentUser) : null;
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

  // Clear all localStorage data (useful for testing or logout)
  clearAllData() {
    try {
      localStorage.removeItem(USERS_STORAGE_KEY);
      localStorage.removeItem(CURRENT_USER_KEY);
    } catch (error) {
      console.error('Error clearing all data:', error);
    }
  }

  // Reset to default data
  resetToDefaultData() {
    try {
      localStorage.removeItem(USERS_STORAGE_KEY);
      this.initializeLocalStorage();
    } catch (error) {
      console.error('Error resetting to default data:', error);
    }
  }

  // Refresh current user data from localStorage
  refreshCurrentUser(userId) {
    try {
      const user = this.getUserByIdFromLocalStorage(userId);
      if (user) {
        this.setCurrentUser(user);
        return user;
      }
      return null;
    } catch (error) {
      console.error('Error refreshing current user:', error);
      return null;
    }
  }

  // Debug method to check localStorage state
  // debugLocalStorage() {
  //   console.log('=== localStorage Debug Info ===');
  //   console.log('All localStorage keys:', Object.keys(localStorage));
  //   console.log('USERS_STORAGE_KEY:', USERS_STORAGE_KEY);
  //   console.log('CURRENT_USER_KEY:', CURRENT_USER_KEY);
  //   console.log('Users data:', localStorage.getItem(USERS_STORAGE_KEY));
  //   console.log('Current user:', localStorage.getItem(CURRENT_USER_KEY));
  //   console.log('=============================');
  // }
}

// Create and export a single instance
const userService = new UserService();
export default userService;
