import React, { useEffect, useState } from 'react';
import '../../../css/Skin.css';
import { useStatsContext } from '../../main/contexts/StatsContext';
import { useUIContext } from '../../main/contexts/UIContext';
import { useShopContext } from '../../main/contexts/ShopContext';

function Skin({
  id,
  img,
  isActive,
  isBuyed,
}) {
  const {
    tooltip: { handleTooltipMouseEnter, handleTooltipMouseLeave },
  } = useUIContext();
  const {
    skins: { useSkinActivate, useSkinBuy, useSkinStyles, diamondPurchases },
  } = useShopContext();

  const handleActivate = useSkinActivate()
  const handleBuy = useSkinBuy()
  useSkinStyles()

  const handleSkinClick = () => {
    if (isBuyed) {
      handleActivate(id)
      return
    }
    handleBuy(id)
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