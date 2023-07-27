import React from 'react'
import './Footer.css'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const Footer = () => {
    const { t } = useTranslation()
    return (
        <footer className='footer'>
            <div className="footer__container">
                <div className="footer__logo">
                    <h1>lumos</h1>
                </div>
                <div className="footer__credits">
                    <span>© 2023 lumos. {t("footer__credits")}</span>
                    <Link to="https://shehabwaleedd.vercel.app/" target='__blank'>
                        <p>{t("footer__created_designed_by")} Shehab Waleed</p>
                    </Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer