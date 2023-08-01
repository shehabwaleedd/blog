import React, { useState, useEffect } from 'react'
import './AnimatedNav.css'
import { useLocation } from 'react-router-dom'
import { useUserAuth } from '../../components/authContext/AuthContext'
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
import AnimatedNavDesktop from './animatedNavResponsive/DesktopAnimatedNav'
import MobileAnimatedNav from './animatedNavResponsive/MobileAnimatedNav'
import TabletAnimatedNav from './animatedNavResponsive/TabletAnimatedNav'

const AnimatedNav = ({ language, isTablet, setIsTablet, setIsMobile, isMobile, navOpen, setNavOpen, toggleTheme }) => {

  const location = useLocation();
  const { user } = useUserAuth()
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

  useEffect(() => {

    if(location.pathname === "/") {
      setArticlesOpen(true);
    } else if (location.pathname === "/about") {
      setAboutOpen(true);
    } else if (location.pathname === "/account") {
      setAccountOpen(true);
    } else if (location.pathname === "/createpost") {
      setCreateOpen(true);
    } 

  }, [location.pathname]);

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
        <MobileAnimatedNav
          isTablet={isTablet}
          setIsTablet={setIsTablet}
          isMobile={isMobile}
          setIsMobile={setIsMobile}
          navOpen={navOpen}
          setNavOpen={setNavOpen}
          handleArticlesOpen={handleArticlesOpen}
          handleAboutOpen={handleAboutOpen}
          handleAccountOpen={handleAccountOpen}
          handleCreateOpen={handleCreateOpen}
          createOpen={createOpen}
          user={user}
          language={language}
          articlesOpen={articlesOpen}
          aboutOpen={aboutOpen}
          accountOpen={accountOpen}
          postCount={postCount}

        />
      ) : isTablet ? (
        <TabletAnimatedNav
          isTablet={isTablet}
          setIsTablet={setIsTablet}
          isMobile={isMobile}
          setIsMobile={setIsMobile}
          navOpen={navOpen}
          setNavOpen={setNavOpen}
          handleArticlesOpen={handleArticlesOpen}
          handleAboutOpen={handleAboutOpen}
          handleAccountOpen={handleAccountOpen}
          handleCreateOpen={handleCreateOpen}
          user={user}
          language={language}
          articlesOpen={articlesOpen}
          aboutOpen={aboutOpen}
          accountOpen={accountOpen}
          createOpen={createOpen}
          postCount={postCount}
        />
      ) : (
        <AnimatedNavDesktop
          isTablet={isTablet}
          setIsTablet={setIsTablet}
          isMobile={isMobile}
          setIsMobile={setIsMobile}
          navOpen={navOpen}
          setNavOpen={setNavOpen}
          handleArticlesOpen={handleArticlesOpen}
          handleAboutOpen={handleAboutOpen}
          handleAccountOpen={handleAccountOpen}
          handleCreateOpen={handleCreateOpen}
          user={user}
          language={language}
          articlesOpen={articlesOpen}
          aboutOpen={aboutOpen}
          accountOpen={accountOpen}
          createOpen={createOpen}
          postCount={postCount}
        />
      )}
    </>
  )
}


export default AnimatedNav


