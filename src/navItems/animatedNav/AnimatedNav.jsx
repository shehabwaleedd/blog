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
import LoggedInNav from './loggedInNav/LoggedInNav'


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
    <nav className='navbar'>
      {/* <div className="navbar__container">
        <div className="navbar__left">
          <div className={navOpen ? "logo spin" : "logo"} style={{ transitionDuration: navOpen ? "1s" : "1.5s", transition: navOpen ? "1.5s" : "1.5s" }}>
            <Link to="/"><h1>lumos</h1></Link>
          </div>
        </div>
        <div className="side__navbar">
          {user && (
            <div className='middle__navbar'>
              <div className="loginss">
                <button className={navOpen ? "nav__home spin" : "nav__home"} style={{ opacity: navOpen ? "1" : "1", padding: navOpen ? "0.6rem" : "0" }}>
                  Account
                </button>
              </div>
              <button className={navOpen ? "nav__home spin" : "nav__home"} onClick={handleLogout} >{t("navbar__logout")}</button>
            </div>
          )}
          <div className="toggle__div">
            <Toggle toggleTheme={toggleTheme} navOpen={navOpen} />
          </div>
          <div className="lanuage__div">
            <DropDownMenu navOpen={navOpen} />
          </div>
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
        <div className="nav-overlay" style={{
          right: navOpen ? "0%" : "-200%",
        }}>
          <div className="nav__links">
            <NavComponents navOpen={navOpen} />
          </div>
        </div>
      </div> */}
      <div className="navbar__container">
        <div className="logo square">
          <h1>lumos</h1>
        </div>
        <div className="square1">
          <div className="articles__container">
            <div className="squared2">
              <h1>Articles</h1>
              <div className="articles__count">
                <h1>(40)</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="square2">
          <div className="about__container">
            <div className="squared2">
              <h1>About</h1>
            </div>
          </div>
        </div>
        <div className="square3">
          <div className="account__container">
            <div className="squared2">
              {user ? (
                <h1>Account</h1>) : (
                <h1>login</h1>
              )}
            </div>
          </div>
        </div>
        <div className="square4">
          <div className="menu__container" onClick={() => setNavOpen(!navOpen)}>
            <div className={navOpen ? "hamBox hamBoxOpen" : "hamBox"}>
              <span className={navOpen ? "lineTop spin" : "lineTop"}></span>
              <span className={navOpen ? "lineBottom spin" : "lineBottom"}></span>
            </div>
          </div>
        </div>
        <div className="square5">
          <div className="create__container">
          {user ? <h1 className='createpost'>Create Post</h1> : <h1>Register</h1>}
          </div>
        </div>
      </div>
      <div className="nav-overlay" style={{
          right: navOpen ? "100%" : "-500%",
          opacity: navOpen ? "1" : "0",
        }}>
          <div className="nav__links">
            <NavComponents navOpen={navOpen} />
          </div>
        </div>
    </nav>
  )
}


export default AnimatedNav