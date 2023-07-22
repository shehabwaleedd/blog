import React from 'react'
import './NavComponents.css'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useUserAuth } from '../../../components/authContext/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'


const NavComponents = (Props) => {
    const { t } = useTranslation()
    const { user, logOut } = useUserAuth()
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            await logOut()
            navigate('/login')
        } catch (e) {
            console.log(e.message)
        }
    }

    const [expanded, setExpanded] = useState(false);

    const handleExpand = () => {
        setExpanded(!expanded);
    };


    useEffect(() => {
        if (Props.navOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [Props.navOpen]);



    return (

        <>
            {Props.isMobile ? (
                <AnimatePresence mode='wait'>
                    <motion.div className={`${Props.navOpen ? "nav__links-links-mobile open" : "nav__links-links-mobile"}`}
                        initial={{ opacity: 0, y: 100, transition: { delay: 0.3, staggerChildren: 3.5, duration: 0.5, ease: [0.42, 0, 0.58, 1] } }}
                        animate={{ opacity: 1, y: 0, transition: { delay: 0.5, staggerChildren: 3.5, duration: 0.5, ease: [0.42, 0, 0.58, 1] } }}
                        exit={{ opacity: 0, y: 500, transition: { delay: 0.3, velocity: 2, staggerChildren: 1.5, duration: 0.5, ease: [0.42, 0, 0.58, 1] } }}>
                        {user ? (
                            <motion.div className='nav__links__container-mobile'>
                                <div className={Props.navOpen ? "nav__home spin" : "nav__home"} style={{ opacity: Props.navOpen ? "1" : "1", padding: Props.navOpen ? "0.6rem" : "0" }}>
                                    <Link to="/faqs">
                                        <h1>FAQS</h1>
                                    </Link>
                                </div>
                                <div className={Props.navOpen ? "nav__home spin" : "nav__home"} style={{ opacity: Props.navOpen ? "1" : "1", padding: Props.navOpen ? "0.6rem" : "0" }}>
                                    <Link to="/about">
                                        <h1>{t("navbar__about")}</h1>
                                    </Link>
                                </div>
                                <div className={Props.navOpen ? "nav__home spin" : "nav__home"} style={{ opacity: Props.navOpen ? "1" : "1", padding: Props.navOpen ? "0.6rem" : "0" }}>
                                    <Link to="/account">
                                        <h1>{t("navbar__account")}</h1>
                                    </Link>
                                </div>
                                <div className={Props.navOpen ? "nav__home spin" : "nav__home"} style={{ opacity: Props.navOpen ? "1" : "1", padding: Props.navOpen ? "0.6rem" : "0" }}>
                                    <Link to="/createpost">
                                        <h1>{t("navbar__create_post")}</h1>
                                    </Link>
                                </div>
                                <div className={Props.navOpen ? "nav__home spin" : "nav__home"} style={{ opacity: Props.navOpen ? "1" : "1", padding: Props.navOpen ? "0.6rem" : "0" }}>
                                    <Link to="/partnerships">
                                        <h1>Partnerships</h1>
                                    </Link>
                                </div>
                                <div className={Props.navOpen ? "nav__home spin" : "nav__home"} style={{ opacity: Props.navOpen ? "1" : "1", padding: Props.navOpen ? "0.6rem" : "0" }}>
                                    <Link to="/latestupadtes">
                                        <h1>Latest Updates</h1>
                                    </Link>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div className='nav__links__container-mobile'>
                                <div className={Props.navOpen ? "nav__home spin" : "nav__home"} style={{ opacity: Props.navOpen ? "1" : "1", padding: Props.navOpen ? "0.6rem" : "0" }}>
                                    <Link to="/faqs">
                                        <h1>FAQS</h1>
                                    </Link>
                                </div>
                                <div className={Props.navOpen ? "nav__home spin" : "nav__home"} style={{ opacity: Props.navOpen ? "1" : "1", padding: Props.navOpen ? "0.6rem" : "0" }}>
                                    <Link to="/about">
                                        <h1>{t("navbar__about")}</h1>
                                    </Link>
                                </div>
                                <div className={Props.navOpen ? "nav__home spin" : "nav__home"} style={{ opacity: Props.navOpen ? "1" : "1", padding: Props.navOpen ? "0.6rem" : "0" }}>
                                    <Link to="/partnerships">
                                        <h1>Partnerships</h1>
                                    </Link>
                                </div>
                                <div className={Props.navOpen ? "nav__home spin" : "nav__home"} style={{ opacity: Props.navOpen ? "1" : "1", padding: Props.navOpen ? "0.6rem" : "0" }}>
                                    <Link to="/latestupadtes">
                                        <h1>Latest Updates</h1>
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </AnimatePresence>
            ) :
                Props.isTablet ? (
                    <AnimatePresence mode='wait'>
                        <motion.div className={`${Props.navOpen ? "nav__links-links-tablet open" : "nav__links-links-tablet"}`}
                            initial={{ opacity: 0, y: 100, transition: { delay: 0.3, staggerChildren: 3.5, duration: 0.5, ease: [0.42, 0, 0.58, 1] } }}
                            animate={{ opacity: 1, y: 0, transition: { delay: 0.5, staggerChildren: 3.5, duration: 0.5, ease: [0.42, 0, 0.58, 1] } }}
                            exit={{ opacity: 0, y: 500, transition: { delay: 0.3, velocity: 2, staggerChildren: 1.5, duration: 0.5, ease: [0.42, 0, 0.58, 1] } }}>
                            {user ? (
                                <motion.div className='nav__links__container-tablet'>
                                    <div className={Props.navOpen ? "nav__home spin" : "nav__home"} style={{ opacity: Props.navOpen ? "1" : "1", padding: Props.navOpen ? "0.6rem" : "0" }}>
                                        <Link to="/faqs">
                                            <h1>FAQS</h1>
                                        </Link>
                                    </div>
                                    <div className={Props.navOpen ? "nav__home spin" : "nav__home"} style={{ opacity: Props.navOpen ? "1" : "1", padding: Props.navOpen ? "0.6rem" : "0" }}>
                                        <Link to="/about">
                                            <h1>{t("navbar__about")}</h1>
                                        </Link>
                                    </div>
                                    <div className={Props.navOpen ? "nav__home spin" : "nav__home"} style={{ opacity: Props.navOpen ? "1" : "1", padding: Props.navOpen ? "0.6rem" : "0" }}>
                                        <Link to="/account">
                                            <h1>{t("navbar__account")}</h1>
                                        </Link>
                                    </div>
                                    <div className={Props.navOpen ? "nav__home spin" : "nav__home"} style={{ opacity: Props.navOpen ? "1" : "1", padding: Props.navOpen ? "0.6rem" : "0" }}>
                                        <Link to="/createpost">
                                            <h1>{t("navbar__create_post")}</h1>
                                        </Link>
                                    </div>
                                    <div className={Props.navOpen ? "nav__home spin" : "nav__home"} style={{ opacity: Props.navOpen ? "1" : "1", padding: Props.navOpen ? "0.6rem" : "0" }}>
                                        <Link to="/partnerships">
                                            <h1>Partnerships</h1>
                                        </Link>
                                    </div>
                                    <div className={Props.navOpen ? "nav__home spin" : "nav__home"} style={{ opacity: Props.navOpen ? "1" : "1", padding: Props.navOpen ? "0.6rem" : "0" }}>
                                        <Link to="/latestupadtes">
                                            <h1>Latest Updates</h1>
                                        </Link>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div className='nav__links__container-mobile'>
                                    <div className={Props.navOpen ? "nav__home spin" : "nav__home"} style={{ opacity: Props.navOpen ? "1" : "1", padding: Props.navOpen ? "0.6rem" : "0" }}>
                                        <Link to="/faqs">
                                            <h1>FAQS</h1>
                                        </Link>
                                    </div>
                                    <div className={Props.navOpen ? "nav__home spin" : "nav__home"} style={{ opacity: Props.navOpen ? "1" : "1", padding: Props.navOpen ? "0.6rem" : "0" }}>
                                        <Link to="/about">
                                            <h1>{t("navbar__about")}</h1>
                                        </Link>
                                    </div>
                                    <div className={Props.navOpen ? "nav__home spin" : "nav__home"} style={{ opacity: Props.navOpen ? "1" : "1", padding: Props.navOpen ? "0.6rem" : "0" }}>
                                        <Link to="/latestupadtes">
                                            <h1>Latest Updates</h1>
                                        </Link>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                ) : (
                    <AnimatePresence mode='wait'>
                        <motion.div className={`${Props.navOpen ? "nav__links-links open" : "nav__links-links"}`}
                            initial={{ opacity: 0, y: 100, transition: { delay: 0.3, staggerChildren: 3.5, duration: 0.5, ease: [0.42, 0, 0.58, 1] } }}
                            animate={{ opacity: 1, y: 0, transition: { delay: 0.5, staggerChildren: 3.5, duration: 0.5, ease: [0.42, 0, 0.58, 1] } }}
                            exit={{ opacity: 0, y: 500, transition: { delay: 0.3, velocity: 2, staggerChildren: 1.5, duration: 0.5, ease: [0.42, 0, 0.58, 1] } }}>
                            {user ? (
                                <motion.div className='nav__links__container'>
                                    <div className={Props.navOpen ? "nav__home spin" : "nav__home"} style={{ opacity: Props.navOpen ? "1" : "1", padding: Props.navOpen ? "0.6rem" : "0" }}>
                                        <Link to="/faqs" className={Props.navOpen ? "nav__text-spinned" : "nav__text"}
                                            style={{
                                                opacity: Props.navOpen ? "1" : "0",
                                                transitionDuration: Props.navOpen ? "0.5s" : "0",
                                            }}
                                        >
                                            <h1>FAQS</h1>
                                        </Link>
                                    </div>
                                    <div className={Props.navOpen ? "nav__home spin" : "nav__home"} style={{ opacity: Props.navOpen ? "1" : "1", padding: Props.navOpen ? "0.6rem" : "0" }}>
                                        <Link to="/contact" className={Props.navOpen ? "nav__text-spinned" : "nav__text"}
                                            style={{
                                                opacity: Props.navOpen ? "1" : "0",
                                                transitionDuration: Props.navOpen ? "0.5s" : "0",
                                            }}
                                        >
                                            <h1>{t("navbar__contact")}</h1>
                                        </Link>
                                    </div>
                                    <div className={Props.navOpen ? "nav__home spin" : "nav__home"} style={{ opacity: Props.navOpen ? "1" : "1", padding: Props.navOpen ? "0.6rem" : "0" }}>
                                        <Link to="/faqs" className={Props.navOpen ? "nav__text-spinned" : "nav__text"}
                                            style={{
                                                opacity: Props.navOpen ? "1" : "0",
                                                transitionDuration: Props.navOpen ? "0.5s" : "0",
                                            }}
                                        >
                                            <h1>Latest Updates</h1>
                                        </Link>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div className='nav__links__container'
                                >
                                    <div className={Props.navOpen ? "nav__home spin" : "nav__home"} style={{ opacity: Props.navOpen ? "1" : "1", padding: Props.navOpen ? "0.6rem" : "0" }}>
                                        <Link to="/faqs">
                                            <h1>FAQS</h1>
                                        </Link>
                                    </div>
                                    <div className={Props.navOpen ? "nav__home spin" : "nav__home"} style={{ opacity: Props.navOpen ? "1" : "1", padding: Props.navOpen ? "0.6rem" : "0" }}>
                                        <Link to="/about">
                                            <h1>{t("navbar__about")}</h1>
                                        </Link>
                                    </div>
                                    <div className={Props.navOpen ? "nav__home spin" : "nav__home"} style={{ opacity: Props.navOpen ? "1" : "1", padding: Props.navOpen ? "0.6rem" : "0" }}>
                                        <Link to="/latestupadtes">
                                            <h1>Latest Updates</h1>
                                        </Link>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                )}
        </>
    )
}

export default NavComponents