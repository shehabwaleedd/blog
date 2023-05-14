import React from 'react'
import './SignUp.css'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useUserAuth } from '../authContext/AuthContext'
import { useTranslation } from 'react-i18next'
import { FacebookAuthProvider } from "firebase/auth";
import Data from './Data'


const SignUp = (Props) => {

    const [error, setError] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    const { createUser, signInWithGoogle, signInWithFacebook, signInWithApple } = useUserAuth()

    let navigate = useNavigate()
    const { t } = useTranslation()

    const handleGoogle = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await signInWithGoogle(email, password);
            navigate('/')
        } catch (e) {
            setError(e.message);
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await createUser(email, password);
            navigate('/')
        } catch (e) {
            setError(e.message);
            console.log(e.message);
        }
    }

    const handleFacebook = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await signInWithFacebook(email, password);
            navigate('/blog')
        } catch (e) {
            setError(e.message);
            console.log(error);
        }
    }









    return (
        <section className="signup section">
            <div className="signup__container container">
                <h2 className='section__title-signup'>{t("signup__form__title")}</h2>
                <div className="signup__content">
                    <div className="signup__page-left">
                        <div className="signup__page_top-content">
                            <h3>Blog It Your Way: Discover, Share, and Inspire</h3>
                        </div>
                        <div className="signup__page_bottom-content">
                            <div className="signup__bottom_content-item">
                                <i className='bx bxs-balloon' ></i>
                                <h3><span>Document your life.</span> Discover the powerful moments in your daily, mundane life.</h3>
                            </div>
                        </div>
                        <div className="signup__page_bottom-content">
                            <div className="signup__bottom_content-item">
                                <i className='bx bx-bulb' ></i>
                                <h3><span>Get creatuve every day.</span> Create and share something daily.</h3>
                            </div>
                        </div>
                        <div className="signup__page_bottom-content">
                            <div className="signup__bottom_content-item">
                                <i className='bx bxs-hot' ></i>
                                <h3><span>Improve Self-Discipline.</span> Prove yourself and accomplish the goals you set.</h3>
                            </div>
                        </div>
                        <div className="signup__page_bottom-content">
                            <div className="signup__bottom_content-item">
                                <i className='bx bx-pencil' ></i>
                                <h3><span>Write better blogs.</span> Improve your blogging skills by writing every day.</h3>
                            </div>
                        </div>
                    </div>
                    <div className="signup__page-right">
                        <div className="signup__page_top-image">
                            <div className='signup__page__top-images'>
                                {Data.map((item, index) => { return (<img src={item.image} alt="" key={index} />) })}
                            </div>
                            <div className="">
                                <h3>Join these and 1000+ other bloggers</h3>
                            </div>
                        </div>
                        <form className="signup__form" onSubmit={handleSubmit}>
                            <div className="signup__form-container">
                                <div className="signup__user">
                                    <input type="email" id="email" name='email' className="login__input-field" placeholder={t("signup__form__email")} value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <input type="text" id="user" name='username' className="login__input-field" placeholder={t("signup__form__username")} value={username} onChange={(e) => setUsername(e.target.value)} />
                                    <input type="password" id="password" name='password' className="signup__input-field" placeholder={t("signup__form__password")} value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <input type="password" id="password" name="confirmPassword" className="signup__input-field" placeholder={t("signup__form__password_again")} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                </div>
                                <div className="signup__button">
                                    <div className="signup__button_manual">
                                        <button type="submit" className="signup__button-sign">
                                            <h3>Register</h3>
                                            <i className="uil uil-arrow-right button__icon-login"></i>
                                        </button>
                                    </div>
                                    <div className="signup__button_google">
                                        <button onClick={handleGoogle} className="signup__button-google">
                                            <i className="uil uil-google button__icon-login"></i>
                                            <h3>Google</h3>
                                        </button>
                                    </div>
                                    <div className="signup__button_facebook">
                                        <button onClick={handleFacebook} className="signup__button-facebook">
                                            <i className="uil uil-facebook-f button__icon-login"></i>
                                            <h3>Facebook</h3>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="signup__forgot">
                    <span className="signup__account">{t("signup__form__have_account_already")} <Link className="signup__link" to="/login">{t("signup__form__login")}</Link></span>
                </div>
            </div>
        </section>
    )
}

export default SignUp


// <div class="or__container">
// <div class="line__separator"></div>
// <div class="or__label">{t("form__or")}</div>
// <div class="line__separator"></div>
// </div>
// <div className="signup__social">
// <div className="signup__box">
//     <button onClick={handleGoogle} className='signup-with-google-btn'>{t("button__sign__up__with__google")}</button>
// </div>
// </div>
// <div className="signup__forgot">
// <span className="signup__account">{t("signup__form__have_account_already")} <Link className="signup__link" to="/login">{t("signup__form__login")}</Link></span>
// </div>