import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { t } from 'i18next';


const TabletNavCompUserActive = ({
    navOpen,
    setNavOpen,

}) => {
    return (
        <motion.div className='nav__links__container-tablet'>
            <div className={navOpen ? "nav__home spin" : "nav__home"} style={{ opacity: navOpen ? "1" : "1", padding: navOpen ? "0.6rem" : "0" }}>
                <Link to="/faqs">
                    <h1>FAQS</h1>
                </Link>
            </div>
            <div className={navOpen ? "nav__home spin" : "nav__home"} style={{ opacity: navOpen ? "1" : "1", padding: navOpen ? "0.6rem" : "0" }}>
                <Link to="/about">
                    <h1>{t("navbar__about")}</h1>
                </Link>
            </div>
            <div className={navOpen ? "nav__home spin" : "nav__home"} style={{ opacity: navOpen ? "1" : "1", padding: navOpen ? "0.6rem" : "0" }}>
                <Link to="/account">
                    <h1>{t("navbar__account")}</h1>
                </Link>
            </div>
            <div className={navOpen ? "nav__home spin" : "nav__home"} style={{ opacity: navOpen ? "1" : "1", padding: navOpen ? "0.6rem" : "0" }}>
                <Link to="/latestupadtes">
                    <h1>Latest Updates</h1>
                </Link>
            </div>
        </motion.div>
    )
}

export default TabletNavCompUserActive