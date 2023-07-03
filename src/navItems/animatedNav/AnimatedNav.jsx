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
import Blog from '../../pages/blog/blog/Blog'

const AnimatedNav = ({ navOpen, setNavOpen, toggleTheme }) => {

  const { t } = useTranslation()
  const location = useLocation();
  const { user, logOut } = useUserAuth()
  const navigate = useNavigate()
  const [articlesOpen, setArticlesOpen] = React.useState(false);
  const [aboutOpen, setAboutOpen] = React.useState(false);
  const [accountOpen, setAccountOpen] = React.useState(false);
  const [createOpen, setCreateOpen] = React.useState(false);

  const handleLogout = async () => {
    try {
      await logOut()
      navigate('/login')
      console.log("logged out successfully")
    } catch (e) {
      console.log(e.message)
    }
  }

  const handleArticlesOpen = () => {
    setArticlesOpen(!articlesOpen);
    setAboutOpen(false);
    setAccountOpen(false);
  };

  const handleAboutOpen = () => {
    setAboutOpen(!aboutOpen);
    setArticlesOpen(false);
    setAccountOpen(false);

  };

  const handleAccountOpen = () => {
    setAccountOpen(!accountOpen);
    setArticlesOpen(false);
    setAboutOpen(false);
  };

  const handleCreateOpen = () => {
    setCreateOpen(!createOpen);
  };

  useEffect(() => {

    setNavOpen(false); // Close the navbar when the location changes
    // eslint-disable-next-line 
  }, [location, setNavOpen]);

  return (


    <>
      <nav className='navbar'>
        <div className="navbar__container">
          <div className="logo square">
            <h1>lumos</h1>
          </div>
          <Link to="/"className={`${articlesOpen ? "square1Open" : "square1"}`} onClick={handleArticlesOpen}>
            <div>
              <div className="articles__container">
                <div className="squared2">
                  <h1 style={{ color: articlesOpen ? "var(--container-color)" : "var(--title-color)" }}>Articles</h1>
                  <div className="articles__count">
                    <h1 style={{ color: articlesOpen ? "var(--container-color)" : "var(--title-color)" }}>(40)</h1>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <div className={`${aboutOpen ? "square2Open" : "square2"}`} onClick={handleAboutOpen}>
            <div className="about__container">
              <div className="squared2">
                <h1 style={{ color: aboutOpen ? "var(--container-color)" : "var(--title-color)" }}>About</h1>
              </div>
            </div>
          </div>
          <Link to="/account" className={`${accountOpen ? "square3Open" : "square3"}`} onClick={handleAccountOpen}>
            <div >
              <div className="account__container">
                <div className="squared3">
                  {user ? (
                    <h1 style={{ color: accountOpen ? "var(--container-color)" : "var(--title-color)" }}>Account</h1>
                  ) : (
                    <h1 style={{ color: accountOpen ? "var(--container-color)" : "var(--title-color)" }}>login</h1>
                  )}
                </div>
              </div>
            </div>
          </Link>
          <div className={`${navOpen ? "square4Open" : "square4"}`} onClick={() => setNavOpen(!navOpen)}>
            <div className="menu__container" >
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
      </nav>
      <div className="nav-overlay" style={{
        right: navOpen ? "0%" : "-200%",


      }}>
        <div className="nav__links">
          <NavComponents navOpen={navOpen} />
        </div>
      </div>
    </>
  )
}


export default AnimatedNav


