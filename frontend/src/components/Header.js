import LogOut from './LogOut';
import './styles.scss'
import { useNavigate } from 'react-router-dom';
function Header() {
const navigate = useNavigate();

const myProfile = () => {
    navigate('/my-profile')
}

const home = () => {
    navigate('/home')
}
    return (
        <header>
            <a onClick={home}>Home</a>
            <a onClick={myProfile} >Profile</a>
            <LogOut />
        </header>
    )
}

export default Header;