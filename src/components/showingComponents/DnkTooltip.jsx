import React from 'react';
import { useUIContext } from '../main/UIContext';

function DnkTooltip() {
  const {
    tooltip: { tooltipContent },
  } = useUIContext();

  return <p>{tooltipContent.benefit}</p>;
}

export default DnkTooltip;