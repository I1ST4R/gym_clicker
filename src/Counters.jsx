import React, { useState, useEffect } from 'react';
import './css/Counters.css'; 
import abbreviateNum from './js/numberAbbreviator.js';

function Counter({ countMoney, pasIncreaseMoney, countDiamond }) {

  const [hasDiamondBeenPositive, setHasDiamondBeenPositive] = useState(false);
  const [hasPasIncreaseMoneyBeenPositive, setHasPasIncreaseMoneyBeenPositive] = useState(false);


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
    <div className="Counters">
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

export default Counter;