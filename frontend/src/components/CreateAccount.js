import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore"; // Import Firestore functions

import './styles.scss';

function CreateAccount() {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = e.target.elements.username.value;
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        const auth = getAuth();
        const db = getFirestore();  // Initialize Firestore

        try {
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;  // Get the user record from the authentication module

            // Save additional user info in Firestore
            await setDoc(doc(db, "users", user.uid), {
                username: username,
                email: email  // Optionally store the email as well in Firestore
            });

            console.log("Account creation successful");
            navigate('/');  // Redirect the user after successful account creation
        } catch (error) {
            console.error("Error creating account:", error.message);
        }
    }

    const goBack = () => {
        navigate('/');
    }

    return (
        <div className='create-account'>
            <h1 className='create-account__title'>Create your postr</h1>
            <form className='create-account__form' onSubmit={handleSubmit}>
                <input className='create-account__input' name="username" type="text" placeholder="username" required />
                <input className='create-account__input' name="email" type="email" placeholder="email" required />
                <input className='create-account__input' name="password" type="password" placeholder="password" required />
                <button className='create-account__button' type='submit'>Create Account</button>
            </form>
            <button className='create-account__return' onClick={goBack}>Return</button>
        </div>
    );
}

export default CreateAccount;
