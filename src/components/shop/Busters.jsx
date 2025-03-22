import React from 'react';
import '../../css/slide.css';
import Buster from './Buster.jsx';
import { useStatsContext } from '../main/StatsContext';
import { useShopContext } from '../main/ShopContext';

function Busters() {
  const {
    counters: { setCountMoney },
    increases: { pasIncreaseMoney, setPasIncreaseMoney, actIncreaseMoney, setActIncreaseMoney },
  } = useStatsContext();
  const {
    busters: { busters, handleBusterLevelChange, handleActivateBuster},
  } = useShopContext();

  return (
    <div className="slide">
      <div className="slide__title">
        <p>Бустеры</p>
      </div>
      <div className="slide__flex-container">
        {busters.map((buster) => (
          <Buster
            key={buster.id}
            {...buster} 
          />
        ))}
      </div>
    </div>
  );
}

export default Busters;