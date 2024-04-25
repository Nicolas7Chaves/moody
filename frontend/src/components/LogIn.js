import './styles.scss'
import { useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import GoogleSignIn from './GoogleSignIn';
import logo from '../images/postrBanner.png';
import Footer from './Footer';
import { useState } from 'react';

function LogIn() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const goToCreateAccount = () => {
        navigate('/create-account')
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const auth = getAuth();
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        setError('');
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            if (user && !user.emailVerified) {
                setError("Please verify your email address to log in.");
            } else {
                console.log("Login successful");
                navigate('/home');
            }
        } catch (error) {
            console.error("Error signing into account:", error);
            setError(error.message);
        }
    }
    return (
        <div className='log-in__section'>
            <section className='log-in'>
                <img className='log-in__logo' src={logo} alt='logo' />
                <form className='log-in__form' onSubmit={handleSubmit}>
                    <input className='log-in__input' name='email' type="email" placeholder="email" />
                    <input className='log-in__input' name='password' type="password" placeholder="password" />
                    <button className='log-in__button' type='submit'>
                        Sign In
                    </button>

                </form>
                <div className='log-in__accounts-section'>
                    <button className='log-in__account' onClick={goToCreateAccount}>Create Account</button>
                    <GoogleSignIn />
                </div>
                {error && <div className="log-in__error">{error}</div>}
            </section>

            <Footer />
        </div>

    )
}

export default LogIn;