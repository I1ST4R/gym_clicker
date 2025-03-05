import React, { useState, useEffect, useContext } from 'react';
import './css/DiamondUpgrade.css';

import { AppContext } from './main/AppContext.jsx';

function Upgrade({
  id,
  img,
  level: propLevel,
  onUpgradeLevelChange,
  }) {

  const {
    countDiamond,
    setTooltipPosition,
    setIsDUpgradeHovered,
  } = useContext(AppContext);

  const [level, setLevel] = useState(() => {
    const savedLevel = localStorage.getItem(`upgrade_${id}_level`);
    return savedLevel ? parseInt(savedLevel, 10) : propLevel;
  });

  useEffect(() => {
    localStorage.setItem(`upgrade_${id}_level`, level.toString());
  }, [id, level]);

  const prices = [1, 2, 5, 10]
  
  const handleMouseEnter = (event) => {
    const cardRect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      top: cardRect.top - 60, 
      right: 500, 
      id: id,
    });
    setIsDUpgradeHovered(true);
  };

  const handleMouseLeave = () => {
    setIsDUpgradeHovered(false);
  };

  const isMaxLevel = level === 4;
  const isEnoughDiamonds = countDiamond >= prices[level];

  const handleUpgradeClick = () => {
    if (isEnoughDiamonds && !isMaxLevel) {
      const newLevel = level + 1;
      setLevel(newLevel); 
      onUpgradeLevelChange(id);
    }
  };

  return (
    <div className='DiamondUpgrade'
    onMouseEnter={handleMouseEnter} 
    onMouseLeave={handleMouseLeave}
    onClick={handleUpgradeClick}
    >
      <img src={img} alt="" className='DiamondUpgrade__img'/>  
    </div>
  );
}

export default Upgrade;