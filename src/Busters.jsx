import React, { useState, useEffect,  useContext } from 'react';
import './css/Busters.css';
import Buster from './Buster.jsx';

import { AppContext } from './main/AppContext.jsx';

function Busters({onIncreaseDiamond}){  
  const{
    setBusters,
    busters,
    cooldwonDiscount,
  } = useContext(AppContext);

  useEffect(() => {
     const updatedBusters = busters.map((buster) => {
      const updatedBuster = {
        ...buster, 
        cooldown:  buster.cooldown * cooldwonDiscount , 
      }
      return updatedBuster;  
    })

    setBusters(updatedBusters); 
  }, [cooldwonDiscount]);


  const handleBusterLevelChange = (id) => {
    const updatedBusters = busters.map((buster) => {
      if (buster.id === id) {
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
          />
        ))}
      </div>
    </div>
  );
}

export default Busters;