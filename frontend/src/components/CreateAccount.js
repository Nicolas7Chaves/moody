import { useNavigate } from 'react-router-dom';
import './styles.scss'
import axios from 'axios';

function CreateAccount() {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;

        try {
            const response = await axios.post("http://localhost:8000/create-account", {email, password});
            console.log(response);
            navigate('/');
        } catch (error) {
            console.error("Error creating account:", error);
        }
    }
    return (

        <>
            <h1>Create an Account</h1>
            <form onSubmit={handleSubmit}>
                <input name="email" type="email" placeholder="email" />
                <input name="password" type="password" placeholder="password" />
                <button type='submit'>
                    Create Account
                </button>
            </form>
        </>
    )
}

export default CreateAccount;