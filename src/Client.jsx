import React, { useEffect, useState } from 'react';
import './css/Client.css';
import ClientsAfter from './js/ClientsAfter.js';
import ClientsBefore from './js/ClientsBefore.js';
import clientClick from '../public/sounds/clientClick.mp3';
import clientUpgrade from '../public/sounds/clientUpgrade.mp3';
import clientThanksgiving from '../public/sounds/clientThanksgiving.mp3';
import abbreviateNum from './js/numberAbbreviator.js';

function Client({
  minDelay,
  maxDelay,
  numOfClicks,
  waitingTime,
  onCounterMoneyChange,
  countMoney,
  pasIncreaseMoney,
  actIncreaseMoney,
  multiplier,
}) {
  const [image, setImage] = useState('');
  const [progress, setProgress] = useState(0);
  const [isClientUpgraded, setIsClientUpgraded] = useState(() => {
    const savedIsClientUpgraded = localStorage.getItem('isClientUpgraded');
    return savedIsClientUpgraded === 'true';
  });
  const [x, setX] = useState(0); 
  const [y, setY] = useState(0);
  const [isVisible, setIsVisible] = useState(false); 

  useEffect(() => {
    localStorage.setItem('isClientUpgraded', isClientUpgraded.toString());
  }, [isClientUpgraded]);



  const step = Math.floor(100 / numOfClicks);

  function getRandomRange(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
 
  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
    });
  };
  
  useEffect(() => {
    const randomDelay = getRandomRange(minDelay, maxDelay);
  
    const timer = setTimeout(async () => {
      const randomIndex = Math.floor(Math.random() * ClientsBefore.length);
      try {
        const loadedImage = await loadImage(ClientsBefore[randomIndex]);
        setImage(loadedImage.src);
      } catch (error) {
        console.error("Error loading image:", error);
      }
      const client = document.querySelector(".Client")
      const clientRect = client.getBoundingClientRect()
      const menu = document.querySelector(".slider-container")
      const menuRect = menu.getBoundingClientRect()
      setX(getRandomRange(50, window.innerWidth - clientRect.width - menuRect.width - 50))
      setY(getRandomRange(50 , window.innerHeight - clientRect.height - 50))
      setIsVisible(true);
      setIsClientUpgraded(false);
      setProgress(0);
      setTimeout(() => { 
        const client = document.querySelector(".Client")
        client.style.top = "-300px"
        setIsVisible(false) 
      }, waitingTime);

    }, randomDelay);
  
    return () => clearTimeout(timer);
  }, [isVisible]);

  const handleClick = () => {
    if (!isClientUpgraded) {
      if (100 - progress <= step) {
        new Audio(clientUpgrade).play();
        const randomIndex = Math.floor(Math.random() * ClientsAfter.length)
        setImage(ClientsAfter[randomIndex]);
        setIsClientUpgraded(true);
        new Audio(clientThanksgiving).play();
        setTimeout(() => { setIsVisible(false)}, 2000)
        const bonus = Math.floor((pasIncreaseMoney +actIncreaseMoney) * multiplier)
        onCounterMoneyChange(countMoney + bonus)
      }
      new Audio(clientClick).play();
      setProgress((prevProgress) => prevProgress + step);
    }
  };

  return (
    <div
      className="Client"
      onClick={handleClick}
      style={{
        top: `${y}px`,
        left: `${x}px`,
        opacity: isVisible ? 1 : 0,  
      }}
    >
      {isClientUpgraded?(
        <div className = "Client__bonus">
          <p>
            {`+${abbreviateNum(Math.floor((pasIncreaseMoney +actIncreaseMoney) * multiplier))}`} 
          </p>
          <img className="Client__money" src="money.png" alt="" />
        </div>
      ):
      (<></>)}
      <img className = "Client__img" src={image} alt="" />
      <div
        className="Client__progressbar"
        style={isClientUpgraded ? { display: 'none' } : {}}
      >
        <div className="Client__progress" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}

export default Client;