import React from 'react';
import { useStatsContext } from '../../main/contexts/StatsContext';
import { useUIContext } from '../../main/contexts/UIContext';

function CountersTooltip() {
  const {
    counters: { countDnk, countMoney, countDiamond },
    increases: { pasIncreaseMoney }
  } = useStatsContext()

  const {
    tooltip: { diamondPositive, pasPositive },
  } = useUIContext()

  return (
    <>
      <div className="Tooltip__point">
        <img src="money.png" alt="" />
        <p>- основная валюта</p>
      </div>
      {
        (pasPositive) &&
        <div className="Tooltip__point">
          <img src="client.png" alt="" />
          <p>- пассивный доход (в сек.)</p>
        </div>
      }
      {
        (diamondPositive) &&
        <div className="Tooltip__point">
          <img src="diamond.png" alt="" />
          <p>- валюта для покупки обликов </p>
        </div>
      }
      {
        (countDnk > 0) &&
        <div className="Tooltip__point">
          <img src="dnk.png" alt="" />
          <p>- очки ДНК, при окончании игры можно потратить на мутации для последующих игр</p>
        </div>
      }
    </>
  );
}

export default CountersTooltip;