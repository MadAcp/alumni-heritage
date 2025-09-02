import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where,
    onSnapshot,
} from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import bcrypt from 'bcryptjs';

const USER_COLLECTION = "alumni-users";

class FirebaseService {

    // Read user from firebase using getDoc userId
    async getFirebaseUser(userId) {
        try {
            const docRef = doc(db, USER_COLLECTION, userId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
            } else {
                return { success: false, message: 'User not found' };
            }
        } catch (error) {
            console.error('Error getting user from Firebase:', error);
            return { success: false, message: error.message };
        }
    }

    // Get all users from firebase using getDocs
    async getAllFirebaseUsers() {
        try {
            const querySnapshot = await getDocs(collection(db, USER_COLLECTION));
            const users = [];
            querySnapshot.forEach((doc) => {
                users.push({ id: doc.id, ...doc.data() });
            });
            return { success: true, data: users };
        } catch (error) {
            console.error('Error getting all users from Firebase:', error);
            return { success: false, message: error.message };
        }
    }

    // Get user from firebase using email
    async getFirebaseUserByEmail(email) {
        try {
            const q = query(collection(db, USER_COLLECTION), where("email", "==", email));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const user = { id: userDoc.id, ...userDoc.data() };
                return { success: true, data: user };
            } else {
                return { success: false, message: 'User not found' };
            }
        } catch (error) {
            console.error('Error getting user by email from Firebase:', error);
            return { success: false, message: error.message };
        }
    }

    // Create user in firebase using setDoc
    async createFirebaseUser(userData) {
        try {
            await setDoc(doc(db, USER_COLLECTION, userData.id), userData);
            return { success: true, id: userData.id };
        } catch (error) {
            console.error('Error creating user in Firebase:', error);
            return { success: false, message: error.message };
        }
    }

    // Update whole user in firebase using updateDoc
    async updateFirebaseUser(userId, updatedData) {
        try {
            await updateDoc(doc(db, USER_COLLECTION, userId), updatedData);
            return { success: true };
        } catch (error) {
            console.error('Error updating user in Firebase:', error);
            return { success: false, message: error.message };
        }
    }

    // Update user field only in firebase using updateDoc
    async updateFirebaseUserField(userId, fieldPath, value) {
        try {
            await updateDoc(doc(db, USER_COLLECTION, userId), { [fieldPath]: value });
            return { success: true };
        } catch (error) {
            console.error('Error updating user field in Firebase:', error);
            return { success: false, message: error.message };
        }
    }

    // Delete user from firebase using deleteDoc
    async deleteFirebaseUser(userId) {
        try {
            await deleteDoc(doc(db, USER_COLLECTION, userId));
            return { success: true };
        } catch (error) {
            console.error('Error deleting user from Firebase:', error);
            return { success: false, message: error.message };
        }
    }

    // Authenticate user from firebase using email and password
    async authenticateFirebaseUser(email, password) {
        try {
            const response = await this.getFirebaseUserByEmail(email);
            if (response.success) {
                const user = response.data;
                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) return { success: true, data: user };
            }
            return { success: false, message: 'Invalid credentials' };
        } catch (error) {
            console.error('Error authenticating user from Firebase:', error);
            return { success: false, message: error.message };
        }
    }

    // Generate userId from firebase user count
    async generateUserId() {
        const response = await this.getAllFirebaseUsers();
        const userCount = response.data.length;
        const newId = `U${String(userCount + 1).padStart(3, '0')}`;
        return newId;
    }

    // Generate dummy users for testing
    async generateDummyUsers() {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("password123", salt);
        try {
            const dummyUsers = [
                {
                    id: 'U001',
                    email: 'john.doe@alumni.edu',
                    role: 'alumni',
                    password: hashedPassword,
                    profile: {
                        personalInfo: {
                            firstName: 'John',
                            lastName: 'Doe',
                            dateOfBirth: '1985-03-15',
                            gender: 'Male',
                            nationality: 'American',
                            contactInfo: {
                                email: 'john.doe@alumni.edu',
                                phone: '+1-555-0123',
                                address: {
                                    street: '123 Alumni Drive',
                                    city: 'Springfield',
                                    state: 'IL',
                                    zipCode: '62701',
                                    country: 'USA'
                                }
                            }
                        },
                        academicInfo: {
                            degree: 'Bachelor of Science',
                            major: 'Computer Science',
                            minor: 'Mathematics',
                            graduationYear: 2007,
                            gpa: '3.85',
                            honors: 'Magna Cum Laude',
                            thesis: 'Machine Learning Applications in Data Analysis',
                            academicAwards: [
                                "Dean's List (2004-2007)",
                                "Computer Science Department Award",
                                "Mathematics Excellence Award"
                            ]
                        },
                        professionalInfo: {
                            currentPosition: 'Senior Software Engineer',
                            currentCompany: 'TechCorp Solutions',
                            industry: 'Technology',
                            yearsOfExperience: 16,
                            skills: [
                                'JavaScript',
                                'Python',
                                'React',
                                'Node.js',
                                'Machine Learning',
                                'Data Analysis'
                            ],
                            certifications: [
                                'AWS Certified Solutions Architect',
                                'Google Cloud Professional Developer',
                                'Certified Scrum Master'
                            ]
                        },
                        alumniActivities: {
                            membershipLevel: 'Gold',
                            donationHistory: [
                                { year: 2022, amount: 1000, purpose: 'Scholarship Fund' },
                                { year: 2021, amount: 500, purpose: 'Library Renovation' },
                                { year: 2020, amount: 750, purpose: 'Research Grant' }
                            ],
                            volunteerWork: [
                                'Alumni Mentorship Program',
                                'Career Fair Organizer',
                                'Student Interview Panel'
                            ],
                            eventsAttended: [
                                '2023 Homecoming Celebration',
                                '2022 Alumni Reunion',
                                '2021 Virtual Networking Event'
                            ]
                        },
                        achievements: {
                            professional: [
                                'Increased company revenue by 35% through strategic initiatives',
                                'Led successful merger of three business units',
                                'Established new international market presence in Asia'
                            ],
                            community: [
                                'Chair of local business networking group',
                                'Advisor to startup incubator program',
                                'Speaker at women in business conferences'
                            ]
                        }
                    }
                },
                {
                    "id": "U002",
                    "email": "sarah.smith@alumni.edu",
                    "role": "alumni",
                    "password": hashedPassword,
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
                },
                {
                    "id": "U003",
                    "email": "avadhutcpatil@gmail.com",
                    "role": "admin",
                    "password": hashedPassword,
                    "profile": {
                        "alumniActivities": {
                            "donationHistory": [],
                            "membershipLevel": "",
                            "eventsAttended": [],
                            "volunteerWork": []
                        },
                        "achievements": {
                            "community": [],
                            "professional": []
                        },
                        "academicInfo": {
                            "degree": "Master of Computer Application",
                            "major": "Computer",
                            "graduationYear": 0,
                            "thesis": "",
                            "academicAwards": [],
                            "minor": "Zoology",
                            "gpa": "",
                            "honors": "",
                            "studentId": ""
                        },
                        "personalInfo": {
                            "nationality": "",
                            "contactInfo": {
                                "address": {
                                    "street": "8, Vasant Colony, Market Yard",
                                    "zipCode": "416416",
                                    "city": "Sangli",
                                    "country": "India",
                                    "state": "Maharashtra"
                                },
                                "phone": "09503815394",
                                "email": "avadhutcpatil@gmail.com"
                            },
                            "firstName": "Avadhut",
                            "middleName": "Chandrakant",
                            "dateOfBirth": "1986-04-07",
                            "gender": "Male",
                            "lastName": "Patil"
                        },
                        "professionalInfo": {
                            "currentCompany": "Dnyandeep Infotech Pvt. Ltd.",
                            "industry": "",
                            "currentPosition": "Lead",
                            "yearsOfExperience": 0,
                            "certifications": [
                                "Bad Boy",
                                "Coder Pro"
                            ],
                            "skills": [
                                "Java",
                                "React",
                                "Springboot"
                            ]
                        }
                    },
                }
            ];

            for (const user of dummyUsers) {
                await this.createFirebaseUser(user);
            }

            return { success: true };
        } catch (error) {
            console.error('Error generating dummy users in Firebase:', error);
            return { success: false, message: error.message };
        }
    }
}

const firebaseService = new FirebaseService();
export default firebaseService;
