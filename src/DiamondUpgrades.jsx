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
  onCounterUpgradesChange,
  upgrades: propUpgrades,
  onCounterDiamondsUpgradesChange,
  diamondUpgrades: propDiamondUpgrades,
 }) {

  const [diamondUpgrades, setDiamondUpgrades] = useState(() => {
    const savedDiamondUpgrades = localStorage.getItem('diamondUpgrades');
    return savedDiamondUpgrades ? JSON.parse(savedDiamondUpgrades) : propDiamondUpgrades;
  });

  const [upgrades, setUpgrades] = useState(() => {
    const savedUpgrades = localStorage.getItem('upgrades');
    return savedUpgrades ? JSON.parse(savedUpgrades) : propUpgrades;
  });
    
  useEffect(() => {
    localStorage.setItem('upgrades', JSON.stringify(upgrades));
  }, [upgrades]);
  
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

        let updatedUpgrades
        switch (id){
          case 1:
            updatedUpgrades = upgrades.map((upgrade) => {
              const price = upgrade.initialPrice * (100 - prices[dUpgrade.level])/100
              const updatedUpgrade = {
                ...upgrade,
                initialPrice: price,
              }
              return updatedUpgrade;
            })
            setUpgrades(updatedUpgrades);
            onCounterUpgradesChange(updatedUpgrades);
            break;
          case 2:
            updatedUpgrades = upgrades.map((upgrade) => {
              const price = upgrade.initialIncrease * (100 + prices[dUpgrade.level])/100
              const updatedUpgrade = {
                ...upgrade,
                initialIncrease: price,
              }
              return updatedUpgrade;
            })
            setUpgrades(updatedUpgrades);
            onCounterUpgradesChange(updatedUpgrades);
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
    onCounterDiamondsUpgradesChange(updatedDUpgrades); 
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
            onCounterUpgradesChange={onCounterUpgradesChange}
          />
        ))}
      </div>
    </div>
  );
}

export default Upgrades;