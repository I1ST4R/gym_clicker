import React, { useState, useEffect } from 'react';
import './css/DiamondUpgrade.css';

function Upgrade({
  id,
  img,
  benefit,
  level: propLevel,
  onUpgradeLevelChange,
  onMaxDelayChange,
  maxDelay, 
  onMinDelayChange,
  minDelay,
  onMultiplierChange,
  multiplier,
  onCounterDiamondChange,
  diamond,
  onCounterBustersChange,
  busters,
  onCounterUpgradesChange,
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
    setTooltipPosition({
      top: cardRect.top - 60, 
      left: 450, 
    });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
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
      
      {isHovered && !isMaxLevel && (
        <div
          className="DiamondUpgrade__tooltip"
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
          }}
        >
          <p className="DiamondUpgrade__upgrade-info">
            {`Улучшение: ${benefit} ${prices[level]}%`}
          </p>
          <div className="DiamondUpgrade__price-block">
            {`Стоимость: ${prices[level]} `}
            <img src="src/assets/diamond.png" alt="" />
          </div>
        </div>
      )}
      {isHovered && isMaxLevel && (
        <div
          className="DiamondUpgrade__tooltip"
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
        }}
        >
        <p className="DiamondUpgrade__upgrade-info">
          Максимальный уровень
        </p>
      </div>
      )}
        
    </div>
  );
}

export default Upgrade;