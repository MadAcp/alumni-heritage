import {
    collection,
    query,
    orderBy,
    getDocs,
    getDoc,
    doc,
    setDoc,
    updateDoc,
    deleteDoc,
} from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

const DEPARTMENT_COLLECTION = "departments";

class DepartmentService {
    /**
     * Fetches all departments, ordered by name. This is a public method.
     * @returns {Promise<{success: boolean, data?: object[], message?: string}>}
     */
    async getAllDepartments() {
        try {
            const q = query(collection(db, DEPARTMENT_COLLECTION), orderBy("departmentName"));
            const querySnapshot = await getDocs(q);
            const departments = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return { success: true, data: departments };
        } catch (error) {
            console.error("Error getting all departments:", error);
            return { success: false, message: error.message };
        }
    }

    /**
     * Fetches a single department by its ID. This is a public method.
     * @param {string} departmentId - The ID of the department to fetch.
     * @returns {Promise<{success: boolean, data?: object, message?: string}>}
     */
    async getDepartmentById(departmentId) {
        try {
            const docRef = doc(db, DEPARTMENT_COLLECTION, departmentId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
            } else {
                return { success: false, message: "No such department found!" };
            }
        } catch (error) {
            console.error("Error getting department by ID:", error);
            return { success: false, message: error.message };
        }
    }

    /**
     * Creates a new department. UI should check for admin role before calling.
     * @param {string} userRole - The role of the user attempting the action.
     * @param {object} departmentData - The department data, including a unique 'id'.
     * @returns {Promise<{success: boolean, id?: string, message?: string}>}
     */
    async createDepartment(userRole, departmentData) {
        try {
            if (userRole !== 'admin') {
                return { success: false, message: "Permission denied. Admin role required." };
            }
            await setDoc(doc(db, DEPARTMENT_COLLECTION, departmentData.id), departmentData);
            return { success: true, id: departmentData.id };
        } catch (error) {
            console.error("Error creating department:", error);
            return { success: false, message: error.message };
        }
    }

    /**
     * Updates an existing department. UI should check for admin role before calling.
     * @param {string} userRole - The role of the user attempting the action.
     * @param {string} departmentId - The ID of the department to update.
     * @param {object} updatedData - The fields to update.
     * @returns {Promise<{success: boolean, message?: string}>}
     */
    async updateDepartment(userRole, departmentId, updatedData) {
        try {
            if (userRole !== 'admin') {
                return { success: false, message: "Permission denied. Admin role required." };
            }
            await updateDoc(doc(db, DEPARTMENT_COLLECTION, departmentId), updatedData);
            return { success: true };
        } catch (error) {
            console.error("Error updating department:", error);
            return { success: false, message: error.message };
        }
    }

    /**
     * Deletes a department. UI should check for admin role before calling.
     * @param {string} userRole - The role of the user attempting the action.
     * @param {string} departmentId - The ID of the department to delete.
     * @returns {Promise<{success: boolean, message?: string}>}
     */
    async deleteDepartment(userRole, departmentId) {
        try {
            if (userRole !== 'admin') {
                return { success: false, message: "Permission denied. Admin role required." };
            }
            await deleteDoc(doc(db, DEPARTMENT_COLLECTION, departmentId));
            return { success: true };
        } catch (error) {
            console.error("Error deleting department:", error);
            return { success: false, message: error.message };
        }
    }
}

const departmentService = new DepartmentService();
export default departmentService;