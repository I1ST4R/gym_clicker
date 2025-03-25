import React from 'react';
import '../../../css/slide.css';
import Upgrade from './Upgrade.jsx';
import { useShopContext } from '../../main/contexts/ShopContext.jsx';

function Upgrades() {
  const {
    upgrades: { upgrades },
  } = useShopContext();

  return (
    <div className="slide">
      <div className="slide__title">
        <p>Улучшения</p>
      </div>
      <div className="slide__flex-container">
        {upgrades.map((upgrade) => (
          <Upgrade
            key={upgrade.id}
            {...upgrade}
          />
        ))}
        <div className="slide__space"></div>
      </div>
    </div>
  );
}

export default Upgrades;