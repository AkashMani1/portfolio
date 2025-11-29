// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHPm_pnFz0QfP8Gl9zpE4WW--i4T2hSMI",
  authDomain: "akash-portfolio-4558d.firebaseapp.com",
  projectId: "akash-portfolio-4558d",
  storageBucket: "akash-portfolio-4558d.firebasestorage.app",
  messagingSenderId: "874943401452",
  appId: "1:874943401452:web:5b02b9171ca75d7dee04c9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);