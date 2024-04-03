import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAgS_yIZktdOEZMTq-blqohWi23KKMskDE",
    authDomain: "moody-bc3b1.firebaseapp.com",
    projectId: "moody-bc3b1",
    storageBucket: "moody-bc3b1.appspot.com",
    messagingSenderId: "18481814798",
    appId: "1:18481814798:web:3cf8efc9eda8f178608b5f",
    measurementId: "G-48LXZQYHL6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the auth module
export const auth = getAuth(app);