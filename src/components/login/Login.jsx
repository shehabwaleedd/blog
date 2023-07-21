import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useUserAuth } from '../authContext/AuthContext';
import { Link } from 'react-router-dom'
import './Login.css'
import { motion } from 'framer-motion'


function Login({ isMobile, isTablet, language }) {

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
    <>
      {isMobile ? (
        <motion.section className="login-mobile " id='skills' initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: "easeOut" }} exit={{ opacity: 0 }}>
          <h2 className='section__title_mobile' style={{
            fontFamily: language === "ar" ? "El Messiri" : "Satoshi-Bold",
            letterSpacing: language === "ar" ? "0rem" : "0.2rem",
          }

          }>{t("navbar__login")}</h2>
          <div className="login__container-mobile container">
            <div className="login__container-left">
              <form className="login__form" onSubmit={handleSignIn}>
                <div className="form__container">
                  <div className="form__container_form-input-mobile">
                    <div className="login__input">
                      <input type="email" id="email" className="login__input-field" placeholder={t("login__form__insert_email")} value={email} onChange={(e) => setEmail(e.target.value)} autoComplete='email' />
                    </div>
                    <div className="login__input">
                      <input type="password" id="password" className="login__input-field left-aligned-input" placeholder={t("login__form__password")} value={password} onChange={(e) => setPassword(e.target.value)} style={{ textAlign: 'left' }} autoComplete="current-password" />
                    </div>
                    <div className="login__button-mobile">
                      <button type="submit" className="login__button-sign-mobile">
                        <h3>{t("login__form__button")}</h3>
                        <i className="uil uil-arrow-right button__icon-login"></i>
                      </button>
                      <div className="form__container_form-buttons-mobile">
                        <div className="signup__social-button facebook__button">
                          <i className='bx bxl-facebook' ></i>
                          <button onClick={handleGoogle} className=""><p>facebook</p></button>
                        </div>
                        <div className="signup__social-button google__button">
                          <i className='bx bxl-google' ></i>
                          <button onClick={handleGoogle}><p>google</p></button>
                        </div>
                      </div>
                    </div>
                    <div className="login__forgot">
                      <p className="login__account"> {t("signup__form__dont_have_account")} <Link className="signup__link" to="/signup"> {t("signup__form__title")}</Link></p>
                      <span className='login__forgot'>{t("login__form__forgot_password")}? <Link className='clickhere__button' to="/passwordreset">{t("login__form__click_here")}</Link></span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </motion.section>
      ) : isTablet ? (
        <motion.section className="login-tablet " id='skills' initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: "easeOut" }} exit={{ opacity: 0 }}>
          <h2 className='section__title_mobile' style={{
            fontFamily: language === "ar" ? "El Messiri" : "Satoshi-Bold",
            letterSpacing: language === "ar" ? "0rem" : "0.2rem",
          }}>{t("navbar__login")}</h2>
          <div className="login__container-tablet container">
            <div className="login__container-left">
              <form className="login__form" onSubmit={handleSignIn}>
                <div className="form__container">
                  <div className="form__container_form-input-tablet">
                    <div className="login__input">
                      <input type="email" id="email" className="login__input-field" placeholder={t("login__form__insert_email")} value={email} onChange={(e) => setEmail(e.target.value)} autoComplete='email' />
                    </div>
                    <div className="login__input">
                      <input type="password" id="password" className="login__input-field left-aligned-input" placeholder={t("login__form__password")} value={password} onChange={(e) => setPassword(e.target.value)} style={{ textAlign: 'left' }} autoComplete="current-password" />
                    </div>
                    <div className="login__button-mobile">
                      <button type="submit" className="login__button-sign-tablet">
                        <h3>{t("login__form__button")}</h3>
                        <i className="uil uil-arrow-right button__icon-login"></i>
                      </button>
                      <div className="form__container_form-buttons-tablet">
                        <div className="signup__social-button facebook__button">
                          <i className='bx bxl-facebook' ></i>
                          <button onClick={handleGoogle} className=""><p>facebook</p></button>
                        </div>
                        <div className="signup__social-button google__button">
                          <i className='bx bxl-google' ></i>
                          <button onClick={handleGoogle}><p>google</p></button>
                        </div>
                      </div>
                    </div>
                    <div className="login__forgot">
                      <p className="login__account"> {t("signup__form__dont_have_account")} <Link className="signup__link" to="/signup"> {t("signup__form__title")}</Link></p>
                      <span className='login__forgot'>{t("login__form__forgot_password")}? <Link className='clickhere__button' to="/passwordreset">{t("login__form__click_here")}</Link></span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </motion.section>

      ) : (
        <motion.section className="login " id='skills' initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: "easeOut" }} exit={{ opacity: 0 }}>
          <h2 className='section__title' style={{
            fontFamily: language === "ar" ? "El Messiri" : "Satoshi-Bold",
            letterSpacing: language === "ar" ? "0rem" : "0.2rem",
          }}>{t("navbar__login")}</h2>
          <div className="login__container container">
            <div className="login__container-left">
              <form className="login__form" onSubmit={handleSignIn}>
                <div className="form__container">
                  <div className="form__container_form-input">
                    <div className="login__input">
                      <input type="email" id="email" className="login__input-field" placeholder={t("login__form__insert_email")} value={email} onChange={(e) => setEmail(e.target.value)} autoComplete='email' />
                    </div>
                    <div className="login__input">
                      <input type="password" id="password" className="login__input-field left-aligned-input" placeholder={t("login__form__password")} value={password} onChange={(e) => setPassword(e.target.value)} style={{ textAlign: 'left' }} autoComplete="current-password" />
                    </div>
                    <div className="login__button">
                      <button type="submit" className="login__button-sign">
                        <h3>{t("login__form__button")}</h3>
                        <i className="uil uil-arrow-right button__icon-login"></i>
                      </button>
                      <div className="form__container_form-buttons">
                        <div className="signup__social-button facebook__button">
                          <i className='bx bxl-facebook' ></i>
                          <button onClick={handleGoogle} className=""><p>facebook</p></button>
                        </div>
                        <div className="signup__social-button google__button">
                          <i className='bx bxl-google' ></i>
                          <button onClick={handleGoogle}><p>google</p></button>
                        </div>
                      </div>
                    </div>
                    <div className="login__forgot">
                      <p className="login__account"> {t("signup__form__dont_have_account")} <Link className="signup__link" to="/signup"> {t("signup__form__title")}</Link></p>
                      <span className='login__forgot'>{t("login__form__forgot_password")}? <Link className='clickhere__button' to="/passwordreset">{t("login__form__click_here")}</Link></span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </motion.section>
      )}
    </>

  )
}

export default Login
