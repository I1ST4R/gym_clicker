import React, { useEffect, useState } from 'react';
import './css/Client.css';
import ClientsAfter from './js/ClientsAfter.js';
import ClientsBefore from './js/ClientsBefore.js';
import clientClick from './assets/sounds/clientClick.mp3';
import clientUpgrade from './assets/sounds/clientUpgrade.mp3';
import clientThanksgiving from './assets/sounds/clientThanksgiving.mp3';

function Client({
  minDelay,
  maxDelay,
  numOfClicks,
  waitingTime,
  incrementCountMoney,
}) {
  const [image, setImage] = useState('');
  const [progress, setProgress] = useState(0);
  const [isClientUpgraded, setIsClientUpgraded] = useState(false);
  const [x, setX] = useState(0); 
  const [y, setY] = useState(0);
  const [isVisible, setIsVisible] = useState(false); 

  const step = Math.floor(100 / numOfClicks);

  const getRandomRange = (min, max) => {
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
      setX(getRandomRange(100, window.innerWidth - 200));
      setY(getRandomRange(100, window.innerHeight - 300));
      setIsVisible(true);
      setIsClientUpgraded(false);
      setProgress(0);
      setTimeout(() => { setIsVisible(false) }, waitingTime);

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
        incrementCountMoney(100); 
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
      <img src={image} alt="" />
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