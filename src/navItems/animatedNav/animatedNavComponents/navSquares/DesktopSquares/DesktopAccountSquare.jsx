import React from 'react'
import { Link } from 'react-router-dom'
import { t } from 'i18next';

const DesktopAccountSquare = ({
    accountOpen,
    handleAccountOpen,
    user,
    language,

}) => {
    return (
        <Link to={`${user ? "/account" : "/login"}`} className={`${accountOpen ? "square3Open" : "square3"}`} onClick={handleAccountOpen}>
            <div >
                <div className="account__container">
                    <div className="squared3">
                        {user ? (
                            <h1 style={{ color: accountOpen ? "var(--container-color)" : "var(--title-color)", zIndex: "99999", position: "relative", letterSpacing: language === "ar" ? "0rem" : "0.2rem" }}>{t("navbar__account")}</h1>
                        ) : (
                            <h1 style={{ color: accountOpen ? "var(--container-color)" : "var(--title-color)", zIndex: "99999", position: "relative", letterSpacing: language === "ar" ? "0rem" : "0.2rem" }}>{t("navbar__login")}</h1>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default DesktopAccountSquare