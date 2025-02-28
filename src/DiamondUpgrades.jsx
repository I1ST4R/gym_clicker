import React, { useState, useEffect } from 'react';
import './css/DiamondUpgrades.css';
import DiamondUpgrade from './DiamondUpgrade.jsx';

function Upgrades({ 
  onMaxDelayChange, 
  maxDelay, 
  onMinDelayChange,
  minDelay,
  onMultiplierChange,
  multiplier,
  onCounterDiamondChange,
  diamond,
  onCounterBustersChange, 
  busters,
  onCounterDiamondsUpgradesChange,
  diamondUpgrades: propDiamondUpgrades,
  onPriceMultiplierChange,
  onIncreaseMultiplierChange
 }) {

  const [diamondUpgrades, setDiamondUpgrades] = useState(() => {
    const savedDiamondUpgrades = localStorage.getItem('diamondUpgrades');
    return savedDiamondUpgrades ? JSON.parse(savedDiamondUpgrades) : propDiamondUpgrades;
  });
  
  useEffect(() => {
    localStorage.setItem('diamondUpgrades', JSON.stringify(diamondUpgrades));
  }, [diamondUpgrades]);

  const prices = [1, 2, 5, 10]

  const handleUpgradeLevelChange = (id) => {
    const updatedDUpgrades = diamondUpgrades.map((dUpgrade) => {

      if (dUpgrade.id === id) {
        onCounterDiamondChange(diamond - prices[dUpgrade.level])
        const updatedDUpgrade = {
          ...dUpgrade, 
          level: dUpgrade.level + 1,
          initialPrice: prices[dUpgrade.level + 1], 
        }

        switch (id){
          case 1:
            onPriceMultiplierChange((100 - prices[dUpgrade.level])/100)
            break;
          case 2:
            onIncreaseMultiplierChange((100 + prices[dUpgrade.level])/100)
            break;
          case 3:
            console.log(3)
            break;
          case 4:
            console.log(4)
            break;
          case 5:
            console.log(5)
            break;
        }
        return updatedDUpgrade;
      }
      return dUpgrade;
    })

    setDiamondUpgrades(updatedDUpgrades); 
    onCounterDiamondsUpgradesChange(updatedDUpgrades)
  };

  

  return (
    <div className="DiamondUpgrades">
      <div className="DiamondUpgrades__title">
        <p>Алмазные улучшения</p>
      </div>
      <div className="DiamondUpgrades__container">
        {diamondUpgrades.map((diamondUpgrade) => (
          <DiamondUpgrade
            key={diamondUpgrade.id}
            {...diamondUpgrade}
            onUpgradeLevelChange={handleUpgradeLevelChange}
            onMaxDelayChange={onMaxDelayChange}
            maxDelay={maxDelay} 
            onMinDelayChange={onMinDelayChange}
            minDelay={minDelay}
            onMultiplierChange={onMultiplierChange}
            multiplier={multiplier}
            onCounterDiamondChange={onCounterDiamondChange}
            diamond={diamond}
            onCounterBustersChange={onCounterBustersChange}
            busters={busters}
          />
        ))}
      </div>
    </div>
  );
}

export default Upgrades;