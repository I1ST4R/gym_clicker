import { useState, useEffect } from 'react';
import { loadState, saveState, bigIntParser } from '../../../js/storage.js';
import BustersParams from '../../../js/BustersParams.js';

export const useBusters = () => {
  const [busters, setBusters] = useState(() => loadState('busters', BustersParams, (val) => JSON.parse(val, bigIntParser)));
  const [isDiscountExists, setIsDiscountExists] = useState(() => loadState('isDiscountExists', false, JSON.parse));

  // Сохранение busters в localStorage
  useEffect(() => {
    saveState('busters', JSON.stringify(busters, (key, value) => (typeof value === 'bigint' ? `${value}n` : value)));
  }, [busters]);

  // Сохранение isDiscountExists в localStorage
  useEffect(() => {
    saveState('isDiscountExists', JSON.stringify(isDiscountExists));
  }, [isDiscountExists]);

  const handleBusterLevelChange = (id) => {
    const updatedBusters = busters.map((buster) => {
      if (buster.id === id) {
        const isFirstLevel = buster.level === 0;
        return {
          ...buster,
          level: buster.level + 1,
          initialPrice: buster.initialPrice * 1.16,
          cooldown: isFirstLevel ? buster.cooldown : buster.cooldown * 0.93,
        };
      }
      return buster;
    });
    setBusters(updatedBusters);
  };

  const handleActivateBuster = (id, time, cooldownDiscount, statsContext) => {
    const updatedBusters = busters.map((buster) => {
      if (buster.id === id) {
        return {
          ...buster,
          curCooldown: Math.floor(buster.cooldown * cooldownDiscount),
          isActive: false,
        };
      }
      return buster;
    });
    setBusters(updatedBusters);

    // Логика активации бустера
    const buster = busters.find((b) => b.id === id);
    if (!buster || buster.level === 0) return;

    const { setCountMoney, pasIncreaseMoney, setPasIncreaseMoney, actIncreaseMoney, setActIncreaseMoney } = statsContext;

    switch (id) {
      case 1:
        const actIncreaseMoneyBefore = actIncreaseMoney;
        setActIncreaseMoney(pasIncreaseMoney);
        setTimeout(() => {
          setActIncreaseMoney(actIncreaseMoneyBefore);
        }, time);
        break;
      case 2:
        const pasIncreaseMoneyBefore = pasIncreaseMoney;
        setPasIncreaseMoney(pasIncreaseMoney * BigInt(7));
        setTimeout(() => {
          setPasIncreaseMoney(pasIncreaseMoneyBefore);
        }, time);
        break;
      case 3:
        setTimeout(() => {
          setCountMoney(pasIncreaseMoney * BigInt(50));
        }, time);
        break;
      case 4:
        let newPasIncreaseMoney = BigInt('0');
        setTimeout(() => {
          if (pasIncreaseMoney <= 10000) {
            newPasIncreaseMoney = BigInt(Math.floor(Number(pasIncreaseMoney) * 1.05));
          } else {
            newPasIncreaseMoney = (pasIncreaseMoney * BigInt(105)) / BigInt(100);
          }
          setPasIncreaseMoney(newPasIncreaseMoney);
        }, time);
        break;
      case 5:
        setIsDiscountExists(true);
        break;
      default:
        break;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return minutes > 0 ? `${minutes} мин. ${seconds} сек.` : `${seconds} сек.`;
  };

  return {
    busters,
    setBusters,
    isDiscountExists,
    setIsDiscountExists,
    handleBusterLevelChange,
    handleActivateBuster,
    formatTime,
  };
};