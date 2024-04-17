import './styles.scss'
import { useNavigate } from 'react-router-dom'
// import axios from 'axios';
import { getAuth, signOut } from 'firebase/auth';  



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
        <button className='logout' onClick={handleLogout}>Log Out</button>
    );
}


export default LogOut;

