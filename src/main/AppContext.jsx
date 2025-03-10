import React, { createContext, useState, useEffect } from 'react';
import BustersParams from '../js/BustersParams.js';
import UpgradesParams from '../js/UpgradesParams.js';
import DiamondUpgradesParams from '../js/DiamondUpgradesParams.js';

// Создаем контекст
export const AppContext = createContext();

// Создаем провайдер
export const AppProvider = ({ children }) => {
  // Состояния для BigInt
  const [countMoney, setCountMoney] = useState(() => {
    const savedCountMoney = localStorage.getItem('countMoney');
    return savedCountMoney ? BigInt(savedCountMoney) : BigInt('10000000000000000000000000000');
  });

  const [countDnk, setCountDnk] = useState(() => {
    const savedCountDnk = localStorage.getItem('countDnk');
    return savedCountDnk ? BigInt(savedCountDnk) : BigInt('0');
  });

  const [pasIncreaseMoney, setPasIncreaseMoney] = useState(() => {
    const savedPasIncreaseMoney = localStorage.getItem('pasIncreaseMoney');
    return savedPasIncreaseMoney ? BigInt(savedPasIncreaseMoney) : BigInt('10000000000');
  });

  const [actIncreaseMoney, setActIncreaseMoney] = useState(() => {
    const savedActIncreaseMoney = localStorage.getItem('actIncreaseMoney');
    return savedActIncreaseMoney ? BigInt(savedActIncreaseMoney) : BigInt('1');
  });

  const [multiplier, setMultiplier] = useState(() => {
    const savedMultiplier = localStorage.getItem('multiplier');
    return savedMultiplier ? BigInt(savedMultiplier) : BigInt('30');
  });

  const [priceMultiplier, setPriceMultiplier] = useState(() => {
    const savedPriceMultiplier = localStorage.getItem('priceMultiplier');
    return savedPriceMultiplier ? BigInt(savedPriceMultiplier) : BigInt('1');
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
    return savedMaxDelay ? parseInt(savedMaxDelay, 10) : 600000;
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
      // Если значение является строкой и представляет BigInt, преобразуем его обратно
      if (typeof value === 'string' && /^\d+n$/.test(value)) {
        return BigInt(value.slice(0, -1));
      }
      return value;
    }) : UpgradesParams;
  });

  const [diamondUpgrades, setDiamondUpgrades] = useState(() => {
    const savedDiamondUpgrades = localStorage.getItem('diamondUpgrades');
    return savedDiamondUpgrades ? JSON.parse(savedDiamondUpgrades, (key, value) => {
      if (typeof value === 'string' && /^\d+n$/.test(value)) {
        return BigInt(value.slice(0, -1));
      }
      return value;
    }) : DiamondUpgradesParams;
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

  const [storyShown, setStoryShown] = useState(() => {
    const savedStoryShown = localStorage.getItem('storyShown');
    return savedStoryShown ? JSON.parse(savedStoryShown) : false;
  });

  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, right: 0, id: 1 });
  const [isUpgradeHovered, setIsUpgradeHovered] = useState(false);
  const [isDUpgradeHovered, setIsDUpgradeHovered] = useState(false);
  const [isBusterHovered, setIsBusterHovered] = useState(false);
  const [end, setEnd] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Эффект для сохранения всех состояний в localStorage
  useEffect(() => {
    const stateToSave = {
      countMoney: countMoney.toString(), // Преобразуем BigInt в строку
      countDnk: countDnk.toString(), // Преобразуем BigInt в строку
      pasIncreaseMoney: pasIncreaseMoney.toString(), // Преобразуем BigInt в строку
      actIncreaseMoney: actIncreaseMoney.toString(), // Преобразуем BigInt в строку
      multiplier: multiplier.toString(), // Преобразуем BigInt в строку
      priceMultiplier: priceMultiplier.toString(), // Преобразуем BigInt в строку
      increaseMultiplier: increaseMultiplier.toString(), // Преобразуем BigInt в строку
      minDelay: minDelay.toString(), // Преобразуем number в строку
      maxDelay: maxDelay.toString(), // Преобразуем number в строку
      trainerImage,
      resultImages: JSON.stringify(resultImages),
      upgrades: JSON.stringify(upgrades, (key, value) => {
        // Если значение является BigInt, преобразуем его в строку
        if (typeof value === 'bigint') {
          return value.toString() + 'n'; // Добавляем 'n' для идентификации BigInt
        }
        return value;
      }),
      diamondUpgrades: JSON.stringify(diamondUpgrades, (key, value) => {
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
      storyShown: JSON.stringify(storyShown),
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
    diamondUpgrades,
    busters,
    isDiscountExists,
    cooldwonDiscount,
    storyShown,
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