import React, { useEffect } from 'react';
import '../../../css/slide.css';
import Skin from './Skin.jsx';
import { useStatsContext } from '../../main/contexts/StatsContext.jsx'; 
import { useShopContext } from '../../main/contexts/ShopContext.jsx'; 

function Skins() {
  const {
    counters: { countDiamond, setCountDiamond },
  } = useStatsContext();

  const {
    skins: {
      diamondPurchases,
      handleActivate,
      handleBuy,
    },
  } = useShopContext();

  return (
    <div className="slide">
      <div className="slide__title">
        <p>Облики</p>
      </div>
      <div className="slide__grid-container">
        {diamondPurchases.map((upgrade) => (
          <Skin
            key={upgrade.id}
            {...upgrade}
          />
        ))}
      </div>
    </div>
  );
}

export default Skins;