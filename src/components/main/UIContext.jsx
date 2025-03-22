import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { loadState, saveState } from '../../js/storage';
import abbreviateNum from '../../js/numberAbbreviator.js'; // Импортируем abbreviateNum

const UIContext = createContext();

export const useUIContext = () => {
  const data = useContext(UIContext);

  if (!data) {
    throw new Error("Can not 'useUIContext' outside of the 'UIProvider'");
  }

  return data;
};

export const UIProvider = ({ children }) => {
  // Состояния для UI
  const [alertMessage, setAlertMessage] = useState('');
  const [alertOnConfirm, setAlertOnConfirm] = useState(() => () => {});
  const [alertOnCancel, setAlertOnCancel] = useState(() => () => {});
  const [showCustomAlert, setShowCustomAlert] = useState(false);

  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, right: 530, id: 1 });
  const [isUpgradeHovered, setIsUpgradeHovered] = useState(false);
  const [isDnkHovered, setIsDnkHovered] = useState(false);
  const [isBusterHovered, setIsBusterHovered] = useState(false);
  const [isCounterHovered, setIsCounterHovered] = useState(false);
  const [isSkinHovered, setIsSkinHovered] = useState(false);

  const [tooltipContent, setTooltipContent] = useState(null);
  const [tooltipType, setTooltipType] = useState('null');

  const [storyIntroShown, setStoryIntroShown] = useState(() => loadState('storyIntroShown', false, JSON.parse));
  const [storyAutroShown, setStoryAutroShown] = useState(() => loadState('storyAutroShown', false, JSON.parse));

  const [trainerImage, setTrainerImage] = useState(() => loadState('trainerImage', "Trainer/img1.png"));

  const [resultImages, setResultImages] = useState(() => loadState('resultImages', [], JSON.parse));

  const handleTooltipMouseEnter = useCallback((event, id, type, right = 530) => {
    const cardRect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      top: cardRect.top,
      right: window.innerWidth - cardRect.right - 30,
      id: id,
    });
  
    switch (type) {
      case 'dnk':
        setIsDnkHovered(true);
        break;
      case 'skin':
        setIsSkinHovered(true);
        break;
      case 'upgrade':
        setIsUpgradeHovered(true);
        break;
      case 'buster':
        setIsBusterHovered(true);
        break;
      case 'counter':
        setIsCounterHovered(true);
        break;
      default:
        break;
    }
  }, []);

  // Универсальная функция для обработки onMouseLeave
  const handleTooltipMouseLeave = useCallback(() => {
    setIsDnkHovered(false);
    setIsSkinHovered(false);
    setIsUpgradeHovered(false);
    setIsBusterHovered(false);
    setIsCounterHovered(false);
  }, []);

  const updateTooltipContent = (upgrades, busters, dnkUpgrades, diamondPurchases, increaseMultiplier) =>{
    if (isSkinHovered) {
      const skin = diamondPurchases[tooltipPosition.id - 1];
      setTooltipContent({
        desc: skin.desc,
        price: skin.price,
        isBuyed: skin.isBuyed,
      });
      setTooltipType('Skin');
    } else if (isDnkHovered) {
      const dnk = dnkUpgrades[tooltipPosition.id - 1];
      setTooltipContent({
        top: 500,
        benefit: dnk.benefit,
      });
      setTooltipType('Dnk');
    } else if (isCounterHovered) {
      setTooltipType('Counters');
    } else if (isBusterHovered) {
      const buster = busters[tooltipPosition.id - 1];
      setTooltipContent({
        desc: buster.desc,
        upgradeInfo: buster.upgradeInfo,
        benefit: buster.benefit,
      });
      setTooltipType('Busters');
    } else if (isUpgradeHovered) {
      const upgrade = upgrades[tooltipPosition.id - 1];
      setTooltipContent({
        desc: upgrade.desc,
        initialIncrease: abbreviateNum(
          typeof upgrade.initialIncrease === 'bigint'
            ? (upgrade.initialIncrease / 100n) * BigInt(Math.floor(increaseMultiplier * 100))
            : Math.floor(upgrade.initialIncrease * increaseMultiplier)
        ),
        isIncreaseMoney: upgrade.isIncreaseMoney,
        isLastUpgrade: tooltipPosition.id === 19 && upgrades[tooltipPosition.id - 2].level >= 50,
      });
      setTooltipType('Upgrades');
    } else {
      setTooltipContent(null);
      setTooltipType('null');
    }
  }

  // Логика для DnkProgressBar
  const calculateProgress = useCallback((countDnk, pasIncreaseMoney) => {
    const divisor = 1000000000000000000n;
    const nextDnkLevel = countDnk + 1n;
    const prevRequiredPasIncrease = BigInt(3n ** countDnk * divisor - 1n);
    const newRequiredPasIncrease = 3n ** nextDnkLevel * divisor;

    const curProgressForShow = Number(
      ((pasIncreaseMoney - prevRequiredPasIncrease) * 100n) /
      (newRequiredPasIncrease - prevRequiredPasIncrease)
    );

    return {
      progressForShow: curProgressForShow,
      requiredPasIncrease: newRequiredPasIncrease,
    };
  }, []);

  // Логика для ImageSections
  const generateRandomPosition = useCallback(() => {
    const width = 80;
    const height = 80;
    return {
      x: Math.random() * (400 - width),
      y: Math.random() * (100 - height),
    };
  }, []);

  const updateResultImages = useCallback((upgrades) => {
    const newResultImages = [];
    upgrades.forEach((u) => {
      if (u.level > 0 && u.resultImg) {
        const existingImages = resultImages.filter((img) => img.upgradeId === u.id);

        if (u.level <= 10) {
          for (let i = 0; i < u.level; i++) {
            if (existingImages[i]) {
              newResultImages.push(existingImages[i]);
            } else {
              const position = generateRandomPosition();
              newResultImages.push({
                upgradeId: u.id,
                zIndex: u.zIndex,
                src: u.resultImg,
                x: position.x,
                y: position.y,
                width: 80,
                height: 80,
              });
            }
          }
        } else {
          newResultImages.push(...existingImages);
        }
      }
    });

    // Проверяем, изменились ли resultImages
    if (JSON.stringify(newResultImages) !== JSON.stringify(resultImages)) {
      setResultImages(newResultImages);
    }
  }, [resultImages, generateRandomPosition]);

  const showAlert = (message, onConfirm, onCancel) => {
    setAlertMessage(message);
    setAlertOnConfirm(() => onConfirm);
    setAlertOnCancel(() => onCancel);
    setShowCustomAlert(true);
  };

  const resetUI = () => {
    setTrainerImage("Trainer/img1.png");
    setResultImages([]);
    setStoryIntroShown(false);
    setStoryAutroShown(false);
    setShowCustomAlert(false);
    setAlertMessage("");
    setAlertOnConfirm(() => () => {});
    setAlertOnCancel(() => () => {});
    setTooltipPosition({ top: 0, right: 530, id: 1 });
    setIsUpgradeHovered(false);
    setIsDnkHovered(false);
    setIsBusterHovered(false);
    setIsCounterHovered(false);
    setIsSkinHovered(false);

    const keysToRemove = [
      'trainerImage', 'resultImages', 'storyIntroShown', 'storyAutroShown',
      'alertMessage', 'alertOnConfirm', 'alertOnCancel', 'showCustomAlert',
      'tooltipPosition', 'isUpgradeHovered', 'isDnkHovered', 'isBusterHovered',
      'isCounterHovered', 'isSkinHovered',
    ];

    keysToRemove.forEach((key) => localStorage.removeItem(key));
  };

  // Сохранение состояний в localStorage
  useEffect(() => {
    const stateToSave = {
      alertMessage,
      alertOnConfirm: alertOnConfirm.toString(),
      alertOnCancel: alertOnCancel.toString(),
      showCustomAlert: JSON.stringify(showCustomAlert),
      tooltipPosition: JSON.stringify(tooltipPosition),
      isUpgradeHovered: JSON.stringify(isUpgradeHovered),
      isDnkHovered: JSON.stringify(isDnkHovered),
      isBusterHovered: JSON.stringify(isBusterHovered),
      isCounterHovered: JSON.stringify(isCounterHovered),
      isSkinHovered: JSON.stringify(isSkinHovered),
      storyIntroShown: JSON.stringify(storyIntroShown),
      storyAutroShown: JSON.stringify(storyAutroShown),
      trainerImage,
      resultImages: JSON.stringify(resultImages),
    };

    Object.entries(stateToSave).forEach(([key, value]) => saveState(key, value));
  }, [
    alertMessage, alertOnConfirm, alertOnCancel, showCustomAlert, tooltipPosition,
    isUpgradeHovered, isDnkHovered, isBusterHovered, isCounterHovered, isSkinHovered,
    storyIntroShown, storyAutroShown, trainerImage, resultImages,
  ]);

  return (
    <UIContext.Provider
      value={{
        alert: {
          alertMessage, setAlertMessage,
          alertOnConfirm, setAlertOnConfirm,
          alertOnCancel, setAlertOnCancel,
          showCustomAlert, setShowCustomAlert,
          showAlert,
        },
        tooltip: {
          tooltipPosition, setTooltipPosition,
          isUpgradeHovered, setIsUpgradeHovered,
          isDnkHovered, setIsDnkHovered,
          isBusterHovered, setIsBusterHovered,
          isCounterHovered, setIsCounterHovered,
          isSkinHovered, setIsSkinHovered,
          tooltipContent, setTooltipContent,
          tooltipType, setTooltipType,
          updateTooltipContent,
          handleTooltipMouseEnter,
          handleTooltipMouseLeave,
        },
        story: {
          storyIntroShown, setStoryIntroShown,
          storyAutroShown, setStoryAutroShown,
        },
        trainerImage: {
          trainerImage, setTrainerImage,
        },
        resultImages: {
          resultImages, setResultImages,
          updateResultImages,
        },
        calculateProgress,
        resetUI,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};