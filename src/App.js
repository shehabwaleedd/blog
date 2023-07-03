
import './App.css';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import MainRoutes from './routes/routes/MainRoutes';
import { createContext } from 'react';
import AnimatedNav from './navItems/animatedNav/AnimatedNav';
import ScrollUp from './components/scrollup/ScrollUp';
import Footer from './pages/footer/Footer';

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState('dark');
  const [navOpen, setNavOpen] = useState(false);

  // const toggleTheme = () => {
  //   theme === 'dark' ? setTheme('light') : setTheme('dark');
  // };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <div className="App" id={theme}>
            <AnimatedNav navOpen={navOpen} setNavOpen={setNavOpen} toggleTheme={toggleTheme}/>
            <ThemeContext.Provider value={{ theme, toggleTheme }}>
              <AnimatePresence>
                <MainRoutes navOpen={navOpen} setNavOpen={setNavOpen} toggleTheme={toggleTheme}/>
              </AnimatePresence>
              <ScrollUp />
              <Footer />
            </ThemeContext.Provider>
      </div>
  );
}

export default App;
