import LogOut from './LogOut';
import './styles.scss'
import { useNavigate } from 'react-router-dom';
import logopic from '../images/postr3.png';
import homeIcon from '../images/home2.svg';
import profileIcon from '../images/profile2.svg';


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
                <img className='header__logo' src={logopic} alt='logo' />
                <img className='header__item' src={homeIcon} alt='home page' onClick={home} />
                <img className='header__item' src={profileIcon} alt='profile page' onClick={myProfile} />
            </div>
            <LogOut />
        </header>
    )
}

export default Header;