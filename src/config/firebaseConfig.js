import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAesmHZjaACzJGOwd3oYSb5ms8dmkFE6mc",
  authDomain: "alumni-heritage.firebaseapp.com",
  projectId: "alumni-heritage",
  storageBucket: "alumni-heritage.firebasestorage.app",
  messagingSenderId: "741212645057",
  appId: "1:741212645057:web:28cd023de9b80eb3df1640",
  measurementId: "G-BFEGPKY77S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
export { db };
