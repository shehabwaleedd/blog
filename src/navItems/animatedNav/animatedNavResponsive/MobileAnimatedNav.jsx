import React from 'react'
import Navbar from '../animatedNavComponents/NavBar'
import NavComponents from '../navComponents/NavComponents'

const MobileAnimatedNav = ({
    postCount,
    navOpen,
    setNavOpen,
    handleArticlesOpen,
    handleAboutOpen,
    handleAccountOpen,
    articlesOpen,
    aboutOpen,
    accountOpen,
    handleCreateOpen,
    createOpen,
    user,
    language,
    isTablet,
    setIsTablet,
    isMobile,
    setIsMobile,
}) => {
    return (
        <>
            <Navbar
                navOpen={navOpen}
                setNavOpen={setNavOpen}
                handleArticlesOpen={handleArticlesOpen}
                handleAboutOpen={handleAboutOpen}
                handleAccountOpen={handleAccountOpen}
                articlesOpen={articlesOpen}
                aboutOpen={aboutOpen}
                accountOpen={accountOpen}
                handleCreateOpen={handleCreateOpen}
                createOpen={createOpen}
                user={user}
                language={language}
                postCount={postCount}
                isTablet={isTablet}
                setIsTablet={setIsTablet}
                isMobile={isMobile}
                setIsMobile={setIsMobile}
            />
            <div className="nav-overlay" style={{ right: navOpen ? "0%" : "-200%", }}>
                <div className="nav__links">
                    <NavComponents isTablet={isTablet} setIsTablet={setIsTablet} isMobile={isMobile} setIsMobile={setIsMobile} navOpen={navOpen} />
                </div>
            </div>
        </>
    )
}

export default MobileAnimatedNav