import './styles.scss'
import { useNavigate } from 'react-router-dom'
// import axios from 'axios';
import { getAuth, signOut } from 'firebase/auth';  
import logout from '../images/logout2.svg';


function LogOut() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const auth = getAuth();
        try {
            await signOut(auth);
            console.log("Logged out");
            navigate('/');
        } catch (error) {
            console.error("Error logging out:", error);
        }
    }
    return (
        // <button className='logout' onClick={handleLogout}>Log Out</button>
        <img className='logout' src={logout} alt='logout' onClick={handleLogout} />
    );
}


export default LogOut;

