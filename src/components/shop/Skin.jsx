import React, { useContext } from 'react';
import '../../css/Skin.css';
import { AppContext } from '../main/AppContext.jsx';

function Skin({
  id,
  img,
  price,
  isActive,
  isBuyed,
  onActivate,
  onBuy
}) {
  const {
    countDiamond,
    setTooltipPosition,
    setIsSkinHovered,
    tooltipPosition,
  } = useContext(AppContext);

  const isEnoughtDiamonds = countDiamond >= price;

  const handleSkinClick = () => {
    if (isBuyed) {
      onActivate(id);
    } else if (isEnoughtDiamonds) {
      onBuy(id);
    }
  };

  const handleMouseEnter = (event) => {
    const cardRect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      top: cardRect.top,
      id: id,
    });
    setIsSkinHovered(true);
  };

  const handleMouseLeave = () => {
    setIsSkinHovered(false);
  };

  return (
    <div 
      className={`Skin ${isActive ? "Skin--active" : ""}`}
      onClick={handleSkinClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img className='Skin__img' src={img} alt="" /> 
    </div>
  );
}

export default Skin;