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
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));


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

// function authCreateAcctWithEmail() {
//     // const email = emailInputEl.value
//     // const password = passwordInputEl.value
//     createUserWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => { 
//             const user = userCredential.user;
//             console.log(user);

//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             console.error("authcreateAcctWithEmail Error: ", errorCode, errorMessage)
//         });
// }

app.post('/create-account', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("User created:", user.uid);
        res.status(200).send({ message: 'Account created successfully' });
    } catch (error) {
        console.error("Error creating account:", error);
        res.status(500).send({ error: 'Account creation failed' });
    }
});



app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

