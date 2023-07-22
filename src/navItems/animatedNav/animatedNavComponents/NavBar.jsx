import React from 'react'
import { Link } from 'react-router-dom'
import DesktopSquares from './navSquares/DesktopSquares';
import MobilesSquares from './navSquares/MobilesSquares';
import TabletSquares from './navSquares/TabletSquares';

const Navbar = ({
    handleArticlesOpen,
    handleAboutOpen,
    handleAccountOpen,
    articlesOpen,
    aboutOpen,
    accountOpen,
    postCount,
    user,
    language,
    navOpen,
    createOpen,
    setNavOpen,
    handleCreateOpen,
    isMobile,
    setIsMobile,
    isTablet,
    setIsTablet,

}) => {
    return (
        <nav className='navbar'>
            {isMobile ? (
                <div className="navbar__container-mobile">
                    <Link to="/" className="logo-mobile square">
                        <h1 style={{
                            letterSpacing: language === "ar" ? "0rem" : "0.2rem",
                        }}
                        >lumos</h1>
                    </Link>
                    <MobilesSquares navOpen={navOpen} setNavOpen={setNavOpen} createOpen={createOpen} user={user} handleCreateOpen={handleCreateOpen}/>
                </div>
            ) : isTablet ? (
                <div className="navbar__container-mobile">
                    <Link to="/" className="logo-mobile square">
                        <h1 style={{letterSpacing: language === "ar" ? "0rem" : "0.2rem",}}>lumos</h1>
                    </Link>
                    <TabletSquares articlesOpen={articlesOpen} handleArticlesOpen={handleArticlesOpen} postCount={postCount} language={language} aboutOpen={aboutOpen} handleAboutOpen={handleAboutOpen} accountOpen={accountOpen} handleAccountOpen={handleAccountOpen} user={user} navOpen={navOpen} setNavOpen={setNavOpen} createOpen={createOpen} handleCreateOpen={handleCreateOpen} />
                </div>
            ) : (
                <div className="navbar__container">
                    <div className="logo square">
                        <h1 style={{ letterSpacing: language === "ar" ? "0rem" : "0.2rem", }}>lumos</h1>
                    </div>
                    <DesktopSquares articlesOpen={articlesOpen} handleArticlesOpen={handleArticlesOpen} postCount={postCount} language={language} aboutOpen={aboutOpen} handleAboutOpen={handleAboutOpen} accountOpen={accountOpen} handleAccountOpen={handleAccountOpen} user={user} navOpen={navOpen} setNavOpen={setNavOpen} createOpen={createOpen} handleCreateOpen={handleCreateOpen} />
                </div>
            )}
        </nav>
    )
}

export default Navbar