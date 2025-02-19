import React, { useState } from 'react';
import Trainer from '../Trainer.jsx';
import Counter from '../Counters.jsx';
import Upgrades from '../Upgrades.jsx';
import Client from '../Client.jsx';
import '../css/App.css';

function App() {
  const [count, setCount] = useState(0);
  const [trainerImage, setTrainerImage] = useState("src/assets/Trainer/img1.png");
  const [totalMultiplier, setTotalMultiplier] = useState(1);

  const incrementCount = (amount = 1) => {
    setCount((prevCount) => Math.floor(prevCount + amount * totalMultiplier));
  };

  return (
    <>

      <Client
        minDelay={10000}
        maxDelay={20000}
        numOfClicks={15}
        waitingTime={10000}
        incrementCount={incrementCount}
      />
      <Trainer trainerImage={trainerImage} onClick={() => incrementCount()} />
      <Counter count={count} />
      <Upgrades
        onTotalMultiplierChange={setTotalMultiplier}
        onLevelTrainerChange={(newImage) => setTrainerImage(newImage)}
        onCounterChange={setCount}
        count={count}
      />
    </>
  );
}

export default App;