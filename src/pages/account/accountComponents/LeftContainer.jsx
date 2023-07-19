import React from 'react'
import { t } from 'i18next';

const LeftContainer = ({user, handleImageChange, handlePasswordOpen, handlePersonalOpen, handlePostsOpen}) => {
    return (
        <div className="left__container">
            <div className="left__content">
                <div className="left__header">
                    <label htmlFor="profile-picture-input">
                        <img src={user.photoURL || 'fallback_image_url'} alt={user.displayName} />
                        <div className="change-picture-btn">
                            <span>Change Profile's Picture</span>
                        </div>
                    </label>
                    <input
                        id="profile-picture-input"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                    />
                    <div className="left__name_email">
                        <h1>{user.displayName}</h1>
                        <h2>{user.email}</h2>
                    </div>
                </div>
                <div className="left__bottom">
                    <div className="left__bottom_content">
                        <ul>
                            <li onClick={handlePersonalOpen}>
                                <h1>{t("account__personal_info")}</h1>
                            </li>
                            <li onClick={handlePasswordOpen}>
                                <h1>{t("account__change_password")}</h1>
                            </li>
                            <li onClick={handlePostsOpen}>
                                <h1>{t("account__my_posts")}</h1>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftContainer