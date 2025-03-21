import React from 'react';
import '../../css/Skin.css';
import { useStatsContext } from '../main/StatsContext'; // Кастомный хук для StatsContext
import { useUIContext } from '../main/UIContext'; // Кастомный хук для UIContext

function Skin({
  id,
  img,
  price,
  isActive,
  isBuyed,
  onActivate,
  onBuy
}) {
  // Используем кастомный хук для доступа к данным из StatsContext
  const {
    counters: { countDiamond },
  } = useStatsContext();

  // Используем кастомный хук для доступа к данным из UIContext
  const {
    tooltip: { setTooltipPosition, setIsSkinHovered },
  } = useUIContext();

  const isEnoughtDiamonds = countDiamond >= BigInt(price);

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