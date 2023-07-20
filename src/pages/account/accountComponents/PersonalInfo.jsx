import React from 'react'
import { motion } from 'framer-motion'
import { t } from 'i18next';

const PersonalInfo = ({ user, isMobile, isTablet }) => {
    return (
        <>
            {isMobile ? (
                <div className="right__content">
                <div className="right__header">
                    <h1>{t("account__personal_info")}</h1>
                    <p>{t("account__subtitle")}</p>
                </div>
                <div className="right__bottom-mobile">
                    <div className="right__bottom_cards-mobile">
                        <div className="right__bottom_card-mobile">
                            <div className="right__bottom_card_header">
                                <div className="right__bottom_card_name_icon-mobile">
                                    <h1>{t("account__name")}</h1>
                                    <i className='bx bx-user'></i>
                                </div>
                                <div className="right__bottom_card_text">
                                    <h1>{user.displayName}</h1>
                                </div>
                            </div>
                        </div>
                        <div className="right__bottom_card-mobile">
                            <div className="right__bottom_card_header-mobile">
                                <div className="right__bottom_card_name_icon">
                                    <h1>{t("account__date_of_birth")}</h1>
                                    <i className='bx bx-calendar-alt'></i>
                                </div>
                                <div className="right__bottom_card_text">
                                    <h1>05 Februray 1999</h1>
                                </div>
                            </div>
                        </div>
                        <div className="right__bottom_card-mobile">
                            <div className="right__bottom_card_header-mobile">
                                <div className="right__bottom_card_name_icon-mobile">
                                    <h1>{t("account__country/region")}</h1>
                                    <i className='bx bx-map'></i>
                                </div>
                                <div className="right__bottom_card_text">
                                    <h1>Egypt, Cairo.</h1>
                                </div>
                            </div>
                        </div>
                        <div className="right__bottom_card-mobile">
                            <div className="right__bottom_card_header-mobile">
                                <div className="right__bottom_card_name_icon-mobile">
                                    <h1>{t("language")}</h1>
                                    <i className='bx bx-globe'></i>
                                </div>
                                <div className="right__bottom_card_text">
                                    <h1>English, EN</h1>
                                </div>
                            </div>
                        </div>
                        <div className="right__bottom_card-mobile">
                            <div className="right__bottom_card_header-mobile">
                                <div className="right__bottom_card_name_icon-mobile">
                                    <h1>{t("navbar__contact")}</h1>
                                    <i className='bx bx-chat'></i>
                                </div>
                                <div className="right__bottom_card_text">
                                    <h1>{user.email}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ) :  (
                <motion.div className="right__content"
                    initial={{ opacity: 0, }}
                    animate={{ opacity: 1, }}
                    exit={{ opacity: 0, }}
                    transition={{ delay: 0.3, staggerChildren: 3.5, duration: 0.5, ease: [0.42, 0, 0.58, 1] }}
                >
                    <div className="right__header">
                        <h1>{t("account__personal_info")}</h1>
                        <p>{t("account__subtitle")}</p>
                    </div>
                    <div className="right__bottom">
                        <div className="right__bottom_cards">
                            <div className="right__bottom_card">
                                <div className="right__bottom_card_header">
                                    <div className="right__bottom_card_name_icon">
                                        <h1>{t("account__name")}</h1>
                                        <i className='bx bx-user'></i>
                                    </div>
                                    <div className="right__bottom_card_text">
                                        <h1>{user.displayName}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="right__bottom_card">
                                <div className="right__bottom_card_header">
                                    <div className="right__bottom_card_name_icon">
                                        <h1>{t("account__date_of_birth")}</h1>
                                        <i className='bx bx-calendar-alt'></i>
                                    </div>
                                    <div className="right__bottom_card_text">
                                        <h1>05 Februray 1999</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="right__bottom_card">
                                <div className="right__bottom_card_header">
                                    <div className="right__bottom_card_name_icon">
                                        <h1>{t("account__country/region")}</h1>
                                        <i className='bx bx-map'></i>
                                    </div>
                                    <div className="right__bottom_card_text">
                                        <h1>Egypt, Cairo.</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="right__bottom_card">
                                <div className="right__bottom_card_header">
                                    <div className="right__bottom_card_name_icon">
                                        <h1>{t("language")}</h1>
                                        <i className='bx bx-globe'></i>
                                    </div>
                                    <div className="right__bottom_card_text">
                                        <h1>English, EN</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="right__bottom_card">
                                <div className="right__bottom_card_header">
                                    <div className="right__bottom_card_name_icon">
                                        <h1>{t("navbar__contact")}</h1>
                                        <i className='bx bx-chat'></i>
                                    </div>
                                    <div className="right__bottom_card_text">
                                        <h1>{user.email}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </>
    )
}

export default PersonalInfo