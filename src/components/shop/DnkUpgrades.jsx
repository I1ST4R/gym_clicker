import React, { useEffect } from 'react';
import '../../css/DnkUpgrades.css';
import DnkUpgrade from './DnkUpgrade.jsx';
import { useStatsContext } from '../main/StatsContext'; // Кастомный хук для StatsContext
import { useShopContext } from '../main/ShopContext'; // Кастомный хук для ShopContext

function DnkUpgrades() {
  // Используем кастомный хук для доступа к данным из StatsContext
  const {
    counters: { countDnk, setCountDnk },
    delay: { minDelay, setMinDelay, maxDelay, setMaxDelay },
  } = useStatsContext();

  // Используем кастомный хук для доступа к данным из ShopContext
  const {
    dnk: {
      dnkUpgrades,
      setDnkUpgrades,
      multiplier,
      setMultiplier,
      priceMultiplier,
      setPriceMultiplier,
      increaseMultiplier,
      setIncreaseMultiplier,
      cooldownDiscount,
      setCooldownDiscount,
    },
  } = useShopContext();

  const handleUpgradeLevelChange = (id) => {
    const updatedDnkUpgrades = dnkUpgrades.map((dnkUpgrade) => {
      if (dnkUpgrade.id === id) {
        setCountDnk(countDnk - 1n);
        const updatedDUpgrade = {
          ...dnkUpgrade,
          level: dnkUpgrade.level + 1,
        };
        let increase = Math.pow(1.01, dnkUpgrade.level);
        let decrease = Math.pow(0.99, dnkUpgrade.level);
        switch (id) {
          case 1:
            setPriceMultiplier(decrease);
            break;
          case 2:
            setIncreaseMultiplier(increase);
            break;
          case 3:
            setCooldownDiscount(decrease);
            break;
          case 4:
            setMaxDelay(Math.floor(maxDelay * 0.99));
            setMinDelay(Math.floor(minDelay * 0.99));
            break;
          case 5:
            setMultiplier(multiplier * 1.01);
            break;
          default:
            break;
        }
        return updatedDUpgrade;
      }
      return dnkUpgrade;
    });

    setDnkUpgrades(updatedDnkUpgrades);
  };

  return (
    <div className="DnkUpgrades">
      <div className="DnkUpgrades__counter">
        {countDnk.toString()}
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