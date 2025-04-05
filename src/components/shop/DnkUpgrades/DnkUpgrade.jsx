import React from 'react';
import '../../../css/DnkUpgrade.css';
import { useShopContext } from '../../main/contexts/ShopContext'; 
import { useUIContext } from '../../main/contexts/UIContext'; 

function DnkUpgrade({
  id,
  img,
}) {

  const {
    tooltip: { handleTooltipMouseEnter, handleTooltipMouseLeave },
  } = useUIContext();

  const {
    dnk: { useDnkLevelChange },
  } = useShopContext();

  const handleDnkLevelChange = useDnkLevelChange(id)

  return (
    <div
      className='DnkUpgrade'
      onMouseEnter={(event) => handleTooltipMouseEnter(event, id, 'dnk')}
      onMouseLeave={handleTooltipMouseLeave}
      onClick={handleDnkLevelChange}
    >
      <img className='DnkUpgrade__img' src={img} alt="" />
    </div>
  );
}

export default DnkUpgrade;