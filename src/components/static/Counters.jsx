import React, { useEffect, useState } from 'react';
import '../../css/Counters.css';
import abbreviateNum from '../../js/numberAbbreviator.js';
import { useStatsContext } from '../main/StatsContext';
import { useUIContext } from '../main/UIContext';
import { getCountersData } from '../../js/CountersParams.js'; 

function Counters() {
  const {
    counters: { countDiamond, countMoney },
    increases: { pasIncreaseMoney },
  } = useStatsContext();

  const {
    tooltip: { handleTooltipMouseEnter, handleTooltipMouseLeave },
  } = useUIContext();

  const [diamondPositive, setDiamondPositive] = useState(false);
  const [pasPositive, setPasPositive] = useState(false);

  useEffect(() => {
    if (countDiamond > 0) setDiamondPositive(true);
  }, [countDiamond]);

  useEffect(() => {
    if (pasIncreaseMoney > 0) setPasPositive(true);
  }, [pasIncreaseMoney]);

  const counters = getCountersData(countDiamond, pasIncreaseMoney, countMoney, diamondPositive, pasPositive);

  return (
    <div
      className="Counters"
      onMouseEnter={(event) => handleTooltipMouseEnter(event, 1, 'counter')}
      onMouseLeave={handleTooltipMouseLeave}
    >
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
  );
}

export default Counters;