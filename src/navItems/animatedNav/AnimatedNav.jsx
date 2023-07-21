import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './AnimatedNav.css'
import { useTranslation } from 'react-i18next'
import NavComponents from './navComponents/NavComponents'
import { useLocation } from 'react-router-dom'
import { useUserAuth } from '../../components/authContext/AuthContext'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";

const AnimatedNav = ({ language, isTablet, setIsTablet, setIsMobile, isMobile, navOpen, setNavOpen, toggleTheme }) => {

  const { t } = useTranslation()
  const location = useLocation();
  const { user, logOut } = useUserAuth()
  const navigate = useNavigate()
  const [articlesOpen, setArticlesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [postCount, setPostCount] = useState(0);


  useEffect(() => {
    const fetchPostCount = async () => {
      try {
        const postsCollectionRef = collection(db, "posts");
        const snapshot = await getDocs(postsCollectionRef);
        const count = snapshot.size;
        setPostCount(count);
      } catch (error) {
        console.error("Error fetching post count:", error);
      }
    };

    fetchPostCount();
  }, []);

  const handleArticlesOpen = () => {
    setArticlesOpen(true);
    setAboutOpen(false);
    setAccountOpen(false);
    setCreateOpen(false);
  };

  const handleAboutOpen = () => {
    setAboutOpen(true);
    setArticlesOpen(false);
    setAccountOpen(false);
    setCreateOpen(false);
  };

  const handleAccountOpen = () => {
    setAccountOpen(true);
    setArticlesOpen(false);
    setAboutOpen(false);
    setCreateOpen(false);
  };

  const handleCreateOpen = () => {
    setCreateOpen(true);
    setArticlesOpen(false);
    setAccountOpen(false);
    setAboutOpen(false);
  };

  useEffect(() => {

    setNavOpen(false); // Close the navbar when the location changes
    // eslint-disable-next-line 
  }, [location, setNavOpen]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 468);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth <= 935);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (


    <>
      {isMobile ? (
        <>
          <nav className='navbar'>
            <div className="navbar__container-mobile">
              <Link to="/" className="logo-mobile square">
                <h1 style={{
                    fontFamily: language === "ar" ? "El Messiri" : "Satoshi-Bold",
                    letterSpacing: language === "ar" ? "0rem" : "0.2rem",
                  }}
                >lumos</h1>
              </Link>
              <div className={`${navOpen ? "square4OpenMobile" : "square4Mobile"}`} onClick={() => setNavOpen(!navOpen)}>
                <div className="menu__container-mobile" >
                  <div className={navOpen ? "hamBox-mobile hamBoxOpen" : "hamBox-mobile"}>
                    <span className={navOpen ? "lineTop-mobile spin" : "lineTop-mobile"}></span>
                    <span className={navOpen ? "lineBottom-mobile spin" : "lineBottom-mobile"}></span>
                  </div>
                </div>
              </div>
              <Link to="/createpost" className={`${createOpen ? "square5Open-mobile" : "square5-mobile"}`} onClick={handleCreateOpen}>
                <div>
                  <div className="create__container-mobile">
                    {user ? <h1 className='createpost' style={{ color: createOpen ? "var(--container-color)" : "var(--title-color)", zIndex: "99999", position: "relative" }}>{t("navbar__create_post")}</h1> : <h1 style={{ color: createOpen ? "var(--container-color)" : "var(--title-color)" }}>{t("navbar__register")}</h1>}
                  </div>
                </div>
              </Link>
            </div>
          </nav>
          <div className="nav-overlay" style={{ right: navOpen ? "0%" : "-200%", }}>
            <div className="nav__links">
              <NavComponents isTablet={isTablet} setIsTablet={setIsTablet} isMobile={isMobile} setIsMobile={setIsMobile} navOpen={navOpen} />
            </div>
          </div>
        </>
      ) : isTablet ? (
        <>
          <nav className='navbar'>
            <div className="navbar__container-mobile">
              <Link to="/" className="logo-mobile square">
              <h1 style={{
                    letterSpacing: language === "ar" ? "0rem" : "0.2rem",
                  }}
                >lumos</h1>
              </Link>

              <div className={`${navOpen ? "square4OpenMobile" : "square4Mobile"}`} onClick={() => setNavOpen(!navOpen)}>
                <div className="menu__container-mobile" >
                  <div className={navOpen ? "hamBox-mobile hamBoxOpen" : "hamBox-mobile"}>
                    <span className={navOpen ? "lineTop-mobile spin" : "lineTop-mobile"}></span>
                    <span className={navOpen ? "lineBottom-mobile spin" : "lineBottom-mobile"}></span>
                  </div>
                </div>
              </div>
              <Link to="/createpost" className={`${createOpen ? "square5Open-mobile" : "square5-mobile"}`} onClick={handleCreateOpen}>
                <div>
                  <div className="create__container-mobile">
                    {user ? <h1 className='createpost' style={{ color: createOpen ? "var(--container-color)" : "var(--title-color)", zIndex: "99999", position: "relative" }}>{t("navbar__create_post")}</h1> : <h1 style={{ color: createOpen ? "var(--container-color)" : "var(--title-color)" }}>{t("navbar__register")}</h1>}
                  </div>
                </div>
              </Link>
            </div>
          </nav>
          <div className="nav-overlay" style={{ right: navOpen ? "0%" : "-200%", }}>
            <div className="nav__links">
              <NavComponents isTablet={isTablet} setIsTablet={setIsTablet} isMobile={isMobile} setIsMobile={setIsMobile} navOpen={navOpen} />
            </div>
          </div>
        </>
      ) : (
        <>
          <nav className='navbar'>
            <div className="navbar__container">
              <div className="logo square">
                <h1 style={{letterSpacing: language === "ar" ? "0rem" : "0.2rem",}}>lumos</h1>
              </div>
              <Link to="/" className={`${articlesOpen ? "square1Open" : "square1"}`} onClick={handleArticlesOpen}>
                <div>
                  <div className="articles__container">
                    <div className="squared2">
                      <h1 style={{ color: articlesOpen ? "var(--container-color)" : "var(--title-color)", zIndex: "99999", position: "relative" }}>{t("navbar__articles")}</h1>
                      <div className="articles__count">
                        <h1 style={{ color: articlesOpen ? "var(--container-color)" : "var(--title-color)", zIndex: "99999", position: "relative" }}>({postCount})</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              <Link to="/about" className={`${aboutOpen ? "square2Open" : "square2"}`} onClick={handleAboutOpen}>
                <div className="about__container">
                  <div className="squared2">
                    <h1 style={{ color: aboutOpen ? "var(--container-color)" : "var(--title-color)", zIndex: "99999", position: "relative", top: "0", letterSpacing: language === "ar" ? "0rem" : "0.2rem"}}>{t("navbar__about")}</h1>
                  </div>
                </div>
              </Link>
              <Link to={`${user ? "/account" : "/login"}`} className={`${accountOpen ? "square3Open" : "square3"}`} onClick={handleAccountOpen}>
                <div >
                  <div className="account__container">
                    <div className="squared3">
                      {user ? (
                        <h1 style={{ color: accountOpen ? "var(--container-color)" : "var(--title-color)", zIndex: "99999", position: "relative" }}>{t("navbar__account")}</h1>
                      ) : (
                        <h1 style={{ color: accountOpen ? "var(--container-color)" : "var(--title-color)", zIndex: "99999", position: "relative" }}>{t("navbar__login")}</h1>
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
              <Link to="/createpost" className={`${createOpen ? "square5Open" : "square5"}`} onClick={handleCreateOpen}>
                <div>
                  <div className="create__container">
                    {user ? <h1 className='createpost' style={{ color: createOpen ? "var(--container-color)" : "var(--title-color)", zIndex: "99999", position: "relative" }}>{t("navbar__create_post")}</h1> : <h1 style={{ color: createOpen ? "var(--container-color)" : "var(--title-color)" }}>{t("navbar__register")}</h1>}
                  </div>
                </div>
              </Link>
            </div>
          </nav>
          <div className="nav-overlay" style={{ right: navOpen ? "0%" : "-200%", }}>
            <div className="nav__links">
              <NavComponents isTablet={isTablet} setIsTablet={setIsTablet} navOpen={navOpen} />
            </div>
          </div>
        </>
      )}
    </>
  )
}


export default AnimatedNav


