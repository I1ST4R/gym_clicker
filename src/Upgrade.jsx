import React, { useState, useEffect } from 'react';
import './css/Upgrade.css';
import upgradeLevelUp from './assets/sounds/upgradeLevelUp.mp3';
import abbreviateNum from './js/numberAbbreviator.js';
import UpgradesParams from './js/UpgradesParams.js';

function Upgrade({
  id,
  title,
  img,
  desc,
  initialPrice,
  images, 
  maxLvl,
  initialIncrease,
  level: propLevel,
  isIncreaseMoney,
  onUpgradeLevelChange,
  onLevelTrainerChange,
  onCounterMoneyChange, 
  countMoney,
  isHidden,
  isInvisible,
  requirements, 
  pasIncreaseMoney,
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


  
  const handleMouseEnter = (event) => {
    const cardRect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      top: cardRect.top, 
      left: cardRect.left - 240, 
    });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const price = Math.floor(initialPrice);
  const isMaxLevel = level >= maxLvl;
  const isEnoughMoney = countMoney >= price;

  const handleUpgradeClick = () => {
    if (isEnoughMoney && !isMaxLevel && pasIncreaseMoney >= requirements) {
      const newLevel = level + 1;
      setLevel(newLevel); 
      onUpgradeLevelChange(id);
      onCounterMoneyChange(countMoney - price);
      new Audio(upgradeLevelUp).play();
      if (id === 1) {
        onLevelTrainerChange(UpgradesParams[0].images(level + 1)); 
      }
    }
  };

  return (
    <div
      className={`Upgrade 
        ${!isEnoughMoney || isMaxLevel ? 'Upgrade--nonavailable' : ''} 
        ${isHidden ? 'Upgrade--hidden' : ''}
        ${isInvisible ? 'Upgrade--invisible' : ''}`}
      onClick={handleUpgradeClick}
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave} 
    >
      <img
        className="Upgrade__img"
        src={id === 1 ? UpgradesParams[0].images(level) : img}  
        alt={title}
      />
      <div className="Upgrade__info"> 
        <p className="Upgrade__title">{title}</p>
        {requirements > 0 && level === 0 ? (
          <div className="Upgrade__requirements">
            <p className="Upgrade__requirements-text">
              <span>Условия: </span>
              {abbreviateNum(requirements)}
            </p>
            <img className="Upgrade__requirement-img" src="src/assets/client.png" alt="" />
          </div>
        ) : (
          <></>
        )}
        <div className="Upgrade__price-level">
          {isMaxLevel ? (
            <p className="Upgrade__max-level">максимальный уровень</p>
          ) : (
            <>
              <div className="Upgrade__price-block">
                <p className="Upgrade__price">{abbreviateNum(price)}</p>
                <img src="src/assets/money.png" alt="" />
              </div>
            </>
          )}
          <p className="Upgrade__level">{level === 0 ? "" : level}</p>
        </div>
      </div>
      
      {isHovered && (
        <div
          className="Upgrade__tooltip"
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
          }}
        >
          <p>{desc}</p>
          <p className="Upgrade__benefit">{`
            + ${abbreviateNum(Math.floor(initialIncrease))} 
            ${isIncreaseMoney ? "за клик" : "в секунду"}
          `}</p>
        </div>
      )}
    </div>
  );
}

export default Upgrade;