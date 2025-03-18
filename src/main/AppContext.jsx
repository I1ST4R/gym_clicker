import React, { createContext, useState, useEffect } from 'react';
import BustersParams from '../js/BustersParams.js';
import UpgradesParams from '../js/UpgradesParams.js';
import DnkUpgradesParams from '../js/DnkUpgradesParams.js';

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
  const [countMoney, setCountMoney] = useState(() => loadState('countMoney', BigInt('10000000000000000000000000000000000'), BigInt));
  const [countDnk, setCountDnk] = useState(() => loadState('countDnk', BigInt('0'), BigInt));
  const [pasIncreaseMoney, setPasIncreaseMoney] = useState(() => loadState('pasIncreaseMoney', BigInt('10'), BigInt));
  const [actIncreaseMoney, setActIncreaseMoney] = useState(() => loadState('actIncreaseMoney', BigInt('1'), BigInt));

  // Состояния для чисел
  const [multiplier, setMultiplier] = useState(() => loadState('multiplier', 30, parseInt));
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

  // Состояние для ширины окна
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Функция для сброса прогресса
  const resetProgress = (resetAdditionalStates = false) => {
    // Стандартный сброс
    setCountMoney(BigInt('100000000000000000000000000'));
    setPasIncreaseMoney(BigInt('100000000000000000000000000'));
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
      setWindowWidth(window.innerWidth);
    }
  
    // Очистка localStorage
    const keysToRemove = [
      'countMoney', 'pasIncreaseMoney', 'actIncreaseMoney', 'trainerImage', 'resultImages',
      'upgrades', 'busters', 'isDiscountExists', 'storyIntroShown', 'storyAutroShown', 'end',
      'alertMessage', 'alertOnConfirm', 'alertOnCancel'
    ];
  
    if (resetAdditionalStates) {
      keysToRemove.push(
        'countDnk', 'multiplier', 'priceMultiplier', 'increaseMultiplier', 'minDelay', 'maxDelay',
        'dnkUpgrades', 'tooltipPosition', 'isUpgradeHovered', 'isDnkHovered', 'isBusterHovered', 'windowWidth'
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
      pasIncreaseMoney: pasIncreaseMoney.toString(),
      actIncreaseMoney: actIncreaseMoney.toString(),
      multiplier: multiplier.toString(),
      priceMultiplier: priceMultiplier.toString(),
      increaseMultiplier: increaseMultiplier.toString(),
      minDelay: minDelay.toString(),
      maxDelay: maxDelay.toString(),
      trainerImage,
      resultImages: JSON.stringify(resultImages),
      upgrades: JSON.stringify(upgrades, (key, value) => (typeof value === 'bigint' ? `${value}n` : value)),
      dnkUpgrades: JSON.stringify(dnkUpgrades, (key, value) => (typeof value === 'bigint' ? `${value}n` : value)),
      busters: JSON.stringify(busters, (key, value) => (typeof value === 'bigint' ? `${value}n` : value)),
      isDiscountExists: JSON.stringify(isDiscountExists),
      storyIntroShown: JSON.stringify(storyIntroShown),
      storyAutroShown: JSON.stringify(storyAutroShown),
      end: JSON.stringify(end),
      alertMessage,
      alertOnConfirm: alertOnConfirm.toString(),
      alertOnCancel: alertOnCancel.toString(),
    };

    Object.entries(stateToSave).forEach(([key, value]) => saveState(key, value));
  }, [
    countMoney, countDnk, pasIncreaseMoney, actIncreaseMoney, multiplier, priceMultiplier,
    increaseMultiplier, minDelay, maxDelay, trainerImage, resultImages, upgrades, dnkUpgrades,
    busters, isDiscountExists, storyIntroShown, storyAutroShown, end, alertMessage,
    alertOnConfirm, alertOnCancel,
  ]);

  return (
    <AppContext.Provider
      value={{
        countMoney, setCountMoney,
        countDnk, setCountDnk,
        pasIncreaseMoney, setPasIncreaseMoney,
        actIncreaseMoney, setActIncreaseMoney,
        multiplier, setMultiplier,
        priceMultiplier, setPriceMultiplier,
        increaseMultiplier, setIncreaseMultiplier,
        minDelay, setMinDelay,
        maxDelay, setMaxDelay,
        trainerImage, setTrainerImage,
        resultImages, setResultImages,
        upgrades, setUpgrades,
        dnkUpgrades, setDnkUpgrades,
        busters, setBusters,
        isDiscountExists, setIsDiscountExists,
        storyIntroShown, setStoryIntroShown,
        storyAutroShown, setStoryAutroShown,
        tooltipPosition, setTooltipPosition,
        isUpgradeHovered, setIsUpgradeHovered,
        isDnkHovered, setIsDnkHovered,
        isBusterHovered, setIsBusterHovered,
        isCounterHovered, setIsCounterHovered,
        end, setEnd,
        windowWidth, setWindowWidth,
        resetProgress,
        showCustomAlert, setShowCustomAlert,
        alertMessage, setAlertMessage,
        alertOnConfirm, setAlertOnConfirm,
        alertOnCancel, setAlertOnCancel,
        showAlert, 
      }}
    >
      {children}
    </AppContext.Provider>
  );
};