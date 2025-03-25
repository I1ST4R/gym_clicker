import React from 'react';
import '../../../css/Skin.css';
import { useStatsContext } from '../../main/contexts/StatsContext';
import { useUIContext } from '../../main/contexts/UIContext';
import { useShopContext } from '../../main/contexts/ShopContext';

function Skin({
  id,
  img,
  price,
  isActive,
  isBuyed,
}) {
  const {
    counters: { countDiamond, setCountDiamond },
  } = useStatsContext();
  const {
    tooltip: { handleTooltipMouseEnter, handleTooltipMouseLeave },
  } = useUIContext();
  const {
    skins: { handleActivate, handleBuy },
  } = useShopContext();

  const isEnoughtDiamonds = countDiamond >= BigInt(price);

  const handleSkinClick = () => {
    if (isBuyed) {
      handleActivate(id); 
    } else if (isEnoughtDiamonds) {
      handleBuy(id, countDiamond, setCountDiamond); 
    }
  };

  return (
    <div 
      className={`Skin ${isActive ? "Skin--active" : ""}`}
      onClick={handleSkinClick}
      onMouseEnter={(event) => handleTooltipMouseEnter(event, id, 'skin')}
      onMouseLeave={handleTooltipMouseLeave}
    >
      <img className='Skin__img' src={img} alt="" /> 
    </div>
  );
}

export default Skin;