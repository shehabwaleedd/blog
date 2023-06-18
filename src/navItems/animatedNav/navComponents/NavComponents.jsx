import React from 'react'
import './NavComponents.css'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useUserAuth } from '../../../components/authContext/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
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
    return (
        <div className="nav__links-links">
            {user ? <>
                <Link className={Props.navOpen ? "nav__home spin" : "nav__home"} to="/" style={{ opacity: Props.navOpen ? "1" : "1", padding: Props.navOpen ? "0.6rem" : "0" }}>
                    {t("navbar__home")}
                </Link>
                <div className="loginss">
                        <button className={Props.navOpen ? "nav__home spin" : "nav__home"} style={{ opacity: Props.navOpen ? "1" : "1", padding: Props.navOpen ? "0.6rem" : "0" }} onClick={handleExpand}>    
                            Account
                        </button>
                </div>
                <AnimatePresence>
                            {expanded && (
                                <motion.div
                                    className="account__dropdown show"
                                    initial={{ opacity: 0, y: -20, width: "20vw", height: "30vh", x: -240 }}
                                    animate={{ opacity: 1, y: 20, width: "20vw", height: "30vh", x: -240 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Link to="/account" className="account__dropdown-link">
                                        <span className="login__text">- My Account</span>
                                    </Link>
                                    <Link to="/account/orders" className="account__dropdown-link">
                                        <span className="login__text">- My Orders</span>
                                    </Link>
                                    <Link to="/account/wishlist" className="account__dropdown-link">
                                        <span className="login__text">- My Wishlist</span>
                                    </Link>
                                    <Link to="/account/settings" className="account__dropdown-link">
                                        <span className="login__text">- Settings</span>
                                    </Link>
                                    <button className="account__dropdown-link" onClick={handleLogout}>
                                        <span className="login__text">- Logout</span>
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                <button className={Props.navOpen ? "nav__home spin" : "nav__home"} onClick={handleLogout} >{t("navbar__logout")}</button>
            </>
                :
                <>
                    <Link className={Props.navOpen ? "nav__home spin" : "nav__home"} to="/login">{t("navbar__login")}</Link>
                </>
            }

        </div>
    )
}

export default NavComponents