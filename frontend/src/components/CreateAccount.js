import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
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
        const db = getFirestore(); 

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;  
            await sendEmailVerification(user);  // Send email verification to the user
            await setDoc(doc(db, "users", user.uid), {
                email: email  
            });

            console.log("Account creation successful");
            navigate('/'); 
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
                <input className='create-account__input' name="email" type="email" placeholder="email" required />
                <input className='create-account__input' name="password" type="password" placeholder="password" required />
                <button className='create-account__button' type='submit'>Create Account</button>
            </form>
            <button className='create-account__return' onClick={goBack}>Return</button>
        </div>
    );
}

export default CreateAccount;
