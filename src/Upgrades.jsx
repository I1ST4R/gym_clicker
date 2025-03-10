import React, { useState, useEffect, useContext } from 'react';
import './css/Upgrades.css';
import Upgrade from './Upgrade.jsx';

import { AppContext } from './main/AppContext.jsx';

function Upgrades({ onIncreaseDiamond }) {
  const {
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
    setIsDiscountExists(false);
    const updatedUpgrades = upgrades.map((upgrade, index, array) => {
      if (upgrade.id === id) {
        onIncreaseDiamond();

        const isSmallNumber = upgrade.initialIncrease < 1000000;

        let actIncrease, pasIncrease, newIncrease, updatedUpgrade;

        if (isSmallNumber) {
          // Обработка маленьких чисел как обычных чисел
          actIncrease = upgrade.initialIncrease * upgrade.isIncreaseMoney;
          pasIncrease = upgrade.initialIncrease * !upgrade.isIncreaseMoney;

          // Приводим маленькие числа к BigInt перед сложением
          setActIncreaseMoney(actIncreaseMoney + BigInt(Math.floor(actIncrease)));
          setPasIncreaseMoney(pasIncreaseMoney + BigInt(Math.floor(pasIncrease)));

          const difference = !upgrade.isIncreaseMoney ? 0.035 : 0;
          newIncrease = upgrade.initialIncrease * (1.15 - difference);

          

          updatedUpgrade = {
            ...upgrade,
            level: upgrade.level + 1,
            initialIncrease: newIncrease * increaseMultiplier,
            initialPrice: Math.floor(upgrade.initialPrice * 1.16),
          };


        } else {
          // Обработка больших чисел как BigInt
          actIncrease = BigInt(Math.floor(upgrade.initialIncrease * upgrade.isIncreaseMoney));
          pasIncrease = BigInt(Math.floor(upgrade.initialIncrease * !upgrade.isIncreaseMoney));

          setActIncreaseMoney(actIncreaseMoney + actIncrease);
          setPasIncreaseMoney(pasIncreaseMoney + pasIncrease);

          const difference = !upgrade.isIncreaseMoney ? 0.035 : 0;
          newIncrease = BigInt(Math.floor(Number(upgrade.initialIncrease) * (1.15 - difference)));

          updatedUpgrade = {
            ...upgrade,
            level: upgrade.level + 1,
            initialIncrease: newIncrease * BigInt(increaseMultiplier),
            initialPrice: BigInt(Math.floor(Number(upgrade.initialPrice) * 1.16)),
          };
        }

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