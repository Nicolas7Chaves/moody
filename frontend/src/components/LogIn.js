import './styles.scss'
import { useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword, signInAnonymously } from "firebase/auth";
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
    const forgotPassword = () => {
        navigate('/forgot-password')
    }
    const handleGuestLogin = async () => {
        const auth = getAuth();
        setError('');
        try {
            const userCredential = await signInAnonymously(auth);
            console.log("Guest login successful", userCredential);
            navigate('/home');
            setError('');
        } catch (error) {
            console.error("Error signing in anonymously:", error);
            setError(error.message);
        }
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
            switch (error.code) {
                case "auth/wrong-password":
                    setError("Incorrect password. Please try again.");
                    break;
                case "auth/user-not-found":
                    setError("No user found with this email address.");
                    break;
                case "auth/invalid-email":
                    setError("The email address is not valid.");
                    break;
                case "auth/invalid-credential":
                    setError("The provided credentials are invalid. Please check and try again.");
                    break;
                case "auth/too-many-requests":
                    setError("Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.");
                    break;
                default:
                    setError("Login failed. Please try again.");
                    break;
            }
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
                    <button className='log-in__button log-in__button--guest' onClick={handleGuestLogin}>Guest</button>
                </form>
                <div className='log-in__accounts-section'>

                    <button className='log-in__account' onClick={goToCreateAccount}>Create Account</button>
                    <GoogleSignIn />
                </div>
                <div onClick={forgotPassword} className='forgot'>Forgot Password?</div>
                {error && <div className="log-in__error">{error}</div>}
            </section>
            <Footer />
        </div>

    )
}

export default LogIn;