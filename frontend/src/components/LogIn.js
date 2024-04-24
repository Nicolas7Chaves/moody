import './styles.scss'
import { useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import GoogleSignIn from './GoogleSignIn';
import logo from '../images/postrlogin.png';


function LogIn() {
    const navigate = useNavigate();
    const goToCreateAccount = () => {
        navigate('/create-account')
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const auth = getAuth();
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Login successful");
            navigate('/home');
        } catch (error) {
            console.error("Error signing into account:", error);
        }
    }
    return (
        <section className='log-in'>
            <img className='log-in__logo' src={logo} />
            <form className='log-in__form' onSubmit={handleSubmit}>
                <input className='log-in__input' name='email' type="email" placeholder="username" />
                <input className='log-in__input' name='password' type="password" placeholder="password" />
                <button className='log-in__button' type='submit'>
                    Sign In
                </button>
            </form>
            <div className='log-in__accounts-section'>
                <button className='log-in__account' onClick={goToCreateAccount}>Create Account</button>
                <GoogleSignIn />
            </div>

        </section>
    )
}

export default LogIn;