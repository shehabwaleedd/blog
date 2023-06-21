import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import DropDownMenu from './dropDownMenu/DropDownMenu'
import './AnimatedNav.css'
import { useTranslation } from 'react-i18next'
import NavComponents from './navComponents/NavComponents'
import { useLocation } from 'react-router-dom'
import Toggle from '../darkmode/Toggle'
import { useUserAuth } from '../../components/authContext/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


const AnimatedNav = ({ navOpen, setNavOpen, toggleTheme }) => {

  const { t } = useTranslation()
  const location = useLocation();
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

  useEffect(() => {

    setNavOpen(false); // Close the navbar when the location changes
    // eslint-disable-next-line 
  }, [location, setNavOpen]);

  return (
    <nav className='nav'>
      <div className="navbar__container">
        <div className="navbar__left">
          <div className={navOpen ? "logo spin" : "logo"} style={{ transitionDuration: navOpen ? "1s" : "1.5s", transition: navOpen ? "1.5s" : "1.5s" }}>
            <Link to="/">lumos</Link>
          </div>
        </div>
        <div className="navbar__middle">
          <NavComponents navOpen={navOpen} />
        </div>
        <div className="side__navbar">
          {user && (
            <>

                <div className="search__field">
                  <input type="text" placeholder="Search" />
                  <i className='bx bx-search' ></i>
                </div>
              <div className="loginss">
                <button className={navOpen ? "nav__home spin" : "nav__home"} style={{ opacity: navOpen ? "1" : "1", padding: navOpen ? "0.6rem" : "0" }}>
                  Account
                </button>
              </div>
              <button className={navOpen ? "nav__home spin" : "nav__home"} onClick={handleLogout} >{t("navbar__logout")}</button>
            </>
          )}
          <Toggle toggleTheme={toggleTheme} navOpen={navOpen} />
          <DropDownMenu navOpen={navOpen} />
          <Link className={navOpen ? "createpost__button spin" : "createpost__button"} to={user ? "/createpost" : "/signup"}>
            <button>
              {user ? <h1 className='createpost'>Create Post</h1> : <h1>Register</h1>}
            </button>
          </Link>
          <div className="menu-toggle" onClick={() => setNavOpen(!navOpen)}>
            <div className={navOpen ? "hamBox hamBoxOpen" : "hamBox"}>
              <span className={navOpen ? "lineTop spin" : "lineTop"}></span>
              <span className={navOpen ? "lineBottom spin" : "lineBottom"}></span>
            </div>
          </div>
        </div>
        <div className="nav-footer" style={{
          opacity: navOpen ? "1" : "0",
          transition: navOpen ? "1s" : "0s",
          transitionDelay: navOpen ? "3s" : "0s",
        }}>
        </div>
        <div className="nav-overlay" style={{
          top: navOpen ? "0%" : "-200%",
          marginRight: navOpen ? "0" : "-200%",
          transitionDelay: navOpen ? "0s" : "0s",
          transitionDuration: navOpen ? "1s" : "1.5s",
        }}>
        </div>
      </div>
    </nav>
  )
}


export default AnimatedNav