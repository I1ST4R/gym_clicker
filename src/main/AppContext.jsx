// AppContext.js
import React, { createContext, useState, useEffect } from 'react';
import BustersParams from '../js/BustersParams.js';
import UpgradesParams from '../js/UpgradesParams.js';
import DiamondUpgradesParams from '../js/DiamondUpgradesParams.js';

// Создаем контекст
export const AppContext = createContext();

// Создаем провайдер
export const AppProvider = ({ children }) => {
  const [countMoney, setCountMoney] = useState(() => {
    const savedCountMoney = localStorage.getItem('countMoney');
    return savedCountMoney ? parseInt(savedCountMoney, 10) :400000000000000000000;
  });

  const [countDiamond, setCountDiamond] = useState(() => {
    const savedCountDiamond = localStorage.getItem('countDiamond');
    return savedCountDiamond ? parseInt(savedCountDiamond, 10) : 1000;
  });

  const [pasIncreaseMoney, setPasIncreaseMoney] = useState(() => {
    const savedPasIncreaseMoney = localStorage.getItem('pasIncreaseMoney');
    return savedPasIncreaseMoney ? parseInt(savedPasIncreaseMoney, 10) : 100000000000;
  });

  const [multiplier, setMultiplier] = useState(() => {
    const savedMultiplier = localStorage.getItem('multiplier');
    return savedMultiplier ? parseInt(savedMultiplier, 10) : 30;
  });

  const [priceMultiplier, setPriceMultiplier] = useState(() => {
    const savedPriceMultiplier = localStorage.getItem('priceMultiplier');
    return savedPriceMultiplier ? parseInt(savedPriceMultiplier, 10) : 1;
  });

  const [increaseMultiplier, setIncreaseMultiplier] = useState(() => {
    const savedIncreaseMultiplier = localStorage.getItem('increaseMultiplier');
    return savedIncreaseMultiplier ? parseInt(savedIncreaseMultiplier, 10) : 1;
  });

  const [minDelay, setMinDelay] = useState(() => {
    const savedMinDelay = localStorage.getItem('minDelay');
    return savedMinDelay ? parseInt(savedMinDelay, 10) : 300000;
  });

  const [maxDelay, setMaxDelay] = useState(() => {
    const savedMaxDelay = localStorage.getItem('maxDelay');
    return savedMaxDelay ? parseInt(savedMaxDelay, 10) : 600000;
  });

  const [trainerImage, setTrainerImage] = useState(() => {
    const savedTrainerImage = localStorage.getItem('trainerImage');
    return savedTrainerImage || "Trainer/img1.png";
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

  const [isDiscountExists, setIsDiscountExists] = useState(() => {
    const savedIsDiscountExists = localStorage.getItem('isDiscountExists');
    return savedIsDiscountExists ? JSON.parse(savedIsDiscountExists) : false;
  });

  const [cooldwonDiscount, setCooldwonDiscount] = useState(() => {
    const savedCooldwonDiscount = localStorage.getItem('cooldwonDiscount');
    return savedCooldwonDiscount ? JSON.parse(savedCooldwonDiscount) : 1;
  });

  const [storyShown, setStoryShown] = useState(() => {
    const savedStoryShown = localStorage.getItem('storyShown');
    return savedStoryShown ? JSON.parse(savedStoryShown) : false;
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
    localStorage.setItem('priceMultiplier', priceMultiplier.toString());
  }, [priceMultiplier]);

  useEffect(() => {
    localStorage.setItem('increaseMultiplier', increaseMultiplier.toString());
  }, [increaseMultiplier]);

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

  useEffect(() => {
    localStorage.setItem('isDiscountExists', JSON.stringify(isDiscountExists));
  }, [isDiscountExists]);

  useEffect(() => {
    localStorage.setItem('cooldwonDiscount', JSON.stringify(cooldwonDiscount));
  }, [cooldwonDiscount]);




  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, right: 0, id: 1 });

  const [isUpgradeHovered, setIsUpgradeHovered] = useState(false);

  const [isDUpgradeHovered, setIsDUpgradeHovered] = useState(false);

  const [isBusterHovered, setIsBusterHovered] = useState(false);

  const [showStory, setShowStory] = useState(!storyShown);

  const [end, setEnd] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  return (
    <AppContext.Provider
      value={{
        countMoney,
        setCountMoney,
        countDiamond,
        setCountDiamond,
        multiplier,
        setMultiplier,
        priceMultiplier,
        setPriceMultiplier,
        increaseMultiplier,
        setIncreaseMultiplier,
        minDelay,
        setMinDelay,
        maxDelay,
        setMaxDelay,
        trainerImage,
        setTrainerImage,
        pasIncreaseMoney,
        setPasIncreaseMoney,
        actIncreaseMoney,
        setActIncreaseMoney,
        resultImages,
        setResultImages,
        upgrades,
        setUpgrades,
        diamondUpgrades,
        setDiamondUpgrades,
        busters,
        setBusters,
        isDiscountExists,
        setIsDiscountExists,
        cooldwonDiscount,
        setCooldwonDiscount,
        storyShown,
        setStoryShown,
        tooltipPosition,
        setTooltipPosition,
        isUpgradeHovered,
        setIsUpgradeHovered,
        isDUpgradeHovered,
        setIsDUpgradeHovered,
        isBusterHovered,
        setIsBusterHovered,
        showStory,
        setShowStory,
        end,
        setEnd,
        windowWidth,
        setWindowWidth,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};