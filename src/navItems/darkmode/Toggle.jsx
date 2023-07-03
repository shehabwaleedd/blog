import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Toggle.css';
import { BiMoon, BiSun } from 'react-icons/bi';

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
        style={{transitionDuration: navOpen ? "1s" : "1.5s", paddingTop: "0.2rem"}}
      >
        {isOn ? (
          <BiSun />
        ) : (
          <BiMoon />
        )}
      </motion.div>
  );
};

export default Toggle;