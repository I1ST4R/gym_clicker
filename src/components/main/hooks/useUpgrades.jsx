import { useState, useEffect } from 'react';
import { loadState, saveState, bigIntParser } from '../../../js/storage.js';
import { useReset } from './useReset.jsx';
import UpgradesParams from '../../../js/UpgradesParams.js';

export const useUpgrades = () => {
  const [upgrades, setUpgrades] = useState(() => loadState('upgrades', UpgradesParams, (val) => JSON.parse(val, bigIntParser)));

  useEffect(() => {
    saveState('upgrades', JSON.stringify(upgrades, (key, value) => (typeof value === 'bigint' ? `${value}n` : value)));
  }, [upgrades]);

  const handleUpgradeLevelChange = (id, busters, dnk, statsContext) => {

    const {
      isDiscountExists, 
      setIsDiscountExists
    } = busters;

    const {
      priceMultiplier,
      increaseMultiplier,
    } = dnk;

    const {
      countMoney,
      setCountMoney,
      pasIncreaseMoney,
      setPasIncreaseMoney,
      actIncreaseMoney,
      setActIncreaseMoney,
    } = statsContext;

    const updatedUpgrades = upgrades.map((upgrade) => {
      if (upgrade.id === id) {
        const isSmallNumber = upgrade.id < 7;
        const difference = !upgrade.isIncreaseMoney ? 0.035 : 0;
        let newIncrease, newPrice, BigIntInc, updatedUpgrade;

        if (isSmallNumber) {
          const initialIncreaseNumber = Number(upgrade.initialIncrease);
          BigIntInc = BigInt(Math.floor(initialIncreaseNumber * increaseMultiplier));
          newIncrease = initialIncreaseNumber * (1.15 - difference) * increaseMultiplier;
          newPrice = Number(upgrade.initialPrice) * 1.16;
        } else {
          BigIntInc = (upgrade.initialIncrease / 100n) * BigInt(Math.floor(increaseMultiplier * 100));
          const diffMultiplier = BigInt(Math.ceil((1.15 - difference) * 100));
          newIncrease = (upgrade.initialIncrease / 100n) * diffMultiplier;
          newPrice = (upgrade.initialPrice / 100n) * 116n;
        }

        if (upgrade.isIncreaseMoney) {
          setActIncreaseMoney(actIncreaseMoney + BigIntInc);
        } else {
          setPasIncreaseMoney(pasIncreaseMoney + BigIntInc);
        }

        updatedUpgrade = {
          ...upgrade,
          level: upgrade.level + 1,
          initialIncrease: newIncrease,
          initialPrice: newPrice,
        };

        return updatedUpgrade;
      }
      return upgrade;
    });

    setIsDiscountExists(false)
    setUpgrades(updatedUpgrades);
    setCountMoney(countMoney - calculateUpgradePrice(id, isDiscountExists, priceMultiplier));
  };


  const changeVisibility = (countMoney) =>   {
    const updatedUpgrades = upgrades.map((upgrade) => {
      let updatedUpgrade
      if(upgrade.initialPrice <= countMoney && upgrade.isInvisible){
        updatedUpgrade = {
          ...upgrade,
          isInvisible : false,
        }
        return updatedUpgrade
      }
      return upgrade;
    })
    setUpgrades(updatedUpgrades);
  }

  const calculateUpgradePrice = (id, isDiscountExists, priceMultiplier) => {
    const upgrade = upgrades.find((u) => u.id === id);
    if (!upgrade) return BigInt(0);

    const discount = (isDiscountExists ? 1 : 2) / 2;

    let priceWithMults, initialPrice;

    if (id < 7) {
      initialPrice = Number(upgrade.initialPrice);
      priceWithMults = Math.floor(initialPrice * priceMultiplier * discount);
      return BigInt(priceWithMults);
    } else {
      initialPrice = BigInt(upgrade.initialPrice) / 1000n;
      const dnkMult = BigInt(Math.floor(priceMultiplier * 100));
      const discountBigInt = BigInt(Math.floor(discount * 10));
      priceWithMults = (initialPrice / 1000n) * dnkMult * discountBigInt;
      return priceWithMults;
    }
  };

  const isEnoughMoneyForUpgrade = (id, countMoney, isDiscountExists, priceMultiplier) => {
    const price = calculateUpgradePrice(id, isDiscountExists, priceMultiplier);
    return countMoney >= price;
  };

  const { reset } = useReset({
    stateSetters: { upgardes: setUpgrades },
    initialState: { upgardes: UpgradesParams }
  });

  return {
    upgrades,
    setUpgrades,
    handleUpgradeLevelChange,
    calculateUpgradePrice,
    isEnoughMoneyForUpgrade,
    changeVisibility,
    reset,
  };
};