import React from 'react';
import '../../css/slide.css';
import Upgrade from './Upgrade.jsx';
import { useStatsContext } from '../main/StatsContext'; 
import { useShopContext } from '../main/ShopContext'; 

function Upgrades() {
  const {
    increases: { pasIncreaseMoney, setPasIncreaseMoney, actIncreaseMoney, setActIncreaseMoney },
  } = useStatsContext();

  const {
    upgrades: { upgrades, setUpgrades },
    dnk: { increaseMultiplier },
    busters: { setIsDiscountExists },
  } = useShopContext();

  const handleUpgradeLevelChange = (id) => {
    setIsDiscountExists(false);
    const updatedUpgrades = upgrades.map((upgrade) => {
      if (upgrade.id === id) {
        const isSmallNumber = upgrade.id < 7;
        const difference = !upgrade.isIncreaseMoney ? 0.035 : 0;
        let newIncrease, newPrice, BigIntInc, updatedUpgrade;

        if (isSmallNumber) {
          BigIntInc = BigInt(Math.floor(upgrade.initialIncrease * increaseMultiplier));
          newIncrease = upgrade.initialIncrease * (1.15 - difference) * increaseMultiplier;
          newPrice = upgrade.initialPrice * 1.16;
        } else {
          BigIntInc = (upgrade.initialIncrease / 100n) * BigInt(Math.floor(increaseMultiplier * 100));
          let diffMultiplier = BigInt(Math.ceil((1.15 - difference) * 100));
          newIncrease = (upgrade.initialIncrease / 100n) * diffMultiplier;
          newPrice = (upgrade.initialPrice / 100n) * 116n;
        }

        upgrade.isIncreaseMoney
          ? setActIncreaseMoney(actIncreaseMoney + BigIntInc)
          : setPasIncreaseMoney(pasIncreaseMoney + BigIntInc);

        updatedUpgrade = {
          ...upgrade,
          level: upgrade.level + 1,
          initialIncrease: newIncrease,
          initialPrice: newPrice,
        };

        return updatedUpgrade;
      }
      return upgrade;
    });

    setUpgrades(updatedUpgrades);
  };

  return (
    <div className="slide">
      <div className="slide__title">
        <p>Улучшения</p>
      </div>
      <div className="slide__flex-container">
        {upgrades.map((upgrade) => (
          <Upgrade
            key={upgrade.id}
            {...upgrade}
            onUpgradeLevelChange={handleUpgradeLevelChange}
          />
        ))}
        <div className="slide__space"></div>
      </div>
    </div>
  );
}

export default Upgrades;