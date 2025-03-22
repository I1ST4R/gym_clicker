import React, { useEffect, useState } from 'react';
import { useUIContext } from '../main/UIContext';
import { useStatsContext } from '../main/StatsContext'; // Получаем данные из StatsContext
import abbreviateNum from '../../js/numberAbbreviator.js';
import '../../css/DnkProgressBar.css';

function DnkProgressBar() {
  const { calculateProgress } = useUIContext();
  const {
    counters: { countDnk },
    increases: { pasIncreaseMoney },
  } = useStatsContext();

  const { progressForShow, requiredPasIncrease } = calculateProgress(countDnk, pasIncreaseMoney);

  return (
    <div className="DnkProgressBar">
      <div className="DnkProgressBar__progress-bar-container">
        <div
          className="DnkProgressBar__progress-bar"
          style={{ width: `${progressForShow}%` }}
        />
        <div className="DnkProgressBar__remaining-text">
          {abbreviateNum(requiredPasIncrease)}
        </div>
      </div>
      <div className="DnkProgressBar__counter">
        {countDnk.toString()} <img src="dnk.png" alt="" />
      </div>
    </div>
  );
}

export default DnkProgressBar;