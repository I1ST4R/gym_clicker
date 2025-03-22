import { useState, useEffect } from 'react';
import { loadState, saveState, bigIntParser } from '../../../js/storage.js';
import DnkUpgradesParams from '../../../js/DnkUpgradesParams.js';

export const useDnk = () => {
  const [dnkUpgrades, setDnkUpgrades] = useState(() => loadState('dnkUpgrades', DnkUpgradesParams, (val) => JSON.parse(val, bigIntParser)));
  const [multiplier, setMultiplier] = useState(() => loadState('multiplier', 30, parseInt));
  const [priceMultiplier, setPriceMultiplier] = useState(() => loadState('priceMultiplier', 1, parseInt));
  const [increaseMultiplier, setIncreaseMultiplier] = useState(() => loadState('increaseMultiplier', 1, parseInt));
  const [cooldownDiscount, setCooldownDiscount] = useState(() => loadState('cooldownDiscount', 1, parseInt));

  // Сохранение состояний в localStorage
  useEffect(() => {
    saveState('dnkUpgrades', JSON.stringify(dnkUpgrades, (key, value) => (typeof value === 'bigint' ? `${value}n` : value)));
  }, [dnkUpgrades]);

  useEffect(() => {
    saveState('multiplier', multiplier.toString());
  }, [multiplier]);

  useEffect(() => {
    saveState('priceMultiplier', priceMultiplier.toString());
  }, [priceMultiplier]);

  useEffect(() => {
    saveState('increaseMultiplier', increaseMultiplier.toString());
  }, [increaseMultiplier]);

  useEffect(() => {
    saveState('cooldownDiscount', cooldownDiscount.toString());
  }, [cooldownDiscount]);

  const handleDnkLevelChange = (id, countDnk, setCountDnk, minDelay, setMinDelay, maxDelay, setMaxDelay) => {
    const updatedDnkUpgrades = dnkUpgrades.map((dnkUpgrade) => {
      if (dnkUpgrade.id === id) {
        setCountDnk(countDnk - 1n);
        const updatedDUpgrade = {
          ...dnkUpgrade,
          level: dnkUpgrade.level + 1,
        };
        let increase = Math.pow(1.01, dnkUpgrade.level);
        let decrease = Math.pow(0.99, dnkUpgrade.level);
        switch (id) {
          case 1:
            setPriceMultiplier(decrease);
            break;
          case 2:
            setIncreaseMultiplier(increase);
            break;
          case 3:
            setCooldownDiscount(decrease);
            break;
          case 4:
            setMaxDelay(Math.floor(maxDelay * 0.99));
            setMinDelay(Math.floor(minDelay * 0.99));
            break;
          case 5:
            setMultiplier(multiplier * 1.01);
            break;
          default:
            break;
        }
        return updatedDUpgrade;
      }
      return dnkUpgrade;
    });
    setDnkUpgrades(updatedDnkUpgrades);
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
    handleDnkLevelChange,
  };
};