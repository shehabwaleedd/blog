import React from 'react'
import './PasswordReset.css'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useUserAuth } from '../authContext/AuthContext'
import { useTranslation } from 'react-i18next'


const PasswordReset = (Props) => {

  const [email, setEmail] = useState('')
  const [error, setError] = React.useState('')
  const { passwordReset } = useUserAuth()

  let navigate = useNavigate()
  const { t } = useTranslation()


  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await passwordReset(email);
      navigate('/login')
    } catch (e) {
      setError(e.message);
      console.log(error);
    }
    navigate('/login')
    alert("A Reset Link Has Been Sent To Your Email")

  }




  return (
    <section className="forgot section" id='skills'>
      <div className="forgot__container container grid">
        <div className="forgot__content">
          <div className="forgot__content_left">
            <div className="forgot__content_text">
              <h1 className="forgot__title">Don't Worry</h1>
              <p className='forgot__subtitle'>We are here to help you to recover your password. Enter the email address you used when you joined us and we'll send you the instructions to reset your password.</p>
            </div>
            <div className="forgot__back">
              <Link to="/login" className="forgot__content_link">
                <i class='bx bx-chevron-left' ></i>
                <p>Back</p>
              </Link>
            </div>
          </div>
          <div className="forgot__content_right">
            <form className="forgot__form" onSubmit={handlePasswordReset}>
              <div className="forgot__input">
                <input type="email" id="email" className="forgot__input-field" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="forgot__button">
                <button type="submit" className="forgot__button-sign">
                  <i className="uil uil-arrow-left button__icon-forgot"></i>
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PasswordReset