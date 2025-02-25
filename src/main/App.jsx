import React, { useState, useEffect } from 'react';
import Trainer from '../Trainer.jsx';
import Counters from '../Counters.jsx';
import Upgrades from '../Upgrades.jsx';
import Client from '../Client.jsx';
import UpgradesParams from '../js/UpgradesParams.js';
import '../css/App.css';

function App() {
 
  const [countMoney, setCountMoney] = useState(() => {
    const savedCountMoney = localStorage.getItem('countMoney');
    return savedCountMoney ? parseInt(savedCountMoney, 10) : 1000000000000;
  });

  const [trainerImage, setTrainerImage] = useState(() => {
    const savedTrainerImage = localStorage.getItem('trainerImage');
    return savedTrainerImage || "src/assets/Trainer/img1.png";
  });

  const [pasIncreaseMoney, setPasIncreaseMoney] = useState(() => {
    const savedPasIncreaseMoney = localStorage.getItem('pasIncreaseMoney');
    return savedPasIncreaseMoney ? parseInt(savedPasIncreaseMoney, 10) : 1000000000;
  });

  const [actIncreaseMoney, setActIncreaseMoney] = useState(() => {
    const savedActIncreaseMoney = localStorage.getItem('actIncreaseMoney');
    return savedActIncreaseMoney ? parseInt(savedActIncreaseMoney, 10) : 1;
  });

  const [resultImages, setResultImages] = useState(() => {
    const savedResultImages = localStorage.getItem('resultImages');
    return savedResultImages ? JSON.parse(savedResultImages) : [];
  });

  const [upgrades, setUpgrades] = useState(() => {
    const savedUpgrades = localStorage.getItem('upgrades');
    return savedUpgrades ? JSON.parse(savedUpgrades) : UpgradesParams;
  });

  useEffect(() => {
    localStorage.setItem('countMoney', countMoney.toString());
  }, [countMoney]);

  useEffect(() => {
    localStorage.setItem('trainerImage', trainerImage);
  }, [trainerImage]);

  useEffect(() => {
    localStorage.setItem('pasIncreaseMoney', pasIncreaseMoney.toString());
  }, [pasIncreaseMoney]);

  useEffect(() => {
    localStorage.setItem('actIncreaseMoney', actIncreaseMoney.toString());
  }, [actIncreaseMoney]);

  useEffect(() => {
    localStorage.setItem('resultImages', JSON.stringify(resultImages));
  }, [resultImages]);



  const incrementCountMoneyForClick = () => {
    setCountMoney(countMoney + actIncreaseMoney);
  };

  useEffect(() => {
    upgrades.forEach((u) => {
      if (u.level === 1 && u.resultImg) {
        setResultImages((prevImages) => [
          ...prevImages,
          {
            src: u.resultImg,
            x: u.resultImgPositionX,
            y: u.resultImgPositionY,
            width: u.resultImgWidth,
            height: u.resultImgHeight,
          },
        ]);
      }
    });
  }, [pasIncreaseMoney, actIncreaseMoney]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountMoney((prevCountMoney) => prevCountMoney + pasIncreaseMoney);
    }, 1000);
    return () => clearInterval(interval);
  }, [pasIncreaseMoney]);

  return (
    <>
      <Client
        minDelay={10000}
        maxDelay={20000}
        numOfClicks={15}
        waitingTime={10000}
        onCounterMoneyChange={setCountMoney}
        countMoney={countMoney}
        pasIncreaseMoney={pasIncreaseMoney}
        actIncreaseMoney={actIncreaseMoney}
      />
      <Trainer trainerImage={trainerImage} onClick={() => incrementCountMoneyForClick()} />
      <Counters countMoney={countMoney} pasIncreaseMoney={pasIncreaseMoney} />
      <Upgrades
        onPasIncreaseMoneyChange={setPasIncreaseMoney}
        pasIncreaseMoney={pasIncreaseMoney}
        onActIncreaseMoneyChange={setActIncreaseMoney}
        actIncreaseMoney={actIncreaseMoney}
        onLevelTrainerChange={(newImage) => setTrainerImage(newImage)}
        onCounterMoneyChange={setCountMoney}
        countMoney={countMoney}
        onCounterUpgradesChange={setUpgrades}
        upgrades={upgrades}
      />
      {resultImages.map((image, index) => (
        <img
          key={index} 
          src={image.src}
          style={{
            position: 'absolute',
            left: `${image.x}px`,
            top: `${image.y}px`,
            width: `${image.width}px`,
            height: `${image.height}px`,
            userSelect: `none`,
            pointerEvents: `none`,
          }}
          alt="Result"
        />
      ))}
    </>
  );
}

export default App;