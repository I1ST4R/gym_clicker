import React, { useState, useEffect } from 'react';
import './css/Busters.css';
import Buster from './Buster.jsx';

function Busters({ 
  onLevelTrainerChange, 
  onCounterMoneyChange, 
  countMoney,
  onPasIncreaseMoneyChange,
  pasIncreaseMoney,
  onActIncreaseMoneyChange,
  actIncreaseMoney,
  onCounterBustersChange,
  busters: propBusters, 
  onIsDiscountExistsChange,
  onIncreaseDiamond,
  cooldwonDiscount,
  onTooltipPositionChange,
  onIsBusterHoveredChange,
 }) {

  const [busters, setBusters] = useState(() => {
    const savedBusters = localStorage.getItem('busters');
    return savedBusters ? JSON.parse(savedBusters) : propBusters;
  });

  useEffect(() => {
    localStorage.setItem('busters', JSON.stringify(busters));
  }, [busters]);

  useEffect(() => {
     const updatedBusters = busters.map((buster) => {
      const updatedBuster = {
        ...buster, 
        cooldown:  buster.cooldown * cooldwonDiscount , 
      }
      return updatedBuster;  
    })

    setBusters(updatedBusters); 
    onCounterBustersChange(updatedBusters);
  }, [cooldwonDiscount]);


  const handleBusterLevelChange = (id) => {
    const updatedBusters = busters.map((buster) => {
      if (buster.id === id) {
        onIncreaseDiamond()
        const isFirstLevel = buster.level === 0; 
        const updatedBuster = {
          ...buster, 
          level: buster.level + 1,
          initialPrice: buster.initialPrice * 1.16,
          cooldown: isFirstLevel ? buster.cooldown : buster.cooldown * 0.93, 
        }
        return updatedBuster;
      }
      return buster;
    })

    setBusters(updatedBusters); 
    onCounterBustersChange(updatedBusters); 
  };

  return (
    <div className="Busters">
      <div className="Busters__title">
        <p>Бустеры</p>
      </div>
      <div className="Busters__container">
        {busters.map((buster) => (
          <Buster
            key={buster.id}
            {...buster}
            onBusterLevelChange={handleBusterLevelChange}
            onLevelTrainerChange={onLevelTrainerChange}
            onCounterMoneyChange={onCounterMoneyChange}
            countMoney={countMoney}
            onPasIncreaseMoneyChange={onPasIncreaseMoneyChange}
            pasIncreaseMoney={pasIncreaseMoney}
            onActIncreaseMoneyChange={onActIncreaseMoneyChange}
            actIncreaseMoney={actIncreaseMoney}
            onIsDiscountExistsChange={onIsDiscountExistsChange}
            onIsBusterHoveredChange={onIsBusterHoveredChange}
            onTooltipPositionChange={onTooltipPositionChange}
          />
        ))}
      </div>
    </div>
  );
}

export default Busters;