import React from 'react';
import '../../../css/Upgrade.css';
import upgradeLevelUp from '../../../../public/sounds/upgradeLevelUp.mp3';
import abbreviateNum from '../../../js/numberAbbreviator.js';
import getTrainerImage from '../../../js/TrainerLevels.js';
import { useStatsContext } from '../../main/contexts/StatsContext.jsx';
import { useShopContext } from '../../main/contexts/ShopContext.jsx';
import { useUIContext } from '../../main/contexts/UIContext.jsx';

function Upgrade({
  id,
  title,
  img,
  level,
  isInvisible 
}) {
  const { 
    end: { setEnd }
  } = useStatsContext();
  
  const { 
    upgrades: { upgrades, useUpgradeCalculations, useUpgradeVisibility, useUpgradeLevelChange },
  } = useShopContext();
  
  const {
    tooltip: { handleTooltipMouseEnter, handleTooltipMouseLeave },
    alert: { showAlert, setShowCustomAlert },
    trainerImage: { setTrainerImage },
  } = useUIContext();

  // Правильный вызов хуков
  const { calculateUpgradePrice, isEnoughMoneyForUpgrade } = useUpgradeCalculations();
  const handleUpgradeLevelChange = useUpgradeLevelChange();
  useUpgradeVisibility();

  const priceWithMults = calculateUpgradePrice(id);
  const isEnoughMoney = isEnoughMoneyForUpgrade(id);
  const isLastUpgrade = id === upgrades.length;

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
      handleUpgradeLevelChange(id);
      id === 1 ? setTrainerImage(getTrainerImage(level + 1)) : ""
      new Audio(upgradeLevelUp).play();
    }
  };

  return (
    <div
      className={`Upgrade 
        ${!isEnoughMoney ? 'Upgrade--nonavailable' : ''} 
        ${isInvisible ? 'Upgrade--invisible' : ''}
      `}
      onClick={handleUpgradeClick}
      onMouseEnter={(event) => handleTooltipMouseEnter(event, id, 'upgrade')}
      onMouseLeave={handleTooltipMouseLeave}
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
  );
}

export default Upgrade;