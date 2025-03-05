import React, { useState, useEffect, useContext } from 'react';
import './css/Upgrades.css';
import Upgrade from './Upgrade.jsx';

import { AppContext } from './main/AppContext.jsx';

function Upgrades({onIncreaseDiamond}){ 
  const{ 
    setPasIncreaseMoney,
    pasIncreaseMoney,
    setActIncreaseMoney,
    actIncreaseMoney,
    setUpgrades,
    upgrades, 
    priceMultiplier,
    increaseMultiplier,
    setIsDiscountExists,
  } = useContext(AppContext);

  const handleUpgradeLevelChange = (id) => {
    setIsDiscountExists(false)
    const updatedUpgrades = upgrades.map((upgrade, index, array) => {
      if (upgrade.id === id) {
        onIncreaseDiamond()
        const actIncrease = Math.floor(upgrade.initialIncrease * upgrade.isIncreaseMoney);
        const pasIncrease = Math.floor(upgrade.initialIncrease * !upgrade.isIncreaseMoney);
        setActIncreaseMoney(actIncreaseMoney + actIncrease);
        setPasIncreaseMoney(pasIncreaseMoney + pasIncrease);
        const difference = !upgrade.isIncreaseMoney * 0.035;
        const increase = upgrade.initialIncrease * (1.15 - difference) 
        const updatedUpgrade = {
          ...upgrade,
          level: upgrade.level + 1,
          initialIncrease: increase * increaseMultiplier, 
          initialPrice: increase * 150 * priceMultiplier
        };

        index + 1 < array.length 
        ? array[index + 1].isHidden = !(updatedUpgrade.level > 0)
        :""

        index + 2 < array.length 
        ? array[index + 2].isInvisible = !(updatedUpgrade.level > 0)
        :""
      
        return updatedUpgrade;
      }
      return upgrade;
    });

    setUpgrades(updatedUpgrades); 
  };

  return (
    <div className="Upgrades">
      <div className="Upgrades__title">
        <p>Улучшения</p>
      </div>
      <div className="Upgrades__container">
        {upgrades.map((upgrade) => (
          <Upgrade
            key={upgrade.id}
            {...upgrade}
            onUpgradeLevelChange={handleUpgradeLevelChange}
          />
        ))}
        <div className="Upgrades__space">
        </div>
      </div>
    </div>
  );
}

export default Upgrades;