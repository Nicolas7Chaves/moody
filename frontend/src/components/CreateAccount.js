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

    const goBack = () => {
        navigate('/');
    }

    return (
        <div className='create-account'>
            <h1 className='create-account__title'>Create your postr</h1>
            <form className='create-account__form' onSubmit={handleSubmit}>
                <input className='create-account__input' name="email" type="email" placeholder="username" />
                <input className='create-account__input' name="password" type="password" placeholder="password" />
                <button className='create-account__button' type='submit'>Create Account</button>
            </form>
                <button className='create-account__return' onClick={goBack}>Return</button>
        </div>
    );
}

export default CreateAccount;
