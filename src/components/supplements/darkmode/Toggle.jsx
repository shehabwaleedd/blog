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
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  return (
    <div
      className={`circle ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      onClick={toggleSwitch}
    >
      <div className="half-circle blackcircle"></div>
      <div className="half-circle whitecircle"></div>
    </div>
  );



};

export default Toggle;