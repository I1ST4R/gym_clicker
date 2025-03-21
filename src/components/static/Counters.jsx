import React, { useEffect, useState } from 'react';
import '../../css/Counters.css';
import abbreviateNum from '../../js/numberAbbreviator.js';
import { useStatsContext } from '../main/StatsContext'; // Кастомный хук для StatsContext
import { useUIContext } from '../main/UIContext'; // Кастомный хук для UIContext

function Counters() {
  // Используем кастомный хук для доступа к данным из StatsContext
  const {
    counters: { countDiamond, countMoney },
    increases: {pasIncreaseMoney}
  } = useStatsContext();

  // Используем кастомный хук для доступа к данным из UIContext
  const {
    tooltip: { setTooltipPosition, setIsCounterHovered },
  } = useUIContext();

  const [hasDiamondBeenPositive, setHasDiamondBeenPositive] = useState(false);
  const [hasPasIncreaseMoneyBeenPositive, setHasPasIncreaseMoneyBeenPositive] = useState(false);

  const handleMouseEnter = (event) => {
    const cardRect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      top: cardRect.top,
      id: 1,
    });
    setIsCounterHovered(true);
  };

  const handleMouseLeave = () => {
    setIsCounterHovered(false);
  };

  useEffect(() => {
    if (countDiamond > 0) {
      setHasDiamondBeenPositive(true);
    }
  }, [countDiamond]);

  useEffect(() => {
    if (pasIncreaseMoney > 0) {
      setHasPasIncreaseMoneyBeenPositive(true);
    }
  }, [pasIncreaseMoney]);

  return (
    <div
      className="Counters"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {(hasDiamondBeenPositive || countDiamond > 0) && (
        <div className="Counter">
          <span>{abbreviateNum(countDiamond)}</span>
          <img className="Counter__img" src="diamond.png" alt="" />
        </div>
      )}

      {(hasPasIncreaseMoneyBeenPositive || pasIncreaseMoney > 0) && (
        <div className="Counter">
          <span>{abbreviateNum(pasIncreaseMoney)}</span>
          <img className="Counter__img" src="client.png" alt="" />
        </div>
      )}

      <div className="Counter">
        <span>{abbreviateNum(countMoney)}</span>
        <img className="Counter__img" src="money.png" alt="" />
      </div>
    </div>
  );
}

export default Counters;