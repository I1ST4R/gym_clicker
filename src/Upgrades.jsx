import React, { useState, useEffect } from 'react';
import './css/Upgrades.css';
import Upgrade from './Upgrade.jsx';
import UpgradesParams from './js/UpgradesParams.js';

function Upgrades({ onTotalMultiplierChange, onLevelTrainerChange, onCounterChange, count }) {
  const [isVisible, setIsVisible] = useState(false);
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
    setUpgrades((prevUpgrades) => {
      const updatedUpgrades = [...prevUpgrades]; 
      const index = updatedUpgrades.findIndex((upgrade) => upgrade.id === id);
  
      if (index !== -1) {
        updatedUpgrades[index] = {...updatedUpgrades[index]}
        updatedUpgrades[index].level+=1
      }
  
      return updatedUpgrades;
    })
  }

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