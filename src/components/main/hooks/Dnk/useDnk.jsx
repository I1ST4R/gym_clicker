import { useState, useEffect } from 'react';
import { loadState, saveState, bigIntParser } from '../../../../js/storage.js';
import DnkUpgradesParams from '../../../../js/DnkUpgradesParams.js';
import { useDnkLevelChange } from './useDnkLevelChange.jsx';

export const useDnk = () => {
  const [dnkUpgrades, setDnkUpgrades] = useState(() => 
    loadState('dnkUpgrades', DnkUpgradesParams, (val) => JSON.parse(val, bigIntParser)));
  const [multiplier, setMultiplier] = useState(() => 
    loadState('multiplier', 30, parseInt));
  const [priceMultiplier, setPriceMultiplier] = useState(() => 
    loadState('priceMultiplier', 1, parseFloat));
  const [increaseMultiplier, setIncreaseMultiplier] = useState(() => 
    loadState('increaseMultiplier', 1, parseFloat));
  const [cooldownDiscount, setCooldownDiscount] = useState(() => 
    loadState('cooldownDiscount', 1, parseFloat));

  useEffect(() => {
    saveState('dnkUpgrades', JSON.stringify(dnkUpgrades, (key, value) => 
      typeof value === 'bigint' ? `${value}n` : value));
    saveState('multiplier', multiplier.toString());
    saveState('priceMultiplier', priceMultiplier.toString());
    saveState('increaseMultiplier', increaseMultiplier.toString());
    saveState('cooldownDiscount', cooldownDiscount.toString());
  }, [dnkUpgrades, multiplier, priceMultiplier, increaseMultiplier, cooldownDiscount]);

  const reset = (resetAdditionalStates) => {
    if (resetAdditionalStates){
      setDnkUpgrades(DnkUpgradesParams)
      setMultiplier(30)
      setPriceMultiplier(1)
      setIncreaseMultiplier(1)
      setCooldownDiscount(1)
    }
  };

  return {
    dnkUpgrades,
    setDnkUpgrades,
    multiplier,
    setMultiplier,
    priceMultiplier,
    setPriceMultiplier,
    increaseMultiplier,
    setIncreaseMultiplier,
    cooldownDiscount,
    setCooldownDiscount,
    useDnkLevelChange,
    reset
  };
};