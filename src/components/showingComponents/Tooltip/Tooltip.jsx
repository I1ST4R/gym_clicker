import React, { useEffect } from 'react';
import '../../../css/Tooltip.css';
import { useStatsContext } from '../../main/contexts/StatsContext';
import { useShopContext } from '../../main/contexts/ShopContext';
import { useUIContext } from '../../main/contexts/UIContext';
import SkinTooltip from './SkinTooltip';
import DnkTooltip from './DnkTooltip';
import BustersTooltip from './BustersTooltip';
import CountersTooltip from './CountersTooltip';
import UpgradesTooltip from './UpgradesTooltip';

function Tooltip({ position }) {
  const {
    counters: { countDnk },
  } = useStatsContext();
  const {
    upgrades: { upgrades },
    busters: { busters },
    dnk: { dnkUpgrades, increaseMultiplier },
    skins: { diamondPurchases },
  } = useShopContext();
  const {
    tooltip: { isUpgradeHovered, isDnkHovered, setIsDnkHovered, tooltipPosition, tooltipType, isBusterHovered, isCounterHovered, isSkinHovered, updateTooltipContent },
  } = useUIContext();

  useEffect(() => {
    if (countDnk === 0n) setIsDnkHovered(false);
    updateTooltipContent(upgrades, busters, dnkUpgrades, diamondPurchases, increaseMultiplier);
  }, [isUpgradeHovered, isDnkHovered, isBusterHovered, isCounterHovered, isSkinHovered]);

  if (isDnkHovered && countDnk === 0n) return null;

  return (
    <div
      className="Tooltip"
      style={{
        top: `${tooltipPosition.top}px`,
        right: `${tooltipPosition.right}px`,
        width: tooltipType === "Counters" ? "300px" : "",
      }}
    >
      {tooltipType === 'Skin' && <SkinTooltip />}
      {tooltipType === 'Dnk' && <DnkTooltip />}
      {tooltipType === 'Busters' && <BustersTooltip />}
      {tooltipType === 'Counters' && <CountersTooltip />}
      {tooltipType === 'Upgrades' && <UpgradesTooltip />}
    </div>
  );
}

export default Tooltip;