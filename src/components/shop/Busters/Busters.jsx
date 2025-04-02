import React from 'react';
import '../../../css/slide.css';
import Buster from './Buster.jsx';
import { useShopContext } from '../../main/contexts/ShopContext.jsx';

function Busters() {
  const {
    busters: { busters},
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