import React from 'react';
import '../../../css/DnkUpgrades.css';
import DnkUpgrade from './DnkUpgrade.jsx';
import { useStatsContext } from '../../main/contexts/StatsContext.jsx'; 
import { useShopContext } from '../../main/contexts/ShopContext.jsx'; 

function DnkUpgrades() {
  const {
    counters: { countDnk },
  } = useStatsContext();

  const {
    dnk: {dnkUpgrades,},
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
          />
        ))}
      </div>
    </div>
  );
}

export default DnkUpgrades;