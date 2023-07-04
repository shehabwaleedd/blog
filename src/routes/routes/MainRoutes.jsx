import React from 'react';
import { useLocation, Navigate, useRoutes } from 'react-router-dom';
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

const MainRoutes = ({navOpen, setNavOpen, toggleTheme}) => {
  const location = useLocation();
  const { user } = useUserAuth();

  // Custom route configuration
  const routeConfig = [
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <SignUp /> },
    { path: '/passwordreset', element: <PasswordReset /> },
    { path: '/account', element: <Account /> },
    { path: '/about', element: <About />},
    {
      path: '/',
      element: user ? <Blog navOpen={navOpen} setNavOpen={setNavOpen} toggleTheme={toggleTheme}/> : <Navigate to="/login" replace />,
    },
    { path: '/filtered/:category', element: <FilteredCategories /> },
    { path: '/details/:id', element: <DetailsPages /> },
    {
      path: '/createpost',
      element: user ? <CreatePost /> : <Navigate to="/login" replace />,
    },

    {
      path: '/edit/:id',
      element: user ? <EditPage /> : <Navigate to="/login" replace />,
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