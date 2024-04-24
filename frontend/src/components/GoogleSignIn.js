import './styles.scss'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import google from '../images/google.svg';

function GoogleSignIn() {
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();
    const goToGoogle = async () => {
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                
                // const credential = GoogleAuthProvider.credentialFromResult(result);
                // const token = credential.accessToken;
                
                // const user = result.user;
                
                navigate('/home');
            }).catch((error) => {
                console.error(error);
                // Handle Errors here.
                // const errorCode = error.code;
                // const errorMessage = error.message;
                // // The email of the user's account used.
                // const email = error.customData.email;
                // // The AuthCredential type that was used.
                // const credential = GoogleAuthProvider.credentialFromError(error);
                // // ...
            });
    }
    return (
        <img className='log-in__google' onClick={goToGoogle} src={google} alt="Google sign-in"
            title="Sign in with Google" />
    )
}
export default GoogleSignIn;