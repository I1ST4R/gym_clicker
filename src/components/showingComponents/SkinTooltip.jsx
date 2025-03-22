import React from 'react';
import { useUIContext } from '../main/UIContext';

function SkinTooltip() {
  const {
    tooltip: { tooltipContent },
  } = useUIContext();

  return (
    <>
      <p>{tooltipContent.desc}</p>
      {!tooltipContent.isBuyed && (
        <p className="Tooltip__price-info">
          {`Цена: ${tooltipContent.price}`}
        </p>
      )}
    </>
  );
}

export default SkinTooltip;