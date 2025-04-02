import React, { useEffect, useState } from 'react';
import '../../css/Counters.css';
import abbreviateNum from '../../js/numberAbbreviator.js';
import DnkProgressBar from '../showingComponents/DnkProgressBar';
import { useStatsContext } from '../main/contexts/StatsContext';
import { useUIContext } from '../main/contexts/UIContext';
import { getCountersParams } from '../../js/CountersParams.js'; 

function Counters() {
  const {
    counters: { countDiamond, countMoney, countDnk },
    increases: { pasIncreaseMoney },
  } = useStatsContext();

  const {
    tooltip: { 
      handleTooltipMouseEnter, 
      handleTooltipMouseLeave, 
      diamondPositive, setDiamondPositive,
      pasPositive, setPasPositive},
  } = useUIContext();

  useEffect(() => { countDiamond > 0 ? setDiamondPositive(true): "" }, [countDiamond]);
  useEffect(() => { pasIncreaseMoney > 0 ? setPasPositive(true): "" }, [pasIncreaseMoney]);

  const counters = getCountersParams(countDiamond, pasIncreaseMoney, countMoney, diamondPositive, pasPositive);

  return (
    <div
      className="Counters"
      onMouseEnter={(event) => handleTooltipMouseEnter(event, 1, 'counter')}
      onMouseLeave={handleTooltipMouseLeave}
    >
      <div className="Counters__container">
        {counters.map(
          ({ value, img, condition }, index) =>
            condition && (
              <div className="Counter" key={index}>
                <span>{abbreviateNum(value)}</span>
                <img className="Counter__img" src={img} alt="" />
              </div>
            )
        )}
      </div>
      {(countDnk !== 0n) &&
        <DnkProgressBar />
      }
    </div>
  );
}

export default Counters;