import React from 'react';
import '../../css/DnkUpgrade.css';
import { useStatsContext } from '../main/StatsContext'; // Кастомный хук для StatsContext
import { useUIContext } from '../main/UIContext'; // Кастомный хук для UIContext

function DnkUpgrade({
  id,
  img,
  benefit,
  onUpgradeLevelChange,
}) {
  // Используем кастомный хук для доступа к данным из StatsContext
  const {
    counters: { countDnk },
  } = useStatsContext();

  // Используем кастомный хук для доступа к данным из UIContext
  const {
    tooltip: { setTooltipPosition, setIsDnkHovered },
  } = useUIContext();

  const handleMouseEnter = (event) => {
    const cardRect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      right: window.innerWidth - cardRect.right - 30,
      top: 460,
      id: id,
    });
    setIsDnkHovered(true);
  };

  const handleMouseLeave = () => {
    setIsDnkHovered(false);
  };

  const handleUpgradeClick = () => {
    if (countDnk >= 1n) {
      onUpgradeLevelChange(id);
    }
  };

  return (
    <div
      className='DnkUpgrade'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleUpgradeClick}
    >
      <img className='DnkUpgrade__img' src={img} alt="" />
    </div>
  );
}

export default DnkUpgrade;