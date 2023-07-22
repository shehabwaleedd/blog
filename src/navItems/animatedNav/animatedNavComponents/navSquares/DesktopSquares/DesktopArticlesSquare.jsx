import React from 'react'
import { Link } from 'react-router-dom'
import { t } from 'i18next';


const DesktopArticlesSquare = ({
    articlesOpen,
    handleArticlesOpen,
    postCount,
    language,
}) => {
    return (
        <Link to="/" className={`${articlesOpen ? "square1Open" : "square1"}`} onClick={handleArticlesOpen}>
            <div>
                <div className="articles__container">
                    <div className="squared2">
                        <h1 style={{ color: articlesOpen ? "var(--container-color)" : "var(--title-color)", zIndex: "99999", position: "relative", letterSpacing: language === "ar" ? "0rem" : "0.2rem" }}>{t("navbar__articles")}</h1>
                        <div className="articles__count">
                            <h1 style={{ color: articlesOpen ? "var(--container-color)" : "var(--title-color)", zIndex: "99999", position: "relative" }}>({postCount})</h1>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default DesktopArticlesSquare