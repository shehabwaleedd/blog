import React from 'react'
import { Link } from 'react-router-dom'
import { t } from 'i18next';

const DesktopCreatePostSquare = ({
    createOpen,
    handleCreateOpen,
    user,
    language,
}) => {
    return (
        <Link to="/createpost" className={`${createOpen ? "square5Open" : "square5"}`} onClick={handleCreateOpen}>
            <div>
                <div className="create__container">
                    {user ?
                        <h1 className='createpost'
                            style={{
                                color: createOpen ? "var(--container-color)" : "var(--title-color)",
                                zIndex: "99999",
                                position: "relative",
                                letterSpacing: language === "ar" ? "0rem" : "0.2rem"
                            }}>
                            {t("navbar__create_post")}
                        </h1> : <h1
                            style={{
                                color: createOpen ? "var(--container-color)" : "var(--title-color)",
                                zIndex: "99999",
                                position: "relative",
                                letterSpacing: language === "ar" ? "0rem" : "0.2rem"
                            }}>{t("navbar__register")}</h1>}
                </div>
            </div>
        </Link>
    )
}

export default DesktopCreatePostSquare