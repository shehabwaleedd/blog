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
            console.log("logged out successfully")
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
        <div className={`${Props.navOpen ? "nav__links-links open" : "nav__links-links"}`}>
            <AnimatePresence mode='wait'>
                {user && (
                    <div className='nav__links__container'>
                        <div className={Props.navOpen ? "nav__home spin" : "nav__home"} style={{ opacity: Props.navOpen ? "1" : "1", padding: Props.navOpen ? "0.6rem" : "0" }}>
                            <Link to="/faqs">
                                <h1>FAQS</h1>
                            </Link>
                        </div>
                        <div className={Props.navOpen ? "nav__home spin" : "nav__home"} style={{ opacity: Props.navOpen ? "1" : "1", padding: Props.navOpen ? "0.6rem" : "0" }}>
                            <Link to="/faqs">
                                <h1>{t("navbar__contact")}</h1>
                            </Link>
                        </div>
                        <div className={Props.navOpen ? "nav__home spin" : "nav__home"} style={{ opacity: Props.navOpen ? "1" : "1", padding: Props.navOpen ? "0.6rem" : "0" }}>
                            <Link to="/faqs">
                                <h1>Partnerships</h1>
                            </Link>
                        </div>
                        <div className={Props.navOpen ? "nav__home spin" : "nav__home"} style={{ opacity: Props.navOpen ? "1" : "1", padding: Props.navOpen ? "0.6rem" : "0" }}>
                            <Link to="/faqs">
                                <h1>Latest Updates</h1>
                            </Link>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default NavComponents