import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Toggle.css';

const Toggle = ({ toggleTheme, navOpen }) => {
  const spring = {
    type: 'spring',
    stiffness: 700,
    damping: 30
  };

  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
    toggleTheme(); // Invoke the function
  };
  


  return (
      <motion.div 
        onClick={toggleSwitch} 
        layout 
        transition={spring}
        className={navOpen ? "toggle__container spin" : "toggle__container"}
        style={{transitionDuration: navOpen ? "1s" : "1.5s", transition: navOpen ? "1.5s" : "1.5s"}}
      >
        <motion.i className={isOn ? 'bx bx-sun icon__spin' : 'bx bx-moon icon__spin'}/>
      </motion.div>
  );
};

export default Toggle;