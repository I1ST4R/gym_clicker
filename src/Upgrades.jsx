import React, { useState, useEffect } from 'react';
import './css/Upgrades.css';
import Upgrade from './Upgrade.jsx';
import UpgradesParams from './js/UpgradesParams.js';

function Upgrades({ onTotalMultiplierChange, onLevelTrainerChange, onCounterChange, count }) {
  const [upgrades, setUpgrades] = useState(UpgradesParams);

  // Calculate the total multiplier func
  const calculateTotalMultiplier = () => {
    return upgrades.reduce((total, upgrade) => {
      return total * (upgrade.increase ** upgrade.level);
    }, 1);
  };

  // call CTM func
  useEffect(() => {
    onTotalMultiplierChange(calculateTotalMultiplier());
  }, [upgrades]);

  const handleUpgradeLevelChange = (id) => {
    setUpgrades((prevUpgrades) =>
      prevUpgrades.map((upgrade, index, array) => {
        if (upgrade.id === id) {
          const updatedUpgrade = { ...upgrade, level: upgrade.level + 1 };

          index + 1 < array.length 
          ? array[index + 1].isHidden = !(updatedUpgrade.level > 0)
          :""

          index + 2 < array.length 
          ? array[index + 2].isInvisible = !(updatedUpgrade.level > 0)
          :""
        
          return updatedUpgrade;
        }
        return upgrade;
      })
    );
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
            onCounterChange={onCounterChange}
            count={count}
          />
        ))}
      </div>
    </div>
  );
}

export default Upgrades;