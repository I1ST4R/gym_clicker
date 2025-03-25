import React from 'react';
import '../../../css/DnkUpgrade.css';
import { useStatsContext } from '../../main/contexts/StatsContext'; 
import { useUIContext } from '../../main/contexts/UIContext'; 

function DnkUpgrade({
  id,
  img,
  onUpgradeLevelChange,
}) {
  const {
    counters: { countDnk },
  } = useStatsContext();
  const {
    tooltip: { handleTooltipMouseEnter, handleTooltipMouseLeave },
  } = useUIContext();

  const handleUpgradeClick = () => {
    if (countDnk >= 1n) {
      onUpgradeLevelChange(id);
    }
  };

  return (
    <div
      className='DnkUpgrade'
      onMouseEnter={(event) => handleTooltipMouseEnter(event, id, 'dnk')}
      onMouseLeave={handleTooltipMouseLeave}
      onClick={handleUpgradeClick}
    >
      <img className='DnkUpgrade__img' src={img} alt="" />
    </div>
  );
}

export default DnkUpgrade;