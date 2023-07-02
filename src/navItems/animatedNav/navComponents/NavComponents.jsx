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
        <div className="nav__links-links">
            {user && (
                <div className='nav__links__container'>
                    <Link className={Props.navOpen ? "nav__home spin" : "nav__home"} to="/" style={{ opacity: Props.navOpen ? "1" : "1", padding: Props.navOpen ? "0.6rem" : "0" }}>
                        <h1>{t("navbar__home")}</h1>
                    </Link>
                    <Link className={Props.navOpen ? "nav__home spin" : "nav__home"} to="/about" style={{ opacity: Props.navOpen ? "1" : "1", padding: Props.navOpen ? "0.6rem" : "0" }}>
                        <h1>{t("navbar__about")}</h1>
                    </Link>
                    <Link className={Props.navOpen ? "nav__home spin" : "nav__home"} to="/contact" style={{ opacity: Props.navOpen ? "1" : "1", padding: Props.navOpen ? "0.6rem" : "0" }}>
                        <h1> {t("navbar__contact")}</h1>

                    </Link>
                </div>
            )}
        </div>
    )
}

export default NavComponents