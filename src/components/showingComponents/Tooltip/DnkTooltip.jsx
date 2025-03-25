import React from 'react';
import { useUIContext } from '../../main/contexts/UIContext';

function DnkTooltip() {
  const {
    tooltip: { tooltipContent },
  } = useUIContext();

  return <p>{tooltipContent.benefit}</p>;
}

export default DnkTooltip;