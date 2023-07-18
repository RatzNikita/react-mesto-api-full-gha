import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import * as auth from '../utils/auth.js';
import Header from "./Header";

const Login = ({handleLogin}) => {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValue({
            ...formValue,
            [name]: value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formValue.password || !formValue.email) {
            return;
        }
        auth.authorize(formValue.password, formValue.email)
            .then((data) => {
                if (data.token) {
                    handleLogin(formValue.email);
                    setFormValue({email: '', password: ''});
                    navigate('/', {replace: true});
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <Header/>
            <div className="auth-screen">
                <h2 className="auth-screen__title">{'Вход'}</h2>
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
                    <button className="auth-screen__submit-btn" type="submit">{'Войти'}</button>
                </form>
            </div>
        </div>
    )
}

export default Login;