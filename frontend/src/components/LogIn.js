import './styles.scss'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function LogIn() {
    const navigate = useNavigate();
    const goToCreateAccount = () => {
        navigate('/create-account')
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        try {
            const response = await axios.post('http://localhost:8000/', {email, password});
            console.log(response);
            navigate('/home')
        } catch (error) {
            console.error("Error signing into account:", error);
        }
    }
    return (
        <section>
            <h1>Log In
            </h1>
            <form onSubmit={handleSubmit}>
                <input name='email' type="email" placeholder="email" />
                <input name='password' type="password" placeholder="password" />
                <button type='submit'>
                    Sign In
                </button>
            </form>
            <button onClick={goToCreateAccount}>Create Account</button>
        </section>
    )
}

export default LogIn;