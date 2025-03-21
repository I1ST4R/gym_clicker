import React, { createContext, useState, useContext, useEffect } from 'react';
import { loadState, saveState, bigIntParser } from '../../js/storage.js';
import BustersParams from '../../js/BustersParams.js';
import UpgradesParams from '../../js/UpgradesParams.js';
import DnkUpgradesParams from '../../js/DnkUpgradesParams.js';
import DiamondPurchasesParams from '../../js/DiamondPurchasesParams.js';

const ShopContext = createContext();

export const useShopContext = () => {
  const data = useContext(ShopContext)

  if (!data) {
    throw new Error("Can not 'useShopContext' outside of the 'ShopProvider'")
  }

  return data
}

export const useBusterCooldown = (id, initialCooldown) => {
  const [curCooldown, setCurCooldown] = useState(() => {
    const savedCooldown = localStorage.getItem(`buster_${id}_cooldown`);
    return savedCooldown ? parseInt(savedCooldown, 10) : initialCooldown;
  });

  useEffect(() => {
    localStorage.setItem(`buster_${id}_cooldown`, curCooldown);
  }, [curCooldown, id]);

  return [curCooldown, setCurCooldown];
};

export const ShopProvider = ({ children }) => {
  //upgrades:
  const [upgrades, setUpgrades] = useState(() => loadState('upgrades', UpgradesParams, (val) => JSON.parse(val, bigIntParser)));

  //busters:
  const [busters, setBusters] = useState(() => loadState('busters', BustersParams, (val) => JSON.parse(val, bigIntParser)));
  const [isDiscountExists, setIsDiscountExists] = useState(() => loadState('isDiscountExists', false, JSON.parse));

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return minutes > 0 ? `${minutes} мин. ${seconds} сек.` : `${seconds} сек.`;
  };

  //dnk:
  const [dnkUpgrades, setDnkUpgrades] = useState(() => loadState('dnkUpgrades', DnkUpgradesParams, (val) => JSON.parse(val, bigIntParser)));
  const [multiplier, setMultiplier] = useState(() => loadState('multiplier', 30, parseInt));
  const [priceMultiplier, setPriceMultiplier] = useState(() => loadState('priceMultiplier', 1, parseInt));
  const [increaseMultiplier, setIncreaseMultiplier] = useState(() => loadState('increaseMultiplier', 1, parseInt));
  const [cooldownDiscount, setCooldownDiscount] = useState(() => loadState('cooldownDiscount', 1, parseInt));

  //skins:
  const [diamondPurchases, setDiamondPurchases] = useState(() => loadState('diamondPurchases', DiamondPurchasesParams, JSON.parse));
  const [backgroundImage, setBackgroundImage] = useState(() => loadState('backgroundImage', null));
  const [cursorImage, setCursorImage] = useState(() => loadState('cursorImage', null));
  const [isClientImgAdded, setIsClientImgAdded] = useState(() => loadState('isClientImgAdded', false, JSON.parse));
  const [backgroundRightImage, setBackgroundRightImage] = useState(() => loadState('backgroundRightImage', true, JSON.parse));
  const [backgroundLeftImage, setBackgroundLeftImage] = useState(() => loadState('backgroundLeftImage', true, JSON.parse));
  const [isBgCharacterAdded, setIsBgCharacterAdded] = useState(() => loadState('isBgCaracterAdded', false, JSON.parse));

  // Изменение фона для всей страницы
  useEffect(() => {
    if (backgroundImage) {
      document.body.style.backgroundImage = `url(${backgroundImage})`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundRepeat = 'no-repeat';
    } else {
      document.body.style.backgroundImage = 'none';
    }
  }, [backgroundImage]);

  const resetShop = (resetAdditionalStates = false) => {
    // Сброс состояний, связанных с магазином
    setUpgrades(UpgradesParams);
    setBusters(BustersParams);
    setIsDiscountExists(false);
    setDnkUpgrades(DnkUpgradesParams);
    setMultiplier(30);
    setPriceMultiplier(1);
    setIncreaseMultiplier(1);
    setCooldownDiscount(1);
    setDiamondPurchases(DiamondPurchasesParams);
    setBackgroundImage(null);
    setCursorImage(null);
    setIsClientImgAdded(false);
    setBackgroundRightImage(true);
  
    // Очистка localStorage
    const keysToRemove = [
      'upgrades', 'busters', 'isDiscountExists', 'dnkUpgrades', 'multiplier',
      'priceMultiplier', 'increaseMultiplier', 'cooldownDiscount', 'diamondPurchases',
      'backgroundImage', 'cursorImage', 'isClientImgAdded', 'backgroundRightImage',
    ];
  
    keysToRemove.forEach(key => localStorage.removeItem(key));
  };

  // Сохранение состояний в localStorage
  useEffect(() => {
    const stateToSave = {
      upgrades: JSON.stringify(upgrades, (key, value) => (typeof value === 'bigint' ? `${value}n` : value)),
      isDiscountExists: JSON.stringify(isDiscountExists),
      busters: JSON.stringify(busters, (key, value) => (typeof value === 'bigint' ? `${value}n` : value)),
      multiplier: multiplier.toString(),
      priceMultiplier: priceMultiplier.toString(),
      increaseMultiplier: increaseMultiplier.toString(),
      cooldownDiscount: cooldownDiscount.toString(),
      dnkUpgrades: JSON.stringify(dnkUpgrades, (key, value) => (typeof value === 'bigint' ? `${value}n` : value)),
      backgroundImage,
      cursorImage,
      isClientImgAdded: JSON.stringify(isClientImgAdded),
      backgroundRightImage: JSON.stringify(backgroundRightImage),
      backgroundLeftImage: JSON.stringify(backgroundLeftImage),
      isBgCharacterAdded: JSON.stringify(isBgCharacterAdded),
      diamondPurchases: JSON.stringify(diamondPurchases),
    };

    Object.entries(stateToSave).forEach(([key, value]) => saveState(key, value));
  }, [upgrades, isDiscountExists, busters, multiplier, priceMultiplier, increaseMultiplier, cooldownDiscount, dnkUpgrades, backgroundImage, cursorImage, isClientImgAdded, backgroundRightImage, backgroundLeftImage, isBgCharacterAdded,diamondPurchases]);

  return (
    <ShopContext.Provider
      value={{
        upgrades: {
          upgrades, setUpgrades,
        },

        busters: {
          busters, setBusters,
          isDiscountExists, setIsDiscountExists,
          formatTime,
        },

        dnk: {
          dnkUpgrades, setDnkUpgrades,
          multiplier, setMultiplier,
          priceMultiplier, setPriceMultiplier,
          increaseMultiplier, setIncreaseMultiplier,
          cooldownDiscount, setCooldownDiscount,
        },

        skins: {
          diamondPurchases, setDiamondPurchases,
          backgroundImage, setBackgroundImage,
          cursorImage, setCursorImage,
          isClientImgAdded, setIsClientImgAdded,
          backgroundRightImage, setBackgroundRightImage,
          backgroundLeftImage, setBackgroundLeftImage,
          isBgCharacterAdded, setIsBgCharacterAdded,
        },

        resetShop,

      }}
    >
      {children}
    </ShopContext.Provider>
  );
};