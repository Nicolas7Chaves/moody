// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import express from 'express';
import cors from 'cors';
import 'dotenv/config';

// Initialize Express app
const app = express();
const port = process.env.BACKEND_PORT || 5001;


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

// Your web app's Firebase configuration
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
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
console.log("auth: ", auth);

// const analytics = getAnalytics(firebaseApp);

function authCreateAcctWithEmail() {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => { 
            const user = userCredential.user;
            console.log(user);
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("authcreateAcctWithEmail Error: ", errorCode, errorMessage)
        });
}