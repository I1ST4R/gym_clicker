import React, { useState, useEffect, useContext } from 'react';
import './css/DnkUpgrades.css';
import DnkUpgrade from './DnkUpgrade.jsx';

import { AppContext } from './main/AppContext.jsx';

function DnkUpgrades({ }) {
  const {
    setMaxDelay,
    maxDelay,
    setMinDelay,
    minDelay,
    setMultiplier,
    multiplier,
    setDnkUpgrades,
    countDnk,
    setCountDnk,
    dnkUpgrades,
    setPriceMultiplier,
    setIncreaseMultiplier,
    setCooldwonDiscount,
  } = useContext(AppContext);

  const handleUpgradeLevelChange = (id) => {
    const updatedDnkUpgrades = dnkUpgrades.map((dnkUpgrade) => {

      if (dnkUpgrade.id === id) {
        setCountDnk(countDnk - 1n)
        const updatedDUpgrade = {
          ...dnkUpgrade,
          level: dnkUpgrade.level + 1,
        }
        let increase = Math.pow(1.01, dnkUpgrade.level)
        let decrease = Math.pow(0.99, dnkUpgrade.level)
        switch (id) {
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
            setMaxDelay(Math.floor(maxDelay * 0.99))
            setMinDelay(Math.floor(minDelay * 0.99))
            break;
          case 5:
            setMultiplier(multiplier * 1.01)
            break;
        }
        return updatedDUpgrade;
      }
      return dnkUpgrade;
    })

    setDnkUpgrades(updatedDnkUpgrades);
  };

  return (
    <div className="DnkUpgrades">
      <div className="DnkUpgrades__counter">
        {countDnk}
        <img src="dnk.png" alt="" />
      </div>
      <p className="DnkUpgrades__title">Мутации</p>
      <p>Вы заработали очки ДНК за предыдущую игру. Потратьте их перед началом следующей.</p>
      <p className="DnkUpgrades__small-txt">(Все улучшения стоят по одному очку днк)</p>
      <div className="DnkUpgrades__container">
        {dnkUpgrades.map((dnkUpgrade) => (
          <DnkUpgrade
            key={dnkUpgrade.id}
            {...dnkUpgrade}
            onUpgradeLevelChange={handleUpgradeLevelChange}
          />
        ))}
      </div>


    </div>
  );
}

export default DnkUpgrades;