import React from 'react'
import { Link } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'

const PasswordOpen = ({ handlePasswordReset, setEmail, email, isTablet, isMobile }) => {
    return (
        <>
            {isMobile ? (
                <div className='right__content'>
                    <div className="right__header">
                        <h1>Change Password</h1>
                        <p>In Case You wanted to change your password or just forgot it, you can simply enter your Email Address and follow instructions to reset/change your password..</p>
                    </div>
                    <div className="right__bottom-mobile">
                        <div className="forgot__content_right">
                            <form className="forgot__form" onSubmit={handlePasswordReset}>
                                <div className="forgot__input">
                                    <input type="email" id="email" className="forgot__input-field" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="forgot__button">
                                    <button type="submit" className="forgot__button-sign">
                                        <BsArrowLeft style={{
                                            fontSize: "2rem",
                                            marginTop: "0.5rem",
                                            marginRight: "0.5rem",
                                        }} />
                                        Reset Password
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            ) : isTablet ? (
                <>
                    <div className="right__header-tablet">
                        <h1>Change Password</h1>
                        <p>In Case You wanted to change your password or just forgot it, you can simply enter your Email Address and follow instructions to reset/change your password..</p>
                    </div>
                    <div className="right__bottom-mobile">
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
                </>

            ) : (
                <section className="forgot section" id='skills'>
                    <div className="forgot__container container grid">
                        <div className="forgot__content">
                            <div className="forgot__content_left">
                                <div className="forgot__content_text">
                                    <h1 className="forgot__title">Don't Worry</h1>
                                    <p className='forgot__subtitle'>We are here to help you to recover your password. Enter the email address you used when you joined us and we'll send you the instructions to reset your password.</p>
                                </div>
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
            )}
        </>
    )
}

export default PasswordOpen