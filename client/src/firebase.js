// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "webbuilder-6844b.firebaseapp.com",
  projectId: "webbuilder-6844b",
  storageBucket: "webbuilder-6844b.firebasestorage.app",
  messagingSenderId: "937936365270",
  appId: "1:937936365270:web:52a890d128b786a5b40b77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth= getAuth(app)
const provider=new GoogleAuthProvider()

export {auth,provider}
