// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPJB8k4YSxk9EOK7_eIIfeYrxgTFv_zM0",
  authDomain: "hive---ai-travel-guide.firebaseapp.com",
  projectId: "hive---ai-travel-guide",
  storageBucket: "hive---ai-travel-guide.firebasestorage.app",
  messagingSenderId: "725542093646",
  appId: "1:725542093646:web:af2ac059b3171c47e6d41f",
  measurementId: "G-DRXFJMFH30"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);