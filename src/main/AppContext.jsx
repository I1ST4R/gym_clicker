import React, { createContext, useState, useEffect } from 'react';
import BustersParams from '../js/BustersParams.js';
import UpgradesParams from '../js/UpgradesParams.js';
import DnkUpgradesParams from '../js/DnkUpgradesParams.js';

// Создаем контекст
export const AppContext = createContext();

// Создаем провайдер
export const AppProvider = ({ children }) => {
  // Состояния для BigInt
  const [countMoney, setCountMoney] = useState(() => {
    const savedCountMoney = localStorage.getItem('countMoney');
    return savedCountMoney ? BigInt(savedCountMoney) : BigInt('0');
  });

  const [showCustomAlert, setShowCustomAlert] = useState(false);

  const [countDnk, setCountDnk] = useState(() => {
    const savedCountDnk = localStorage.getItem('countDnk');
    return savedCountDnk ? BigInt(savedCountDnk) : BigInt('0');
  });

  const [pasIncreaseMoney, setPasIncreaseMoney] = useState(() => {
    const savedPasIncreaseMoney = localStorage.getItem('pasIncreaseMoney');
    return savedPasIncreaseMoney ? BigInt(savedPasIncreaseMoney) : BigInt('10000000');
  });
  
  const [actIncreaseMoney, setActIncreaseMoney] = useState(() => {
    const savedActIncreaseMoney = localStorage.getItem('actIncreaseMoney');
    return savedActIncreaseMoney ? BigInt(savedActIncreaseMoney) : BigInt('1');
  });

  const [multiplier, setMultiplier] = useState(() => {
    const savedMultiplier = localStorage.getItem('multiplier');
    return savedMultiplier ? parseInt(savedMultiplier) : 30;
  });

  const [priceMultiplier, setPriceMultiplier] = useState(() => {
    const savedPriceMultiplier = localStorage.getItem('priceMultiplier');
    return savedPriceMultiplier ? parseInt(savedPriceMultiplier) : 1
  });

  const [increaseMultiplier, setIncreaseMultiplier] = useState(() => {
    const savedIncreaseMultiplier = localStorage.getItem('increaseMultiplier');
    return savedIncreaseMultiplier ? parseInt(savedIncreaseMultiplier) : 1;
  });

  // Остальные состояния
  const [minDelay, setMinDelay] = useState(() => {
    const savedMinDelay = localStorage.getItem('minDelay');
    return savedMinDelay ? parseInt(savedMinDelay, 10) : 300000;
  });

  const [maxDelay, setMaxDelay] = useState(() => {
    const savedMaxDelay = localStorage.getItem('maxDelay');
    return savedMaxDelay ? parseInt(savedMaxDelay, 10) :  600000;
  });

  const [trainerImage, setTrainerImage] = useState(() => {
    const savedTrainerImage = localStorage.getItem('trainerImage');
    return savedTrainerImage || "Trainer/img1.png";
  });

  const [resultImages, setResultImages] = useState(() => {
    const savedResultImages = localStorage.getItem('resultImages');
    return savedResultImages ? JSON.parse(savedResultImages) : [];
  });

  // Состояния для массивов объектов
  const [upgrades, setUpgrades] = useState(() => {
    const savedUpgrades = localStorage.getItem('upgrades');
    return savedUpgrades ? JSON.parse(savedUpgrades, (key, value) => {
      if (typeof value === 'string' && /^\d+n$/.test(value)) {
        return BigInt(value.slice(0, -1));
      }
      return value;
    }) : UpgradesParams;
  });

  const [dnkUpgrades, setDnkUpgrades] = useState(() => {
    const savedDnkUpgrades = localStorage.getItem('dnkUpgrades');
    return savedDnkUpgrades ? JSON.parse(savedDnkUpgrades, (key, value) => {
      if (typeof value === 'string' && /^\d+n$/.test(value)) {
        return BigInt(value.slice(0, -1));
      }
      return value;
    }) : DnkUpgradesParams;
  });

  const [busters, setBusters] = useState(() => {
    const savedBusters = localStorage.getItem('busters');
    return savedBusters ? JSON.parse(savedBusters, (key, value) => {
      if (typeof value === 'string' && /^\d+n$/.test(value)) {
        return BigInt(value.slice(0, -1));
      }
      return value;
    }) : BustersParams;
  });

  const [isDiscountExists, setIsDiscountExists] = useState(() => {
    const savedIsDiscountExists = localStorage.getItem('isDiscountExists');
    return savedIsDiscountExists ? JSON.parse(savedIsDiscountExists) : false;
  });

  const [cooldwonDiscount, setCooldwonDiscount] = useState(() => {
    const savedCooldwonDiscount = localStorage.getItem('cooldwonDiscount');
    return savedCooldwonDiscount ? JSON.parse(savedCooldwonDiscount) : 1;
  });

  const [storyIntroShown, setStoryIntroShown] = useState(() => {
    const savedStoryIntroShown = localStorage.getItem('storyIntroShown');
    return savedStoryIntroShown ? JSON.parse(savedStoryIntroShown) : false;
  });

  const [storyAutroShown, setStoryAutroShown] = useState(() => {
    const savedStoryAutroShown = localStorage.getItem('storyAutroShown');
    return savedStoryAutroShown ? JSON.parse(savedStoryAutroShown) : false;
  });

  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, right: 0, id: 1 });
  const [isUpgradeHovered, setIsUpgradeHovered] = useState(false);
  const [isDnkHovered, setIsDnkHovered] = useState(false);
  const [isBusterHovered, setIsBusterHovered] = useState(false);
  const [end, setEnd] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Функция для сброса прогресса
  const resetProgress = () => {
    // Сбрасываем состояния, кроме dnkUpgrades, priceMultiplier, increaseMultiplier, cooldwonDiscount, maxDelay, minDelay, multiplier
    setCountMoney(BigInt('100000000000000000000000000'));
    setPasIncreaseMoney(BigInt('10000000'));
    setActIncreaseMoney(BigInt('1'));
    setTrainerImage("Trainer/img1.png");
    setResultImages([]);
    setUpgrades(UpgradesParams);
    setBusters(BustersParams);
    setIsDiscountExists(false);
    setStoryIntroShown(false);
    setStoryAutroShown(false);
    setEnd(false);
    setShowCustomAlert(false)
  
    // Очищаем localStorage, кроме countDnk, dnkUpgrades, priceMultiplier, increaseMultiplier, cooldwonDiscount, maxDelay, minDelay, multiplier
    localStorage.removeItem('countMoney');
    localStorage.removeItem('pasIncreaseMoney');
    localStorage.removeItem('actIncreaseMoney');
    localStorage.removeItem('trainerImage');
    localStorage.removeItem('resultImages');
    localStorage.removeItem('upgrades');
    localStorage.removeItem('busters');
    localStorage.removeItem('isDiscountExists');
    localStorage.removeItem('storyIntroShown');
    localStorage.removeItem('storyAutroShown');
    localStorage.removeItem('end');
  
    /*window.location.reload();*/
  };

  useEffect(() => {
    const stateToSave = {
      countMoney: countMoney.toString(),
      countDnk: countDnk.toString(),
      pasIncreaseMoney: pasIncreaseMoney.toString(),
      actIncreaseMoney: actIncreaseMoney.toString(),
      multiplier: multiplier.toString(),
      priceMultiplier: priceMultiplier.toString(),
      increaseMultiplier: increaseMultiplier.toString(),
      minDelay: minDelay.toString(),
      maxDelay: maxDelay.toString(),
      trainerImage,
      resultImages: JSON.stringify(resultImages),
      upgrades: JSON.stringify(upgrades, (key, value) => {
        if (typeof value === 'bigint') {
          return value.toString() + 'n';
        }
        return value;
      }),
      dnkUpgrades: JSON.stringify(dnkUpgrades, (key, value) => {
        if (typeof value === 'bigint') {
          return value.toString() + 'n';
        }
        return value;
      }),
      busters: JSON.stringify(busters, (key, value) => {
        if (typeof value === 'bigint') {
          return value.toString() + 'n';
        }
        return value;
      }),
      isDiscountExists: JSON.stringify(isDiscountExists),
      cooldwonDiscount: JSON.stringify(cooldwonDiscount),
      storyIntroShown: JSON.stringify(storyIntroShown),
      storyAutroShown: JSON.stringify(storyAutroShown),
    };

    Object.entries(stateToSave).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });
  }, [
    countMoney,
    countDnk,
    pasIncreaseMoney,
    actIncreaseMoney,
    multiplier,
    priceMultiplier,
    increaseMultiplier,
    minDelay,
    maxDelay,
    trainerImage,
    resultImages,
    upgrades,
    dnkUpgrades,
    busters,
    isDiscountExists,
    cooldwonDiscount,
    storyIntroShown,
    storyAutroShown,
  ]);

  return (
    <AppContext.Provider
      value={{
        countMoney,
        setCountMoney,
        countDnk,
        setCountDnk,
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
        dnkUpgrades,
        setDnkUpgrades,
        busters,
        setBusters,
        isDiscountExists,
        setIsDiscountExists,
        cooldwonDiscount,
        setCooldwonDiscount,
        storyIntroShown,
        setStoryIntroShown,
        storyAutroShown,
        setStoryAutroShown,
        tooltipPosition,
        setTooltipPosition,
        isUpgradeHovered,
        setIsUpgradeHovered,
        isDnkHovered,
        setIsDnkHovered,
        isBusterHovered,
        setIsBusterHovered,
        end,
        setEnd,
        windowWidth,
        setWindowWidth,
        resetProgress,
        showCustomAlert,
        setShowCustomAlert
      }}
    >
      {children}
    </AppContext.Provider>
  );
};