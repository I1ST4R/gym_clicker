import React, { createContext, useContext, useEffect } from 'react';
import { useUpgrades } from '../hooks/Upgrades/useUpgrades';
import { useBusters } from '../hooks/Busters/useBusters';
import { useDnk } from '../hooks/Dnk/useDnk';
import { useSkins } from '../hooks/useSkins';

const ShopContext = createContext();

export const useShopContext = () => {
  const data = useContext(ShopContext);
  
  return data;
};

export const ShopProvider = ({ children }) => {
  const upgrades = useUpgrades();
  const busters = useBusters();
  const dnk = useDnk();
  const skins = useSkins();

  const resetShop = (resetAdditionalStates = false) => {
    busters.reset(resetAdditionalStates)
    upgrades.reset(resetAdditionalStates)
    skins.reset(resetAdditionalStates)
    dnk.reset(resetAdditionalStates)
  }

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