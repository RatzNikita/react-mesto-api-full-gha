import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import * as auth from '../utils/auth.js';
import {InfoTooltip} from "./InfoTooltip";
import errorImg from '../images/error.svg'
import successImg from "../images/success.svg";
import Header from "./Header";

export const Register = () => {

    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const [formValue, setFormValue] = useState({
        email: '', password: ''
    })
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormValue({
            ...formValue, [name]: value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        auth.register(formValue.password, formValue.email).then((res) => {
            if (res.data) {
                setSuccess(true)
            }
        }).catch(err => {
            setError(true)
            console.log(err)
        })
    }

    const handleCloseErrorPopup = () => {
        setError(false)
    }

    const handleCloseSuccessPopup = () => {
        setSuccess(false)
        navigate('/sign-in', {replace: true});
    }

    const handleToSignIn = () => {
        navigate('/sign-in', {replace: true});
    }

    return (
        <div>
            <Header/>
            <div className="auth-screen">
                <h2 className="auth-screen__title">{'Регистрация'}</h2>
                <form className="popup__form" id="card-form" onSubmit={handleSubmit}>
                    <input className="auth-screen__input"
                           placeholder="Email"
                           type="email"
                           name="email"
                           required
                           minLength="2"
                           maxLength="40"
                           value={formValue.email}
                           onChange={handleChange}/>
                    <input className="auth-screen__input"
                           placeholder="Пароль"
                           type="text"
                           name="password"
                           required
                           value={formValue.password}
                           onChange={handleChange}/>
                    <button className="auth-screen__submit-btn" type="submit">{'Зарегистрироваться'}</button>
                    <p className='auth-screen__caption' onClick={handleToSignIn}>{'Уже зарегистрированы? Войти'}</p>
                </form>
            </div>
            {error && <InfoTooltip title={`Что-то пошло не так!Попробуйте ещё раз.`}
                                   icon={errorImg}
                                   onClose={handleCloseErrorPopup}/>}
            {success && <InfoTooltip title='Вы успешно зарегистрировались!'
                                     icon={successImg}
                                     onClose={handleCloseSuccessPopup}/>}
        </div>
    );
}
