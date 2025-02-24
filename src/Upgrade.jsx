import React, { useState } from 'react';
import './css/Upgrade.css';
import upgradeLevelUp from './assets/sounds/upgradeLevelUp.mp3';
import abbreviateNum from './js/numberAbbreviator.js';

function Upgrade({
  id,
  title,
  img,
  desc,
  initialPrice,
  images, 
  maxLvl,
  initialIncrease,
  level,
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
  const price = Math.floor(initialPrice);
  const isMaxLevel = level >= maxLvl;
  const isEnoughMoney = countMoney >= price;

  const handleUpgradeClick = () => {
    if(isEnoughMoney && !isMaxLevel && pasIncreaseMoney >= requirements){
      onUpgradeLevelChange(id);
      if (id === 1) {
        onLevelTrainerChange(images(level + 1)); 
      }
      onCounterMoneyChange(countMoney - price);
      new Audio(upgradeLevelUp).play();
    }
    
  };

  return (
    <div
      className={`Upgrade 
        ${!isEnoughMoney || isMaxLevel ? 'Upgrade--nonavailable' : ''} 
        ${isHidden ? 'Upgrade--hidden' : ''}
        ${isInvisible ? 'Upgrade--invisible' : ''}`}
      onClick={handleUpgradeClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        className="Upgrade__img"
        src={images(0) ? images(level) : img} 
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
          <p className="Upgrade__level">{level === 0 ? "": level}</p>
        </div>
        
      </div>
      
      {isHovered && (
        <div className="Upgrade__tooltip">
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