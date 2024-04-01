import './styles.scss'
import { useNavigate } from 'react-router-dom'

function LogIn() {
    const navigate = useNavigate();
    const goToCreateAccount = () => {
        navigate('/create-account')
    }
    return (
        <section>
            <h1>Log In
            </h1>
            <form>
                <input type="email" placeholder="email" />
                <input type="password" placeholder="password"/>
                <button>
                    Sign In
                </button>
            </form>
            <button onClick={goToCreateAccount}>Create Account</button>
        </section>
    )
}

export default LogIn;