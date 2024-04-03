import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import './styles.scss';

function CreateAccount() {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        const auth = getAuth(); 
        console.log(auth)

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log("Account creation successful");
            navigate('/'); 
        } catch (error) {
            console.error("Error creating account:", error.message);
        }
    }

    return (
        <>
            <h1>Create an Account</h1>
            <form onSubmit={handleSubmit}>
                <input name="email" type="email" placeholder="email" />
                <input name="password" type="password" placeholder="password" />
                <button type='submit'>Create Account</button>
            </form>
        </>
    );
}

export default CreateAccount;
