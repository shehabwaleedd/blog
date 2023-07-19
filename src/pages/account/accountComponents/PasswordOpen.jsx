import React from 'react'
import { motion } from 'framer-motion'
import { useState } from 'react'

const PasswordOpen = ({handlePasswordReset, setEmail, email}) => {
    return (
        <motion.div className="right__content"
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, }}
            exit={{ opacity: 0, }}
            transition={{ delay: 0.3, staggerChildren: 3.5, duration: 0.5, ease: [0.42, 0, 0.58, 1] }}
        >
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
        </motion.div>
    )
}

export default PasswordOpen