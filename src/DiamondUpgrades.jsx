import React, { useState, useEffect, useContext } from 'react';
import './css/DiamondUpgrades.css';
import DiamondUpgrade from './DiamondUpgrade.jsx';

import { AppContext } from './main/AppContext.jsx';

function Upgrades({ }) {
  const{
    setMaxDelay, 
    maxDelay, 
    setMinDelay,
    minDelay,
    setMultiplier,
    multiplier,
    setCountDiamond,
    countDiamond,
    setDiamondUpgrades,
    diamondUpgrades,
    setPriceMultiplier,
    setIncreaseMultiplier,
    setCooldwonDiscount,
  } = useContext(AppContext);

  const prices = [1, 2, 5, 10]

  const handleUpgradeLevelChange = (id) => {
    const updatedDUpgrades = diamondUpgrades.map((dUpgrade) => {

      if (dUpgrade.id === id) {
        setCountDiamond(countDiamond - prices[dUpgrade.level])
        const updatedDUpgrade = {
          ...dUpgrade, 
          level: dUpgrade.level + 1,
          initialPrice: prices[dUpgrade.level + 1], 
        }
        const increase = (100 + prices[dUpgrade.level])/100
        const decrease = (100 - prices[dUpgrade.level])/100
        switch (id){
          case 1:
            setPriceMultiplier(decrease)
            break;
          case 2:
            setIncreaseMultiplier(increase)
            break;
          case 3:
            setCooldwonDiscount(decrease)
            break;
          case 4:
            setMaxDelay(maxDelay * decrease)
            setMinDelay(minDelay * decrease)
            break;
          case 5:
            setMultiplier(multiplier * increase)
            break;
        }
        return updatedDUpgrade;
      }
      return dUpgrade;
    })

    setDiamondUpgrades(updatedDUpgrades); 
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
          />
        ))}
      </div>
    </div>
  );
}

export default Upgrades;