import '../components/styles.scss'
import { useNavigate } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from 'react';


function ForgotPasswordPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const returnToLogin = () => {
        navigate('/');
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const auth = getAuth();
        setMessage('');
        setError('');
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setMessage('Password reset email sent');
            })
            .catch((error) => {
                setError(error.message);
                console.error("Error sending password reset email:", error);
            });

    };

    return (
        <div className='forgot-pw'>
            <h1 className='forgot-pw__title'>Forgot Password</h1>
            <p className='forgot-pw__text'>Enter your email address below and we'll send you a link to reset your password.</p>
            <form className='forgot-pw__form' onSubmit={handleSubmit}>
                <input className='forgot-pw__input' type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button className='forgot-pw__button' type="submit">Send Reset Email</button>
            </form>
            {message && <div className='forgot-pw__message'>{message}</div>}
            {error && <div className='forgot-pw__error'>{error}</div>}
            <button className='return' onClick={returnToLogin}>Return</button>
        </div>
    );
}

export default ForgotPasswordPage;
