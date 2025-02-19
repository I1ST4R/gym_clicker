import React, { useState } from 'react';
import './css/Upgrade.css';
import upgradeLevelUp from './assets/sounds/upgradeLevelUp.mp3';
import error from './assets/sounds/error.mp3';

function Upgrade({
  id,
  title,
  img,
  desc,
  initialPrice,
  increase,
  images,
  maxLvl,
  level,
  benefit,
  maxLvlText,
  onUpgradeLevelChange,
  onLevelTrainerChange,
  onCounterChange,
  count,
  isHidden,
  isInvisible, 
}) {
  const [isHovered, setIsHovered] = useState(false);
  const price = Math.floor(initialPrice * Math.pow(increase * 2, level));
  const isMaxLevel = level >= maxLvl;
  const isEnoughMoney = count >= price;

  const postErrorMessage = (message) => {
    new Audio(error).play();
    setTimeout(() => alert(message), 50);
  };

  const handleUpgradeClick = () => {
    if (isMaxLevel) {
      postErrorMessage("Ты улучшил эту карточку до максимального уровня");
      return;
    }

    if (!isEnoughMoney) {
      postErrorMessage("Не достаточно денег.");
      return;
    }

    onUpgradeLevelChange(id);
    if (id === 1) {
      onLevelTrainerChange(images[(level + 1) % images.length]);
    }
    onCounterChange(count - price);

    new Audio(upgradeLevelUp).play();

    level + 1 === maxLvl && maxLvlText ? alert(maxLvlText) : ""
  };

  return (
    <div
      className={`Upgrade 
        ${!isEnoughMoney || isMaxLevel ? 'Upgrade--nonavailable' : ''} 
        ${isHidden ? 'Upgrade--hidden' : ''}
        ${isInvisible ? 'Upgrade--invisible' : ''}`}
      onClick={handleUpgradeClick}
      onMouseEnter={() => setIsHovered(false)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        className="Upgrade__img"
        src={`${images ? images[(level + 1) % images.length] : img}`}
        alt={title}
      />
      <div className="Upgrade__info"> 
        <p className="Upgrade__title">{title}</p>
        {isMaxLevel ? (
          <p className="Upgrade__max-level">максимальный уровень</p>
        ) : (
          <>
            <div className="Upgrade__price-block">
              <p className="Upgrade__price">{price}</p>
              <img src="src/assets/money.png" alt="" />
            </div>
          </>
        )}
      </div>
      
      {isHovered && (
        <div className="Upgrade__tooltip">
          <p>{desc}</p>
          <p className="Upgrade__benefit">{benefit}</p>
        </div>
      )}
    </div>
  );
}

export default Upgrade;