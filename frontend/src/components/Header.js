import LogOut from './LogOut';
import './styles.scss'
import { useNavigate } from 'react-router-dom';
import logopic from '../images/postr3.png';

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
            <img className='header__logo' src={logopic} alt='logo' />
            <div className='header__divide'>
                <a className='header__item' onClick={home}>Home</a>
                <a className='header__item' onClick={myProfile} >Profile</a>
            </div>
            <LogOut />
        </header>
    )
}

export default Header;