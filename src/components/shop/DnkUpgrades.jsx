import React from 'react';
import '../../css/DnkUpgrades.css';
import DnkUpgrade from './DnkUpgrade.jsx';
import { useStatsContext } from '../main/StatsContext'; 
import { useShopContext } from '../main/ShopContext'; 

function DnkUpgrades() {
  const {
    counters: { countDnk, setCountDnk },
    delay: { minDelay, setMinDelay, maxDelay, setMaxDelay },
  } = useStatsContext();

  const {
    dnk: {
      dnkUpgrades,
      handleDnkLevelChange,
    },
  } = useShopContext();

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
            onUpgradeLevelChange={(id) => handleDnkLevelChange(id, countDnk, setCountDnk, minDelay, setMinDelay, maxDelay, setMaxDelay)}
          />
        ))}
      </div>
    </div>
  );
}

export default DnkUpgrades;