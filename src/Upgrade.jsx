import React, { useState, useEffect, useContext } from 'react';
import './css/Upgrade.css';
import upgradeLevelUp from '../public/sounds/upgradeLevelUp.mp3';
import abbreviateNum from './js/numberAbbreviator.js';
import getTrainerImage from './js/TrainerLevels.js';

import { AppContext } from './main/AppContext.jsx';

function Upgrade({
  id,
  title,
  img,
  desc,
  level,
  initialPrice,
  maxLvl,
  initialIncrease,
  isIncreaseMoney,
  isHidden,
  isInvisible,
  requirements,
  onUpgradeLevelChange,
}) {
  const {
    upgrades,
    setCountMoney,
    countMoney,
    isDiscountExists,
    setEnd,
    setTooltipPosition,
    setIsUpgradeHovered,
    setTrainerImage,
  } = useContext(AppContext);

  const [isAlerted, setIsAlerted] = useState(false);

  const handleMouseEnter = (event) => {
    const cardRect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      right: 500,
      top: cardRect.top,
      id: id,
    });
    setIsUpgradeHovered(true);
  };

  const handleMouseLeave = () => {
    setIsUpgradeHovered(false);
  };

  const discount = (BigInt(initialPrice) * BigInt(isDiscountExists ? 1 : 0)) / BigInt(2);
  const priceWithDiscount = BigInt(initialPrice) - discount;
  const isEnoughMoney = countMoney >= priceWithDiscount;

  const isId16 = id === 16;
  const isId19 = id === 19;
  const isId15Level50 = upgrades.find((upgrade) => upgrade.id === 15)?.level >= 50;

  const handleUpgradeClick = () => {
    if (isId19) {
      setEnd(true);
      return;
    }

    if (isId16 && isId15Level50) {
      if (isAlerted) {
        setEnd(true);
        return;
      } else {
        alert('При улучшении этой карточки игра будет завершена. Вы уверены, что хотите продолжить?');
        setIsAlerted(true);
        return;
      }
    }

    if (!isId16 && isEnoughMoney) {
      const newLevel = level + 1;
      onUpgradeLevelChange(id);
      setCountMoney(countMoney - priceWithDiscount);
      new Audio(upgradeLevelUp).play();
      if (id === 1) {
        setTrainerImage(getTrainerImage(newLevel));
      }
    }
  };

  return (
    <div
      className={`Upgrade 
        ${!isEnoughMoney ? 'Upgrade--nonavailable' : ''} 
        ${isHidden ? 'Upgrade--hidden' : ''}
        ${isInvisible ? 'Upgrade--invisible' : ''}
        `}
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
          src={id === 1 ? getTrainerImage(level) : img}
          alt={title}
        />
      )}
      <div className="Upgrade__info">
        <p className="Upgrade__title">{isId16 && !isId15Level50 ? '???' : title}</p>
        {isId16 && !isId15Level50 && (
          <div className="Upgrade__unlock-requirement">
            <p>Улучшите предыдущую карточку до 50 уровня</p>
          </div>
        )}
        <div className="Upgrade__price-level">
          <div className="Upgrade__price-block">
            <p className="Upgrade__price">
              {isId16 && !isId15Level50 ? '???' : abbreviateNum(priceWithDiscount)}
            </p>
            <img src="money.png" alt="" />
          </div>
          <p className="Upgrade__level">{level === 0 ? '' : level.toString()}</p>
        </div>
      </div>
    </div>
  );
}

export default Upgrade;