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
        <header className='header'>
            <div className='header__divide'>
                <a className='header__item' onClick={home}>Home</a>
                <a className='header__item' onClick={myProfile} >Profile</a>
            </div>
            <LogOut />
        </header>
    )
}

export default Header;