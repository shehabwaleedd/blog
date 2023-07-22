import React from 'react'
import { Link } from 'react-router-dom'
import { t } from 'i18next';


const TabletCreatePostSquare = ({
    createOpen,
    handleCreateOpen,
    user,
}) => {
    return (
        <Link to="/createpost" className={`${createOpen ? "square5Open-mobile" : "square5-mobile"}`} onClick={handleCreateOpen}>
            <div>
                <div className="create__container-mobile">
                    {user ? <h1 className='createpost' style={{ color: createOpen ? "var(--container-color)" : "var(--title-color)", zIndex: "99999", position: "relative" }}>{t("navbar__create_post")}</h1> : <h1 style={{ color: createOpen ? "var(--container-color)" : "var(--title-color)" }}>{t("navbar__register")}</h1>}
                </div>
            </div>
        </Link>
    )
}

export default TabletCreatePostSquare