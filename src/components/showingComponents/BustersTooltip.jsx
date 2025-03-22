import React from 'react';
import { useUIContext } from '../main/UIContext';

function BustersTooltip() {
  const {
    tooltip: { tooltipContent },
  } = useUIContext();

  return (
    <>
      <p>{tooltipContent.desc}</p>
      <p className="Tooltip__upgrade-info">
        {`Улучшение: ${tooltipContent.upgradeInfo}`}
      </p>
      <p className="Tooltip__benefit">
        {`Эффект: ${tooltipContent.benefit}`}
      </p>
    </>
  );
}

export default BustersTooltip;