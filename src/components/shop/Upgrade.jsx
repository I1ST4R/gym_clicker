import React, { useState } from 'react';
import '../../css/Upgrade.css';
import upgradeLevelUp from '../../../public/sounds/upgradeLevelUp.mp3';
import abbreviateNum from '../../js/numberAbbreviator.js';
import getTrainerImage from '../../js/TrainerLevels.js';
import { useStatsContext } from '../main/StatsContext'; 
import { useShopContext } from '../main/ShopContext'; 
import { useUIContext } from '../main/UIContext'; 

function Upgrade({
  id,
  title,
  img,
  level,
  initialPrice,
  initialIncrease,
  isHidden,
  isInvisible,
  onUpgradeLevelChange,
}) {

  const {
    counters: { countMoney, setCountMoney },
    end: { setEnd },
  } = useStatsContext();

  const {
    upgrades: { upgrades },
    dnk: { priceMultiplier },
    busters: { isDiscountExists },
  } = useShopContext();

  const {
    tooltip: { setTooltipPosition, setIsUpgradeHovered },
    alert: { showAlert, setShowCustomAlert },
    trainerImage: { setTrainerImage },
  } = useUIContext();

  const handleMouseEnter = (event) => {
    const cardRect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      top: cardRect.top,
      id: id,
    });
    setIsUpgradeHovered(true);
  };

  const handleMouseLeave = () => {
    setIsUpgradeHovered(false);
  };

  let priceWithMults, dnkMult;
  let discount = (isDiscountExists ? 1 : 2) / 2;
  if (id < 7) {
    dnkMult = priceMultiplier;
    priceWithMults = BigInt(Math.floor(initialPrice * dnkMult * discount));
  } else {
    dnkMult = BigInt(Math.floor(priceMultiplier * 100));
    let flooredPrice = BigInt(initialPrice);
    priceWithMults = BigInt((flooredPrice / 1000n) * dnkMult * BigInt(discount * 10));
  }

  const isEnoughMoney = countMoney >= priceWithMults;
  const isLastUpgrade = id === upgrades.length;

  const doChanges = () => {
    onUpgradeLevelChange(id);
    setCountMoney(countMoney - priceWithMults);
    if (id === 1) {
      setTrainerImage(getTrainerImage(level + 1));
    }
  };

  const handleUpgradeClick = () => {
    if (isEnoughMoney && isLastUpgrade) {
      showAlert(
        "При улучшении этой карточки игра будет завершена. Вы уверены, что хотите продолжить?",
        () => {
          setShowCustomAlert(false);
          setEnd(true);
        },
        () => {
          setShowCustomAlert(false);
        }
      );
      return;
    }
    if (isEnoughMoney) {
      doChanges();
      new Audio(upgradeLevelUp).play();
    }
  };

  return (
    <>
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
        <img
          className="Upgrade__img"
          src={id === 1 ? getTrainerImage(level) : img}
          alt={title}
        />
        <div className="Upgrade__info">
          <p className="Upgrade__title">{title}</p>
          <div className="Upgrade__price-level">
            <div className="Upgrade__price-block">
              <p className="Upgrade__price">
                {abbreviateNum(priceWithMults)}
              </p>
              <img src="money.png" alt="" />
            </div>
            <p className="Upgrade__level">{level === 0 ? '' : level.toString()}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Upgrade;