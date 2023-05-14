import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useUserAuth } from '../authContext/AuthContext';
import { Link } from 'react-router-dom'
import './Login.css'


function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn, signInWithGoogle } = useUserAuth(); // Use useAuth instead of useUserAuth
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await signIn(email, password);
      navigate('/');
    } catch (e) {
      setError(e.message);
      console.log(error);
    }
  };

  const handleGoogle = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await signInWithGoogle(email, password);
      navigate('/');
    } catch (e) {
      setError(e.message);
      console.log(error);
    }
  };





  return (
    <section className="login " id='skills'>
      <h2 className='section__title'>{t("login__form__title")}</h2>
      <h3 className='section__subtitle-login'>Ignite Your Passion for Writing: Explore a Diverse Collection of Blogs, Uncover Inspiration, and Share Your Voice</h3>
      <div className="login__container ">
        <div className="login__container-left">
          <form className="login__form" onSubmit={handleSignIn}>
            <div className="form__container">
              <div className="form__container_form-input">
                <div className="login__input">
                  <input type="email" id="email" className="login__input-field" placeholder={t("login__form__insert_email")} value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="login__input">
                  <input type="password" id="password" className="login__input-field left-aligned-input" placeholder={t("login__form__password")} value={password} onChange={(e) => setPassword(e.target.value)} style={{ textAlign: 'left' }} />
                </div>
                <div className="login__button">
                  <button type="submit" className="login__button-sign">
                    <h3>{t("login__form__button")}</h3>
                  </button>
                  <i className="uil uil-arrow-right button__icon-login"></i>
                </div>
              </div>
              <div className="form__container_form-center">
                <span>/</span>
              </div>
            </div>
          </form>
        </div>
        <div className="login__container-right">
          <div className="form__container_form-buttons">
            <div className="signup__social-button facebook__button">
              <i class='bx bxl-facebook' ></i>
              <button onClick={handleGoogle} className=""><p>Sign In With Facebook</p></button>
            </div>
            <div className="signup__social-button google__button">
              <i class='bx bxl-google' ></i>
              <button onClick={handleGoogle}><p>{t("button__sign__in__with__google")}</p></button>
            </div>
            <div className="login__forgot">
              <p className="login__account">{t("signup__form__dont_have_account")} <Link className="signup__link" to="/signup">{t("signup__form__title")}</Link></p>
            </div>
          </div>
        </div>
      </div>
      <span className='login__forgot'>{t("login__form__forgot_password")}? <Link className='clickhere__button' to="/passwordreset">{t("login__form__click_here")}</Link></span>
    </section>

  )
}

export default Login
