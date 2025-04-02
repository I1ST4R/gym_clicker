import React, { useState, useEffect } from 'react';
import '../../css/Trainer.css';
import moneyClick from '../../../public/sounds/moneyClick.mp3';
import Coin from './Coin';
import { useStatsContext } from '../main/contexts/StatsContext'; 
import { useUIContext } from '../main/contexts/UIContext'; 

function Trainer({}) {
  const {trainerImage: { trainerImage }} = useUIContext();

  const {counters: {incrementCountMoneyForClick}} = useStatsContext();

  const [isJumping, setIsJumping] = useState(false);
  const [coins, setCoins] = useState([]);

  const handleClick = (event) => {
    setIsJumping(true);
    incrementCountMoneyForClick();

    new Audio(moneyClick).play();

    const clickX = event.clientX;
    const clickY = event.clientY;
    const newCoin = {
      id: Date.now(),
      x: clickX,
      y: clickY,
    };
    setCoins((prevCoins) => [...prevCoins, newCoin]);

    setTimeout(() => {
      setIsJumping(false);
    }, 300);
  };

  const removeCoin = (id) => {
    setCoins((prevCoins) => prevCoins.filter((coin) => coin.id !== id));
  };

  return (
    <div className="Trainer" onClick={handleClick}>
      <img
        className={`Trainer__img ${isJumping ? 'Trainer--jump' : ''}`}
        src={trainerImage}
        alt=""
      />

      {coins.map((coin) => (
        <Coin
          key={coin.id}
          id={coin.id}
          startX={coin.x}
          startY={coin.y}
          onComplete={removeCoin}
        />
      ))}
    </div>
  );
}

export default Trainer;