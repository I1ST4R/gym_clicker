import React, { useState, useEffect } from 'react';
import Trainer from '../Trainer.jsx';
import Counters from '../Counters.jsx';
import Busters from '../Busters.jsx';
import Client from '../Client.jsx';
import Upgrades from '../Upgrades.jsx';
import DiamondUpgrades from '../DiamondUpgrades.jsx';
import BustersParams from '../js/BustersParams.js';
import UpgradesParams from '../js/UpgradesParams.js';
import DiamondUpgradesParams from '../js/DiamondUpgradesParams.js';
import '../css/App.css';

function App() {
 
  const [countMoney, setCountMoney] = useState(() => {
    const savedCountMoney = localStorage.getItem('countMoney');
    return savedCountMoney ? parseInt(savedCountMoney, 10) : 1000000000000000;
  });

  const [countDiamond, setCountDiamond] = useState(() => {
    const savedCountDiamond = localStorage.getItem('countDiamond');
    return savedCountDiamond ? parseInt(savedCountDiamond, 10) : 999;
  });

  const [multiplier, setMultiplier] = useState(() => {
    const savedMultiplier = localStorage.getItem('multiplier');
    return savedMultiplier ? parseInt(savedMultiplier, 10) : 100;
  });

  const [minDelay, setMinDelay] = useState(() => {
    const savedMinDelay = localStorage.getItem('minDelay');
    return savedMinDelay ? parseInt(savedMinDelay, 10) : 50000;
  });

  const [maxDelay, setMaxDelay] = useState(() => {
    const savedMaxDelay = localStorage.getItem('maxDelay');
    return savedMaxDelay ? parseInt(savedMaxDelay, 10) : 100000;
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

  const [diamondUpgrades, setDiamondUpgrades] = useState(() => {
    const savedDiamondUpgrades = localStorage.getItem('diamondUpgrades');
    return savedDiamondUpgrades ? JSON.parse(savedDiamondUpgrades) : DiamondUpgradesParams;
  });

  const [busters, setBusters] = useState(() => {
    const savedBusters = localStorage.getItem('busters');
    return savedBusters ? JSON.parse(savedBusters) : BustersParams;
  });

  useEffect(() => {
    localStorage.setItem('countMoney', countMoney.toString());
  }, [countMoney]);

  useEffect(() => {
    localStorage.setItem('countDiamond', countDiamond.toString());
  }, [countDiamond]);

  useEffect(() => {
    localStorage.setItem('multiplier', multiplier.toString());
  }, [multiplier]);

  useEffect(() => {
    localStorage.setItem('minDelay', minDelay.toString());
  }, [minDelay]);

  useEffect(() => {
    localStorage.setItem('maxDelay', maxDelay.toString());
  }, [maxDelay]);

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
    console.log(actIncreaseMoney)
  };

  const incrementCountDiamond = () => {
    const increaseDiamond = Math.random() * 100 > 92
    setCountDiamond(countDiamond + increaseDiamond );
    console.log("diamonds try increase")
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
        minDelay={minDelay}
        maxDelay={maxDelay}
        numOfClicks={10}
        waitingTime={10000}
        onCounterMoneyChange={setCountMoney}
        countMoney={countMoney}
        pasIncreaseMoney={pasIncreaseMoney}
        actIncreaseMoney={actIncreaseMoney}
        multiplier={multiplier}
      />
      <Trainer trainerImage={trainerImage} onClick={() => incrementCountMoneyForClick()} />
      <Counters 
        countMoney={countMoney} 
        pasIncreaseMoney={pasIncreaseMoney}
        countDiamond={countDiamond} 
        />
      <Upgrades
        onIncreaseDiamond={incrementCountDiamond}
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
      <Busters
        onIncreaseDiamond={incrementCountDiamond}
        onPasIncreaseMoneyChange={setPasIncreaseMoney}
        pasIncreaseMoney={pasIncreaseMoney}
        onActIncreaseMoneyChange={setActIncreaseMoney}
        actIncreaseMoney={actIncreaseMoney}
        onCounterMoneyChange={setCountMoney}
        countMoney={countMoney}
        onCounterBustersChange={setBusters}
        busters={busters}
        onCounterUpgradesChange={setUpgrades}
        upgrades={upgrades}
      />
      <DiamondUpgrades
        onMaxDelayChange={setMaxDelay}
        maxDelay={maxDelay}
        onMinDelayChange={setMinDelay}
        minDelay={minDelay}
        onMultiplierChange={setMultiplier}
        multiplier={multiplier}
        onCounterDiamondChange={setCountDiamond}
        diamond={countDiamond}
        onCounterBustersChange={setBusters}
        busters={busters}
        onCounterUpgradesChange={setUpgrades}
        upgrades={upgrades}
        onCounterDiamondsUpgradesChange={setDiamondUpgrades}
        diamondUpgrades={diamondUpgrades}
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