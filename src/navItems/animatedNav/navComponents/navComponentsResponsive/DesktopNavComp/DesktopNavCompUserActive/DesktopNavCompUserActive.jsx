import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { t } from 'i18next';

const DesktopNavCompUserActive = ({
    navOpen,
    setNavOpen,
}) => {
    return (
        <motion.div className='nav__links__container'>
            <div className={navOpen ? "nav__home spin" : "nav__home"} style={{ opacity: navOpen ? "1" : "1", padding: navOpen ? "0.6rem" : "0" }}>
                <Link to="/faqs" className={navOpen ? "nav__text-spinned" : "nav__text"}
                    style={{
                        opacity: navOpen ? "1" : "0",
                        transitionDuration: navOpen ? "0.5s" : "0",
                    }}
                >
                    <h1>FAQS</h1>
                </Link>
            </div>
            <div className={navOpen ? "nav__home spin" : "nav__home"} style={{ opacity: navOpen ? "1" : "1", padding: navOpen ? "0.6rem" : "0" }}>
                <Link to="/contact" className={navOpen ? "nav__text-spinned" : "nav__text"}
                    style={{
                        opacity: navOpen ? "1" : "0",
                        transitionDuration: navOpen ? "0.5s" : "0",
                    }}
                >
                    <h1>{t("navbar__contact")}</h1>
                </Link>
            </div>
            <div className={navOpen ? "nav__home spin" : "nav__home"} style={{ opacity: navOpen ? "1" : "1", padding: navOpen ? "0.6rem" : "0" }}>
                <Link to="/faqs" className={navOpen ? "nav__text-spinned" : "nav__text"}
                    style={{
                        opacity: navOpen ? "1" : "0",
                        transitionDuration: navOpen ? "0.5s" : "0",
                    }}
                >
                    <h1>Latest Updates</h1>
                </Link>
            </div>
        </motion.div>
    )
}

export default DesktopNavCompUserActive