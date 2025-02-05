import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyD42GimcPhm2Z4JuS9Bevn0kpsIEqdYcAQ",
  authDomain: "wordle-leaderboard-9a182.firebaseapp.com",
  projectId: "wordle-leaderboard-9a182",
  storageBucket: "wordle-leaderboard-9a182.firebasestorage.app",
  messagingSenderId: "462143735136",
  appId: "YOUR_1:462143735136:web:9dec210a5462afee0cca05APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export Firestore functions
export { db, collection, getDocs, addDoc };
