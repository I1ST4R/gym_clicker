import React, { createContext, useState, useEffect } from 'react';
import BustersParams from '../../js/BustersParams.js';
import UpgradesParams from '../../js/UpgradesParams.js';
import DnkUpgradesParams from '../../js/DnkUpgradesParams.js';
import DiamondPurchasesParams from '../../js/DiamondPurchasesParams.js';

// Создаем контекст
export const AppContext = createContext();

// Вспомогательная функция для загрузки состояния из localStorage
const loadState = (key, defaultValue, parser = (val) => val) => {
  const savedValue = localStorage.getItem(key);
  return savedValue ? parser(savedValue) : defaultValue;
};

// Вспомогательная функция для сохранения состояния в localStorage
const saveState = (key, value) => {
  localStorage.setItem(key, value);
};

// Функция для парсинга BigInt из JSON
const bigIntParser = (key, value) => {
  if (typeof value === 'string' && /^\d+n$/.test(value)) {
    return BigInt(value.slice(0, -1));
  }
  return value;
};

// Провайдер контекста
export const AppProvider = ({ children }) => {
  // Состояния для BigInt
  const [countMoney, setCountMoney] = useState(() => loadState('countMoney', BigInt('0'), BigInt));
  const [countDnk, setCountDnk] = useState(() => loadState('countDnk', BigInt('0'), BigInt));
  const [countDiamond, setCountDiamond] = useState(() => loadState('countDiamond', BigInt('10'), BigInt)); // Новое состояние
  const [pasIncreaseMoney, setPasIncreaseMoney] = useState(() => loadState('pasIncreaseMoney', BigInt('100000000000000000000'), BigInt));
  const [actIncreaseMoney, setActIncreaseMoney] = useState(() => loadState('actIncreaseMoney', BigInt('1'), BigInt));

  // Состояния для чисел
  const [multiplier, setMultiplier] = useState(() => loadState('multiplier', 30, parseInt));
  const [cooldownDiscount, setCooldownDiscount] = useState(() => loadState('cooldownDiscount', 1, parseInt));
  const [priceMultiplier, setPriceMultiplier] = useState(() => loadState('priceMultiplier', 1, parseInt));
  const [increaseMultiplier, setIncreaseMultiplier] = useState(() => loadState('increaseMultiplier', 1, parseInt));
  const [minDelay, setMinDelay] = useState(() => loadState('minDelay', 300000, parseInt));
  const [maxDelay, setMaxDelay] = useState(() => loadState('maxDelay', 600000, parseInt));

  // Состояния для строк и объектов
  const [trainerImage, setTrainerImage] = useState(() => loadState('trainerImage', "Trainer/img1.png"));
  const [resultImages, setResultImages] = useState(() => loadState('resultImages', [], JSON.parse));

  // Состояния для массивов объектов
  const [upgrades, setUpgrades] = useState(() => loadState('upgrades', UpgradesParams, (val) => JSON.parse(val, bigIntParser)));
  const [dnkUpgrades, setDnkUpgrades] = useState(() => loadState('dnkUpgrades', DnkUpgradesParams, (val) => JSON.parse(val, bigIntParser)));
  const [busters, setBusters] = useState(() => loadState('busters', BustersParams, (val) => JSON.parse(val, bigIntParser)));
  const [diamondPurchases, setDiamondPurchases] = useState(() => loadState('diamondPurchases', DiamondPurchasesParams, JSON.parse)); // Новый массив

  // Состояния для булевых значений
  const [isDiscountExists, setIsDiscountExists] = useState(() => loadState('isDiscountExists', false, JSON.parse));
  const [storyIntroShown, setStoryIntroShown] = useState(() => loadState('storyIntroShown', false, JSON.parse));
  const [storyAutroShown, setStoryAutroShown] = useState(() => loadState('storyAutroShown', false, JSON.parse));
  const [end, setEnd] = useState(() => loadState('end', false, JSON.parse));
  const [showCustomAlert, setShowCustomAlert] = useState(false);

  // Состояния для управления CustomAlert
  const [alertMessage, setAlertMessage] = useState("");
  const [alertOnConfirm, setAlertOnConfirm] = useState(() => () => {});
  const [alertOnCancel, setAlertOnCancel] = useState(() => () => {});

  // Состояния для тултипов и ховеров
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, right: 0, id: 1 });
  const [isUpgradeHovered, setIsUpgradeHovered] = useState(false);
  const [isDnkHovered, setIsDnkHovered] = useState(false);
  const [isBusterHovered, setIsBusterHovered] = useState(false);
  const [isCounterHovered, setIsCounterHovered] = useState(false);
  const [isSkinHovered, setIsSkinHovered] = useState(false);

  // состояния для обликов
  const [backgroundImage, setBackgroundImage] = useState(() => loadState('backgroundImage', null));
  const [cursorImage, setCursorImage] = useState(() => loadState('cursorImage', null));
  const [isClientImgAdded, setIsClientImgAdded] = useState(() => loadState('isClientImgAdded', false, JSON.parse));
  const [backgroundRightImage, setBackgroundRightImage] = useState(() => loadState('backgroundRightImage', true, JSON.parse));

  // Функция для сброса прогресса
  const resetProgress = (resetAdditionalStates = false) => {
    // Стандартный сброс
    setCountMoney(BigInt('100000000000000000000000000'));
    setPasIncreaseMoney(BigInt('0'));
    setActIncreaseMoney(BigInt('1'));
    setTrainerImage("Trainer/img1.png");
    setResultImages([]);
    setUpgrades(UpgradesParams);
    setBusters(BustersParams);
    setIsDiscountExists(false);
    setStoryIntroShown(false);
    setStoryAutroShown(false);
    setEnd(false);
    setShowCustomAlert(false);
    setAlertMessage("");
    setAlertOnConfirm(() => () => {});
    setAlertOnCancel(() => () => {});

    // Если resetAdditionalStates === true, сбрасываем дополнительные хуки
    if (resetAdditionalStates) {
      setCountDnk(BigInt('0'));
      setMultiplier(30);
      setPriceMultiplier(1);
      setIncreaseMultiplier(1);
      setMinDelay(300000);
      setMaxDelay(600000);
      setDnkUpgrades(DnkUpgradesParams);
      setTooltipPosition({ top: 0, right: 0, id: 1 });
      setIsUpgradeHovered(false);
      setIsDnkHovered(false);
      setIsBusterHovered(false);
    }

    // Очистка localStorage
    const keysToRemove = [
      'countMoney', 'pasIncreaseMoney', 'actIncreaseMoney', 'trainerImage', 'resultImages',
      'upgrades', 'busters', 'isDiscountExists', 'storyIntroShown', 'storyAutroShown', 'end',
      'alertMessage', 'alertOnConfirm', 'alertOnCancel', 
    ];

    if (resetAdditionalStates) {
      keysToRemove.push(
        'countDnk', 'countDiamond', 'multiplier', 'cooldownDiscount', 'priceMultiplier', 'increaseMultiplier', 'minDelay', 'maxDelay',
        'dnkUpgrades', 'diamondPurchases', 'tooltipPosition', 'isUpgradeHovered', 'isDnkHovered', 'isBusterHovered', 'backgroundImage', 'isClientImgAdded', 'cursorImage', 'backgroundRightImage'
      );
    }

    keysToRemove.forEach(key => localStorage.removeItem(key));
  };

  // Функция для отображения CustomAlert
  const showAlert = (message, onConfirm, onCancel) => {
    setAlertMessage(message);
    setAlertOnConfirm(() => onConfirm);
    setAlertOnCancel(() => onCancel);
    setShowCustomAlert(true);
  };

  // Сохранение состояний в localStorage
  useEffect(() => {
    const stateToSave = {
      countMoney: countMoney.toString(),
      countDnk: countDnk.toString(),
      countDiamond: countDiamond.toString(), // Сохранение нового состояния
      pasIncreaseMoney: pasIncreaseMoney.toString(),
      actIncreaseMoney: actIncreaseMoney.toString(),
      multiplier: multiplier.toString(),
      cooldownDiscount: cooldownDiscount.toString(),
      priceMultiplier: priceMultiplier.toString(),
      increaseMultiplier: increaseMultiplier.toString(),
      minDelay: minDelay.toString(),
      maxDelay: maxDelay.toString(),
      trainerImage,
      resultImages: JSON.stringify(resultImages),
      upgrades: JSON.stringify(upgrades, (key, value) => (typeof value === 'bigint' ? `${value}n` : value)),
      dnkUpgrades: JSON.stringify(dnkUpgrades, (key, value) => (typeof value === 'bigint' ? `${value}n` : value)),
      busters: JSON.stringify(busters, (key, value) => (typeof value === 'bigint' ? `${value}n` : value)),
      diamondPurchases: JSON.stringify(diamondPurchases), 
      isDiscountExists: JSON.stringify(isDiscountExists),
      storyIntroShown: JSON.stringify(storyIntroShown),
      storyAutroShown: JSON.stringify(storyAutroShown),
      end: JSON.stringify(end),
      alertMessage,
      alertOnConfirm: alertOnConfirm.toString(),
      alertOnCancel: alertOnCancel.toString(),
      backgroundImage, 
      cursorImage,
      isClientImgAdded,
      backgroundRightImage,
    };

    Object.entries(stateToSave).forEach(([key, value]) => saveState(key, value));
  }, [
    countMoney, countDnk, countDiamond, pasIncreaseMoney, actIncreaseMoney, multiplier, cooldownDiscount, priceMultiplier,
    increaseMultiplier, minDelay, maxDelay, trainerImage, resultImages, upgrades, dnkUpgrades,
    busters, diamondPurchases, isDiscountExists, storyIntroShown, storyAutroShown, end, alertMessage,
    alertOnConfirm, alertOnCancel, backgroundImage, cursorImage, isClientImgAdded, backgroundRightImage,
  ]);

  return (
    <AppContext.Provider
      value={{
        countMoney, setCountMoney,
        countDnk, setCountDnk,
        countDiamond, setCountDiamond, // Передача нового состояния
        pasIncreaseMoney, setPasIncreaseMoney,
        actIncreaseMoney, setActIncreaseMoney,
        multiplier, setMultiplier,
        cooldownDiscount, setCooldownDiscount,
        priceMultiplier, setPriceMultiplier,
        increaseMultiplier, setIncreaseMultiplier,
        minDelay, setMinDelay,
        maxDelay, setMaxDelay,
        trainerImage, setTrainerImage,
        resultImages, setResultImages,
        upgrades, setUpgrades,
        dnkUpgrades, setDnkUpgrades,
        busters, setBusters,
        diamondPurchases, setDiamondPurchases, // Передача нового массива
        isDiscountExists, setIsDiscountExists,
        storyIntroShown, setStoryIntroShown,
        storyAutroShown, setStoryAutroShown,
        tooltipPosition, setTooltipPosition,
        isUpgradeHovered, setIsUpgradeHovered,
        isDnkHovered, setIsDnkHovered,
        isBusterHovered, setIsBusterHovered,
        isCounterHovered, setIsCounterHovered,
        isSkinHovered, setIsSkinHovered,
        end, setEnd,
        resetProgress,
        showCustomAlert, setShowCustomAlert,
        alertMessage, setAlertMessage,
        alertOnConfirm, setAlertOnConfirm,
        alertOnCancel, setAlertOnCancel,
        showAlert,
        isClientImgAdded, setIsClientImgAdded,
        backgroundImage, setBackgroundImage, 
        cursorImage, setCursorImage,
        backgroundRightImage, setBackgroundRightImage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};