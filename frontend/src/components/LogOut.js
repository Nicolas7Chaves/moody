import './styles.scss'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';


function LogOut() {
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/logout');
            console.log(response);
            navigate('/');
        } catch (error) {
            console.error("Error logging out:", error);
        }
    }
    return (
        <section onSubmit={handleSubmit}>
            <button type='submit'>Log Out</button>
        </section>
    )
}

export default LogOut;

