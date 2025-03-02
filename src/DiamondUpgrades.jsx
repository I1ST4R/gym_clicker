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
  onIncreaseMultiplierChange,
  onCooldwonDiscountChange,
  onTooltipPositionChange,
  onIsDUpgradeHoveredChange,
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
        const increase = (100 + prices[dUpgrade.level])/100
        const decrease = (100 - prices[dUpgrade.level])/100
        switch (id){
          case 1:
            onPriceMultiplierChange(decrease)
            break;
          case 2:
            onIncreaseMultiplierChange(increase)
            break;
          case 3:
            onCooldwonDiscountChange(decrease)
            break;
          case 4:
            onMaxDelayChange(maxDelay * decrease)
            onMinDelayChange(minDelay * decrease)
            break;
          case 5:
            onMultiplierChange(multiplier * increase)
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
            onTooltipPositionChange={onTooltipPositionChange}
            onIsDUpgradeHoveredChange={onIsDUpgradeHoveredChange}
          />
        ))}
      </div>
    </div>
  );
}

export default Upgrades;