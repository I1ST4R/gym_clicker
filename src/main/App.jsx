import React, { useState, useEffect } from 'react';
import Trainer from '../Trainer.jsx';
import Counters from '../Counters.jsx';
import Upgrades from '../Upgrades.jsx';
import Client from '../Client.jsx';
import '../css/App.css';

function App() {
  const [countMoney, setCountMoney] = useState(10000000000);
  const [trainerImage, setTrainerImage] = useState("src/assets/Trainer/img1.png");
  const [pasIncreaseMoney, setPasIncreaseMoney] = useState(0);
  const [actIncreaseMoney, setActIncreaseMoney] = useState(1);

  const incrementCountMoneyForClick = () => {
    setCountMoney(countMoney + actIncreaseMoney);
  }

  
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
      />
    </>
  );
}

export default App;