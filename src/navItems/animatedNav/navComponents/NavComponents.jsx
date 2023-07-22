import React from 'react'
import './NavComponents.css'
import { useUserAuth } from '../../../components/authContext/AuthContext'
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MobileNavCompUserActive from './navComponentsResponsive/MobileNavComp/MobileNavCompUserActive/MobileNavCompUserActive'
import MobileNavCompUserNotActive from './navComponentsResponsive/MobileNavComp/MobileNavCompUserNotActive/MobileNavCompUserNotActive'
import TabletNavCompUserActive from './navComponentsResponsive/TabletNavComp/TabletNavCompUserActive/TabletNavCompUserActive'
import TabletNavCompUserNotActive from './navComponentsResponsive/TabletNavComp/TabletNavCompUserNotActive/TabletNavCompUserNotActive'
import DesktopNavCompUserActive from './navComponentsResponsive/DesktopNavComp/DesktopNavCompUserActive/DesktopNavCompUserActive'


const NavComponents = ({
    navOpen,
    setNavOpen,
    isMobile,
    isTablet
}) => {

    const { user } = useUserAuth()
    

    useEffect(() => {
        if (navOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [navOpen]);



    return (

        <>
            {isMobile ? (
                <AnimatePresence mode='wait'>
                    <motion.div className={`${navOpen ? "nav__links-links-mobile open" : "nav__links-links-mobile"}`} initial={{ opacity: 0, y: 100, transition: { delay: 0.3, staggerChildren: 3.5, duration: 0.5, ease: [0.42, 0, 0.58, 1] } }} animate={{ opacity: 1, y: 0, transition: { delay: 0.5, staggerChildren: 3.5, duration: 0.5, ease: [0.42, 0, 0.58, 1] } }} exit={{ opacity: 0, y: 500, transition: { delay: 0.3, velocity: 2, staggerChildren: 1.5, duration: 0.5, ease: [0.42, 0, 0.58, 1] } }}>
                        {user ? ( <MobileNavCompUserActive  navOpen={navOpen} setNavOpen={setNavOpen} /> ) : ( <MobileNavCompUserNotActive  navOpen={navOpen} setNavOpen={setNavOpen}/> )}
                    </motion.div>
                </AnimatePresence>
            ) : isTablet ? (
                    <AnimatePresence mode='wait'>
                        <motion.div className={`${navOpen ? "nav__links-links-tablet open" : "nav__links-links-tablet"}`} initial={{ opacity: 0, y: 100, transition: { delay: 0.3, staggerChildren: 3.5, duration: 0.5, ease: [0.42, 0, 0.58, 1] } }} animate={{ opacity: 1, y: 0, transition: { delay: 0.5, staggerChildren: 3.5, duration: 0.5, ease: [0.42, 0, 0.58, 1] } }} exit={{ opacity: 0, y: 500, transition: { delay: 0.3, velocity: 2, staggerChildren: 1.5, duration: 0.5, ease: [0.42, 0, 0.58, 1] } }}>
                            {user ? ( <TabletNavCompUserActive  navOpen={navOpen} setNavOpen={setNavOpen} /> ) : ( <TabletNavCompUserNotActive  navOpen={navOpen} setNavOpen={setNavOpen}/> )}
                        </motion.div>
                    </AnimatePresence>
                ) : (
                    <AnimatePresence mode='wait'>
                        <motion.div className={`${navOpen ? "nav__links-links open" : "nav__links-links"}`} initial={{ opacity: 0, y: 100, transition: { delay: 0.3, staggerChildren: 3.5, duration: 0.5, ease: [0.42, 0, 0.58, 1] } }} animate={{ opacity: 1, y: 0, transition: { delay: 0.5, staggerChildren: 3.5, duration: 0.5, ease: [0.42, 0, 0.58, 1] } }} exit={{ opacity: 0, y: 500, transition: { delay: 0.3, velocity: 2, staggerChildren: 1.5, duration: 0.5, ease: [0.42, 0, 0.58, 1] } }}>
                            {user && ( <DesktopNavCompUserActive  navOpen={navOpen} setNavOpen={setNavOpen}/> )}
                        </motion.div>
                    </AnimatePresence>
                )}
        </>
    )
}

export default NavComponents