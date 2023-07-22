import React from 'react'
import { Link } from 'react-router-dom'
import { t } from 'i18next';

const DesktopAboutSquare = ({
    aboutOpen,
    handleAboutOpen,
    language,
}) => {
    return (
        <Link to="/about" className={`${aboutOpen ? "square2Open" : "square2"}`} onClick={handleAboutOpen}>
            <div className="about__container">
                <div className="squared2">
                    <h1 style={{ color: aboutOpen ? "var(--container-color)" : "var(--title-color)", zIndex: "99999", position: "relative", top: "0", letterSpacing: language === "ar" ? "0rem" : "0.2rem" }}>{t("navbar__about")}</h1>
                </div>
            </div>
        </Link>
    )
}

export default DesktopAboutSquare