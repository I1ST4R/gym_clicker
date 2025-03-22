import React, { createContext, useContext, useEffect } from 'react';
import { useBusterTimers } from './hooks/useBusterTimers';
import { useBusterCooldown } from './hooks/useBusterCooldown';
import { useUpgrades } from './hooks/useUpgrades';
import { useBusters } from './hooks/useBusters';
import { useDnk } from './hooks/useDnk';
import { useSkins } from './hooks/useSkins';
import { loadState, saveState } from '../../js/storage.js';
import BustersParams from '../../js/BustersParams.js';
import UpgradesParams from '../../js/UpgradesParams.js';
import DnkUpgradesParams from '../../js/DnkUpgradesParams.js';
import DiamondPurchasesParams from '../../js/DiamondPurchasesParams.js';

const ShopContext = createContext();

export const useShopContext = () => {
  const data = useContext(ShopContext);

  if (!data) {
    throw new Error("Can not 'useShopContext' outside of the 'ShopProvider'");
  }

  return data;
};

export const ShopProvider = ({ children }) => {
  const upgrades = useUpgrades();
  const busters = useBusters();
  const dnk = useDnk();
  const skins = useSkins();

  const resetShop = () => {
    upgrades.setUpgrades(UpgradesParams);
    busters.setBusters(BustersParams);
    busters.setIsDiscountExists(false);
    skins.setDiamondPurchases(DiamondPurchasesParams);
    skins.setBackgroundImage(null);
    skins.setCursorImage(null);
    skins.setIsClientImgAdded(false);
    skins.setBackgroundRightImage(true);
    skins.setBackgroundLeftImage(true);
    skins.setIsBgCharacterAdded(false);

    const keysToRemove = [
      'upgrades', 'busters', 'isDiscountExists', 'dnkUpgrades', 'multiplier',
      'priceMultiplier', 'increaseMultiplier', 'cooldownDiscount', 'diamondPurchases',
      'backgroundImage', 'cursorImage', 'isClientImgAdded', 'backgroundRightImage',
    ];

    keysToRemove.forEach((key) => localStorage.removeItem(key));
  };

  return (
    <ShopContext.Provider
      value={{
        upgrades,
        busters,
        dnk,
        skins,
        resetShop,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};