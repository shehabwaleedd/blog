import React from 'react';
import {Navigate, useRoutes } from 'react-router-dom';
import Blog from '../../pages/blog/blog/Blog';
import Login from '../../components/login/Login';
import SignUp from '../../components/signUp/SignUp';
import PasswordReset from '../../components/passwordReset/PasswordReset';
import FilteredCategories from '../../pages/blog/filteredCategories/FilteredCategories';
import DetailsPages from '../../pages/blog/blog/details/DetailsPages';
import CreatePost from '../../components/createPost/CreatePost';
import EditPage from '../../pages/blog/blog/details/edit/EditPost';
import { useUserAuth } from '../../components/authContext/AuthContext';
import Account from '../../pages/account/Account';
import About from '../../pages/about/About';
import Faqs from '../../pages/faqs/Faqs';
import Contact from '../../pages/contact/Contact';

const MainRoutes = ({isTablet, setIsTablet,navOpen, isMobile, setIsMobile, setNavOpen, toggleTheme, language, setLanguage, languageExpanded, setLanguageExpanded}) => {
  const { user } = useUserAuth();

  // Custom route configuration
  const routeConfig = [
    { path: '/login', element: <Login language={language} isMobile={isMobile} setIsMobile={setIsMobile} isTablet={isTablet}/> },
    { path: '/signup', element: <SignUp language={language} isMobile={isMobile} setIsMobile={setIsMobile} isTablet={isTablet}/> },
    { path: '/passwordreset', element: <PasswordReset  isMobile={isMobile} setIsMobile={setIsMobile}/> },
    { path: '/account', element: <Account isTablet={isTablet} setIsTablet={setIsTablet} isMobile={isMobile} setIsMobile={setIsMobile}/> },
    { path: '/about', element: <About  isMobile={isMobile} setIsMobile={setIsMobile}/>},
    { path: '/faqs', element: <Faqs  isMobile={isMobile} setIsMobile={setIsMobile}/>},
    { path: '/contact', element: <Contact language={language} isMobile={isMobile} setIsMobile={setIsMobile}/>},
    {
      path: '/',
      element: user ? <Blog isTablet={isTablet} setIsTablet={setIsTablet} isMobile={isMobile} setIsMobile={setIsMobile}  language={language} setLanguage={setLanguage} languageExpanded={languageExpanded} setLanguageExpanded={setLanguageExpanded}  navOpen={navOpen} setNavOpen={setNavOpen} toggleTheme={toggleTheme}/> : <Navigate to="/login" replace />,
    },
    { path: '/filtered/:category', element: <FilteredCategories  toggleTheme={toggleTheme} language={language} setLanguage={setLanguage} languageExpanded={languageExpanded} setLanguageExpanded={setLanguageExpanded}/> },
    { path: '/details/:id', element: <DetailsPages  isMobile={isMobile} setIsMobile={setIsMobile}/> },
    {
      path: '/createpost',
      element: user ? <CreatePost  isMobile={isMobile} setIsMobile={setIsMobile}/> : <Navigate to="/login" replace />,
    },

    {
      path: '/edit/:id',
      element: user ? <EditPage  isMobile={isMobile} setIsMobile={setIsMobile}/> : <Navigate to="/login" replace />,
    },
  ];

  // Generate routes using useRoutes hook
  const renderedRoutes = useRoutes(routeConfig);

  return (
    <>
      {renderedRoutes}
    </>
  );
};

export default MainRoutes;

