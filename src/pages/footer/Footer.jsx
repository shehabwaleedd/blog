import React from 'react'
import './Footer.css'
import { t } from 'i18next'

const Footer = () => {
    return (
        <footer className='footer'>
            <div className="footer__container">
                <div className="footer__logo">
                    <h1>lumos</h1>
                </div>
                <div className="footer__credits">
                    <span>© 2023 lumos. {t("footer__credits")}</span>
                    <p>{t("footer__created_designed_by")} <a href="https://shehabwaleedd.vercel.app/" target='__blank'>Shehab Waleed</a></p>
                </div>
            </div>
        </footer>
    )
}

export default Footer