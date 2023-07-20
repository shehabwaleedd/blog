import React from 'react'
import { motion } from 'framer-motion'
import { useState } from 'react'

const PasswordOpen = ({ handlePasswordReset, setEmail, email, isTablet, isMobile }) => {
    return (
        <>
            {isMobile ? (
                <>
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
                                        <i className="uil uil-arrow-left button__icon-forgot"></i>
                                        Reset Password
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
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
                                        <i className="uil uil-arrow-left button__icon-forgot"></i>
                                        Reset Password
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </>

            ) : (
                <>
                    <div className="right__header">
                        <h1>Change Password</h1>
                        <p>In Case You wanted to change your password or just forgot it, you can simply enter your Email Address and follow instructions to reset/change your password..</p>
                    </div>
                    <div className="right__bottom">
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
                </>
            )}
        </>
    )
}

export default PasswordOpen