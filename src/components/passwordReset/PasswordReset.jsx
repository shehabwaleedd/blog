import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUserAuth } from '../authContext/AuthContext';
import { useTranslation } from 'react-i18next';
import { BsArrowLeft } from 'react-icons/bs';
import './PasswordReset.css'
const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { passwordReset } = useUserAuth();

  let navigate = useNavigate();
  const { t } = useTranslation();

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await passwordReset(email);
      navigate('/login');
      alert("A Reset Link Has Been Sent To Your Email");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <section className="forgot section" id='skills'>
      <div className="forgot__container container grid">
        <div className="forgot__content">
          <div className="forgot__content_left">
            <div className="forgot__content_text">
              <h1 className="forgot__title">Password Reset</h1>
              <p className='forgot__subtitle'>We are here to help you recover your password. Enter the email address you used when you joined us, and we'll send you the instructions to reset your password.</p>
            </div>
            <Link to="/login" className="forgot__back">
              <BsArrowLeft style={{
                fontSize: "1.5rem",
                marginRight: "0.5rem",
                marginTop: "1.2rem",
              }} />
              <h3>Back To Login Page</h3>
            </Link>
          </div>
          <div className="forgot__content_right">
            <form className="forgot__form" onSubmit={handlePasswordReset}>
              <div className="forgot__input">
                <input type="email" id="email" className="forgot__input-field" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="forgot__button">
                <button type="submit" className="forgot__button-sign">
                  <BsArrowLeft style={{
                    fontSize: "1.5rem",
                    marginRight: "0.5rem"
                  }} />
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PasswordReset;
