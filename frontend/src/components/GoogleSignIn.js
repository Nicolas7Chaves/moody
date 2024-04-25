import './styles.scss'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import google from '../images/google.svg';

function GoogleSignIn() {
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();
    const auth = getAuth();

    const goToGoogle = async () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log("Google sign-in successful, redirecting to home...");
                navigate('/home');
            }).catch(async (error) => {
                if (error.code === 'auth/account-exists-with-different-credential') {
                    const methods = await fetchSignInMethodsForEmail(auth, error.email);
                    console.error(`Your email is already used with these sign-in methods: ${methods.join(', ')}. Please use one of those methods.`);
                } else {
                    console.error("Error with Google sign-in:", error);
                }
            });
    }
    return (
        <img className='log-in__google' onClick={goToGoogle} src={google} alt="Google sign-in"
            title="Sign in with Google" />
    )
}
export default GoogleSignIn;