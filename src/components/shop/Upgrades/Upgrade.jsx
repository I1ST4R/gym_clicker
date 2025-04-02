import React from 'react';
import '../../../css/Upgrade.css';
import abbreviateNum from '../../../js/numberAbbreviator.js';
import getTrainerImage from '../../../js/TrainerLevels.js';
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
    upgrades: { useUpgradeCalculations, useUpgradeVisibility, useUpgradeLevelChange },
  } = useShopContext();

  const {
    tooltip: { handleTooltipMouseEnter, handleTooltipMouseLeave },
  } = useUIContext();

  // Правильный вызов хуков
  const { calculateUpgradePrice, isEnoughMoneyForUpgrade } = useUpgradeCalculations();
  const handleUpgradeLevelChange = useUpgradeLevelChange();
  useUpgradeVisibility();

  const priceWithMults = calculateUpgradePrice(id);
  const isEnoughMoney = isEnoughMoneyForUpgrade(id);

  return (
    <div
      className={`Upgrade 
        ${!isEnoughMoney ? 'Upgrade--nonavailable' : ''} 
        ${isInvisible ? 'Upgrade--invisible' : ''}
      `}
      onClick={() => {handleUpgradeLevelChange(id)}}
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