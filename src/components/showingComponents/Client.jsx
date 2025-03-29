import React from 'react';
import '../../css/Client.css';
import abbreviateNum from '../../js/numberAbbreviator.js';
import { useUIContext } from '../main/contexts/UIContext';

function Client() {
  const {
    image,
    isClientUpgraded,
    isVisible,
    progress,
    position,
    bonus,
    useClientClick,
    useClientSpawn,
  } = useUIContext().client;

  const x = useClientSpawn()

  const y = useClientClick()

  return (
    <div
      ref={x}
      className="Client"
      onClick={y}
      style={{
        top: position ? `${position.y}px` : "0px",
        left: position ? `${position.x}px` : "0px",
        opacity: isVisible ? 1 : 0,
      }}
    >
      {isClientUpgraded && (
        <div className="Client__bonus">
          <p>{`+${abbreviateNum(bonus)}`}</p>
          <img className="Client__money" src="money.png" alt="Money" />
        </div>
      )}
      <img className="Client__img" src={image} alt="Client" />
      {!isClientUpgraded && (
        <div className="Client__progressbar">
          <div className="Client__progress" style={{ width: `${progress}%` }}></div>
        </div>
      )}
    </div>
  );
}

export default Client;