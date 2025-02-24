import React, { useState, useEffect } from 'react';
import './css/Upgrades.css';
import Upgrade from './Upgrade.jsx';

function Upgrades({ 
  onLevelTrainerChange, 
  onCounterMoneyChange, 
  countMoney,
  onPasIncreaseMoneyChange,
  pasIncreaseMoney,
  onActIncreaseMoneyChange,
  actIncreaseMoney,
  onCounterUpgradesChange,
  upgrades: propUpgrades, 
 }) {

  const [upgrades, setUpgrades] = useState(() => {
    const savedUpgrades = localStorage.getItem('upgrades');
    return savedUpgrades ? JSON.parse(savedUpgrades) : propUpgrades;
  });

  useEffect(() => {
    localStorage.setItem('upgrades', JSON.stringify(upgrades));
  }, [upgrades]);



  const handleUpgradeLevelChange = (id) => {
    const updatedUpgrades = upgrades.map((upgrade, index, array) => {
      if (upgrade.id === id) {
        const actIncrease = Math.floor(upgrade.initialIncrease * upgrade.isIncreaseMoney)
        const pasIncrease = Math.floor(upgrade.initialIncrease * !upgrade.isIncreaseMoney)
        onActIncreaseMoneyChange(actIncreaseMoney + actIncrease)
        onPasIncreaseMoneyChange(pasIncreaseMoney + pasIncrease)
        const difference = !upgrade.isIncreaseMoney * 0.035
        const increase = upgrade.initialIncrease * (1.15 - difference)
        const updatedUpgrade = {
          ...upgrade, 
          level: upgrade.level + 1,
          initialIncrease: increase,
          initialPrice: upgrade.initialPrice * 1.16,
        }

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
    onCounterUpgradesChange(updatedUpgrades); 
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
            onLevelTrainerChange={onLevelTrainerChange}
            onCounterMoneyChange={onCounterMoneyChange}
            countMoney={countMoney}
            onPasIncreaseMoneyChange={onPasIncreaseMoneyChange}
            pasIncreaseMoney={pasIncreaseMoney}
          />
        ))}
      </div>
    </div>
  );
}

export default Upgrades;