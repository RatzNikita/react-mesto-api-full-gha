import logo from "../images/logo-white.png";
import {useLocation, useNavigate} from "react-router-dom";

const Header = ({email}) => {

    const navigate = useNavigate()
    const location = useLocation()

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/sign-in')
    }

    const handleToSignUp = () => {
        navigate('/sign-up', {replace: true});
    }

    const handleToSignIn = () => {
        navigate('/sign-in', {replace: true});
    }

    return (<header className="header">
        <img alt="Логотип сайта"
             className="header__logo"
             src={logo}/>
        {location.pathname === '/sign-up' &&
            <p className='header__link' onClick={handleToSignIn}>Войти</p>}
        {location.pathname === '/sign-in' &&
            <p className='header__link' onClick={handleToSignUp}>Регистрация</p>}
        {email &&
            <div>
                <p className='header__text'>{email}</p>
                <p className='header__link' onClick={handleLogout}>{'Выйти'}</p>
            </div>}
    </header>)
}

export default Header