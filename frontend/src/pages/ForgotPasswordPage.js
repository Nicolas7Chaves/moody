import '../components/styles.scss'
import { useNavigate } from 'react-router-dom';



function ForgotPasswordPage() {
    const navigate = useNavigate(); 
    const returnToLogin = () => {
        navigate('/');
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Reset password link sent');
    };

    return (
        <div className='forgot-pw'>
            <h1 className='forgot-pw__title'>Forgot Password</h1>
            <p className='forgot-pw__text'>Enter your email address below and we'll send you a link to reset your password.</p>
            <form className='forgot-pw__form' onSubmit={handleSubmit}>
                <input className='forgot-pw__input' type="email" placeholder="Email" />
                <button className='forgot-pw__button' type="submit">Send Reset Email</button>
            </form>
            <button className='return' onClick={returnToLogin}>Return</button>
        </div>
    );
}

export default ForgotPasswordPage;
