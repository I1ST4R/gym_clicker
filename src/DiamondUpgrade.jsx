import React, { useState, useEffect } from 'react';
import './css/DiamondUpgrade.css';

function Upgrade({
  id,
  img,
  benefit,
  level: propLevel,
  onUpgradeLevelChange,
  diamond,
  onTooltipPositionChange,
  onIsDUpgradeHoveredChange,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

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
    onTooltipPositionChange({
      top: cardRect.top - 60, 
      right: 500, 
      id: id,
    });
    onIsDUpgradeHoveredChange(true);
  };

  const handleMouseLeave = () => {
    onIsDUpgradeHoveredChange(false);
  };

  const isMaxLevel = level === 4;
  const isEnoughDiamonds = diamond >= prices[level];

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