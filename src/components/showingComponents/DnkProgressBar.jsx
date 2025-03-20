import React, { useEffect, useContext, useState } from 'react';
import { AppContext } from '../main/AppContext.jsx';
import abbreviateNum from '../../js/numberAbbreviator.js';
import '../../css/DnkProgressBar.css';

function DnkProgressBar() {
  const { pasIncreaseMoney, countDnk } = useContext(AppContext);
  const [progressForShow, setProgressForShow] = useState(0);
  const [requiredPasIncrease, setRequiredPasIncrease] = useState(1n);

  useEffect(() => {

    const divisor = 1000000000000000000n;
    const nextDnkLevel = countDnk + 1n;
    const prevRequiredPasIncrease = BigInt(3n ** countDnk * divisor - 1n);
    const newRequiredPasIncrease = 3n ** nextDnkLevel * divisor;

    setRequiredPasIncrease(newRequiredPasIncrease);

    const curProgressForShow = Number(
      ((pasIncreaseMoney - prevRequiredPasIncrease) * 100n) / 
      (newRequiredPasIncrease - prevRequiredPasIncrease)
    );

    setProgressForShow(curProgressForShow);
  }, [pasIncreaseMoney, countDnk]);

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