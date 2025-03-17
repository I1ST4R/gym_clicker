import React, { useState, useEffect, useContext } from 'react';
import './css/DnkUpgrade.css';

import { AppContext } from './main/AppContext.jsx';

function DnkUpgrade({
  id,
  img,
  benefit,
  onUpgradeLevelChange,
  }) {

  const {
    setTooltipPosition,
    setIsDnkHovered,
    tooltipPosition,
    countDnk,
  } = useContext(AppContext);
  
  const handleMouseEnter = (event) => {
    const cardRect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      right: window.innerWidth - cardRect.right - 30,
      top:460, 
      id: id,
    });
    setIsDnkHovered(true)
  };

  const handleMouseLeave = () => {
    setIsDnkHovered(false);
  };

  const handleUpgradeClick = () => {
    onUpgradeLevelChange(id);
  };

  return (
    <div className='DnkUpgrade'
    onMouseEnter={handleMouseEnter} 
    onMouseLeave={handleMouseLeave}
    onClick={handleUpgradeClick}
    >
      <img className='DnkUpgrade__img' src={img} alt="" /> 
    </div>

  );
}

export default DnkUpgrade;