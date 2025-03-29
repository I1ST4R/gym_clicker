import React, { useEffect, useState } from 'react';
import { useUIContext } from '../main/contexts/UIContext';
import abbreviateNum from '../../js/numberAbbreviator.js';
import { useStatsContext } from '../main/contexts/StatsContext'; 
import '../../css/DnkProgressBar.css';

function DnkProgressBar() {
  const { calculateProgress } = useUIContext();
  const {counters: { countDnk }} = useStatsContext();

  const { progressForShow, requiredPasIncrease } = calculateProgress();

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