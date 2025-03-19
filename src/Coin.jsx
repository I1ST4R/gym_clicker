import React, { useEffect, useRef } from 'react';
import './css/Coin.css';

function Coin({ id, startX, startY, onComplete }) {
  const coinRef = useRef(null);

  useEffect(() => {
    const coin = coinRef.current;

    coin.style.left = `${startX - (window.innerWidth/2 - 130)}px`;
    coin.style.top = `${startY - (window.innerHeight/2 - 110)}px`;
    coin.classList.add('Money--animate');
    const handleAnimationEnd = () => {
      onComplete(id); 
    };

    coin.addEventListener('animationend', handleAnimationEnd);

    return () => {
      coin.removeEventListener('animationend', handleAnimationEnd);
    };
  }, [id, startX, startY, onComplete]);

  return (
    <div className="Money" ref={coinRef}>
      <img src="money.png" alt="Coin" />
    </div>
  );
}

export default Coin;