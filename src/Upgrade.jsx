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
  isDiscountExists,
  upgrades, 
  onEndChange,
  onTooltipPositionChange,
  onIsUpgradeHoveredChange,
}) {

  const [isAlerted, setIsAlerted] = useState(false);

  const [level, setLevel] = useState(() => {
    const savedLevel = localStorage.getItem(`upgrade_${id}_level`);
    return savedLevel ? parseInt(savedLevel, 10) : propLevel;
  });

  useEffect(() => {
    localStorage.setItem(`upgrade_${id}_level`, level.toString());
  }, [id, level]);

  const handleMouseEnter = (event) => {
    const cardRect = event.currentTarget.getBoundingClientRect();
    onTooltipPositionChange({ 
      right: 500,
      top:cardRect.top,
      id: id, 
    });
    onIsUpgradeHoveredChange(true);
  };

  const handleMouseLeave = () => {
    onIsUpgradeHoveredChange(false);
  };

  const discount = initialPrice * (isDiscountExists / 2);
  const priceWithDiscount = Math.floor(initialPrice - discount);
  const isMaxLevel = level >= maxLvl;
  const isEnoughMoney = countMoney >= priceWithDiscount;

  const handleUpgradeClick = () => {
    if (isId16 && isId15Level50 && isAlerted) {
      setIsAlerted(true)
      onEndChange(true)
      return
    }
    if (isId16 && isId15Level50) {
      alert("При улучшении этой карточки игра будет завершена. Вы уверены что хотите продолжить?")
      setIsAlerted(true)
      return
    }
    if (isEnoughMoney && !isMaxLevel && pasIncreaseMoney >= requirements) {
      const newLevel = level + 1;
      setLevel(newLevel); 
      onUpgradeLevelChange(id);
      onCounterMoneyChange(countMoney - priceWithDiscount);
      new Audio(upgradeLevelUp).play();
      if (id === 1) {
        onLevelTrainerChange(UpgradesParams[0].images(level + 1)); 
      }
    }
  };

  const isId16 = id === 16;
  const isId15Level50 = upgrades.find(upgrade => upgrade.id === 15)?.level >= 50;

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
      {isId16 && !isId15Level50 ? (
        <div className="Upgrade__placeholder">
          <p>???</p>
        </div>
      ) : (
        <img
          className="Upgrade__img"
          src={id === 1 ? UpgradesParams[0].images(level) : img}  
          alt={title}
        />
      )}
      <div className="Upgrade__info"> 
        <p className="Upgrade__title">{isId16 && !isId15Level50 ? "???" : title}</p>
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
        {isId16 && !isId15Level50 && (
          <div className="Upgrade__unlock-requirement">
            <p>Улучшите предыдущую карточку до 50 уровня</p>
          </div>
        )}
        <div className="Upgrade__price-level">
          {isMaxLevel ? (
            <p className="Upgrade__max-level">максимальный уровень</p>
          ) : (
            <>
              <div className="Upgrade__price-block">
                <p className="Upgrade__price">{isId16 && !isId15Level50 ? "???" : abbreviateNum(priceWithDiscount)}</p>
                <img src="src/assets/money.png" alt="" />
              </div>
            </>
          )}
          <p className="Upgrade__level">{level === 0 ? "" : level}</p>
        </div>
      </div>
    </div>
  );
}

export default Upgrade;