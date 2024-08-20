// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
  } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGSQ1hcCDUrQZwdHLSMSzQDu2g3blANNM",
  authDomain: "deporte-triunfo-admin.firebaseapp.com",
  projectId: "deporte-triunfo-admin",
  storageBucket: "deporte-triunfo-admin.appspot.com",
  messagingSenderId: "704381614622",
  appId: "1:704381614622:web:9d6b2fbdfd72c6fb4fcc0f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);