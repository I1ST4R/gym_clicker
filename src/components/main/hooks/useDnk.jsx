import { useState, useEffect } from 'react';
import { loadState, saveState, bigIntParser } from '../../../js/storage.js';
import DnkUpgradesParams from '../../../js/DnkUpgradesParams.js';
import { useReset } from './useReset.jsx';

export const useDnk = () => {
  const [dnkUpgrades, setDnkUpgrades] = useState(() => 
    loadState('dnkUpgrades', DnkUpgradesParams, (val) => JSON.parse(val, bigIntParser)));
  const [multiplier, setMultiplier] = useState(() => 
    loadState('multiplier', 30, parseInt));
  const [priceMultiplier, setPriceMultiplier] = useState(() => 
    loadState('priceMultiplier', 1, parseInt));
  const [increaseMultiplier, setIncreaseMultiplier] = useState(() => 
    loadState('increaseMultiplier', 1, parseInt));
  const [cooldownDiscount, setCooldownDiscount] = useState(() => 
    loadState('cooldownDiscount', 1, parseInt));

  useEffect(() => {
    saveState('dnkUpgrades', JSON.stringify(dnkUpgrades, (key, value) => 
      typeof value === 'bigint' ? `${value}n` : value));
    saveState('multiplier', multiplier.toString());
    saveState('priceMultiplier', priceMultiplier.toString());
    saveState('increaseMultiplier', increaseMultiplier.toString());
    saveState('cooldownDiscount', cooldownDiscount.toString());
  }, [dnkUpgrades, multiplier, priceMultiplier, increaseMultiplier, cooldownDiscount]);

  const handleDnkLevelChange = (id, countDnk, setCountDnk, minDelay, setMinDelay, maxDelay, setMaxDelay) => {
    setDnkUpgrades(prev => prev.map(dnkUpgrade => {
      if (dnkUpgrade.id === id) {
        setCountDnk(countDnk - 1n);
        const increase = Math.pow(1.01, dnkUpgrade.level);
        const decrease = Math.pow(0.99, dnkUpgrade.level);

        switch (id) {
          case 1: setPriceMultiplier(decrease); break;
          case 2: setIncreaseMultiplier(increase); break;
          case 3: setCooldownDiscount(decrease); break;
          case 4: 
            setMaxDelay(Math.floor(maxDelay * 0.99));
            setMinDelay(Math.floor(minDelay * 0.99));
            break;
          case 5: setMultiplier(multiplier * 1.01); break;
        }

        return { ...dnkUpgrade, level: dnkUpgrade.level + 1 };
      }
      return dnkUpgrade;
    }));
  };

  const { reset } = useReset({
    stateSetters: {
      dnkUpgrades: setDnkUpgrades,
      multiplier: setMultiplier,
      priceMultiplier: setPriceMultiplier,
      increaseMultiplier: setIncreaseMultiplier,
      cooldownDiscount: setCooldownDiscount
    },
    initialState: {
      dnkUpgrades: DnkUpgradesParams,
      multiplier: 30,
      priceMultiplier: 1,
      increaseMultiplier: 1,
      cooldownDiscount: 1
    }
  });

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
    handleDnkLevelChange,
    reset
  };
};