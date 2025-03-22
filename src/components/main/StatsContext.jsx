import React, { createContext, useState, useContext, useEffect } from 'react';
import { loadState, saveState, bigIntParser } from '../../js/storage.js';

const StatsContext = createContext();

export const useStatsContext = () => {
  const data = useContext(StatsContext)

  if (!data) {
    throw new Error("Can not 'useStatsContext' outside of the 'StatsProvider'")
  }

  return data
}

export const StatsProvider = ({ children }) => {

  //counters:
  const [countMoney, setCountMoney] = useState(() => loadState('countMoney', BigInt('15000'), BigInt));
  const [countDnk, setCountDnk] = useState(() => loadState('countDnk', BigInt('0'), BigInt));
  const [countDiamond, setCountDiamond] = useState(() => loadState('countDiamond', BigInt('30'), BigInt));

  //increases:
  const [pasIncreaseMoney, setPasIncreaseMoney] = useState(() => loadState('pasIncreaseMoney', BigInt('10000000000000000000000000'), BigInt));
  const [actIncreaseMoney, setActIncreaseMoney] = useState(() => loadState('actIncreaseMoney', BigInt('1'), BigInt));

  //delay:
  const [minDelay, setMinDelay] = useState(() => loadState('minDelay', 10000, parseInt));
  const [maxDelay, setMaxDelay] = useState(() => loadState('maxDelay', 20000, parseInt));

  //end:
  const [end, setEnd] = useState(() => loadState('end', false, JSON.parse));

  //расчет активного дохода (за клик)
  const incrementCountMoneyForClick = () => {
    setCountMoney((prevCountMoney) => prevCountMoney + actIncreaseMoney);
  };

  //расчет пассивного дохода (в сек.)
  useEffect(() => {
    const interval = setInterval(() => {
      setCountMoney((prevCountMoney) => prevCountMoney + pasIncreaseMoney);
    }, 1000);
    return () => clearInterval(interval);
  }, [pasIncreaseMoney, setCountMoney]);

  //расчет днк
  useEffect(() => {
    const log3 = (value) => {
      if (value < 3n) return 0n;
      let count = 0n;
      while (value >= 3n) {
        value /= 3n;
        count += 1n;
      }
      return count;
    };

    const divisor = 1000000000000000000n;
    const increaseDnk = log3(pasIncreaseMoney / divisor);
    setCountDnk(increaseDnk);
  }, [pasIncreaseMoney]);

  const resetStats = (resetAdditionalStates = false) => {
    // Стандартный сброс
    setCountMoney(BigInt('150'));
    setPasIncreaseMoney(BigInt('0'));
    setActIncreaseMoney(BigInt('1'));
    setCountDnk(BigInt('0'));
    setCountDiamond(BigInt('10'));
    setMinDelay(300000);
    setMaxDelay(600000);
    setEnd(false);
  
    // Очистка localStorage
    const keysToRemove = [
      'countMoney', 'pasIncreaseMoney', 'actIncreaseMoney', 'countDnk', 'countDiamond',
      'minDelay', 'maxDelay', 'end',
    ];
  
    if (resetAdditionalStates) {
      keysToRemove.push(
        'multiplier', 'priceMultiplier', 'increaseMultiplier', 'cooldownDiscount'
      );
    }
  
    keysToRemove.forEach(key => localStorage.removeItem(key));
  };

  // Сохранение состояний в localStorage
  useEffect(() => {
    const stateToSave = {
      countMoney: countMoney.toString(),
      countDnk: countDnk.toString(),
      countDiamond: countDiamond.toString(),
      pasIncreaseMoney: pasIncreaseMoney.toString(),
      actIncreaseMoney: actIncreaseMoney.toString(),
      minDelay: minDelay.toString(),
      maxDelay: maxDelay.toString(),
      end: JSON.stringify(end),
    };

    Object.entries(stateToSave).forEach(([key, value]) => saveState(key, value));
  }, [countMoney, countDnk, countDiamond, pasIncreaseMoney, actIncreaseMoney, minDelay, maxDelay, end]);

  return (
    <StatsContext.Provider
      value={{
        counters: {
          countMoney, setCountMoney,
          countDnk, setCountDnk,
          countDiamond, setCountDiamond,
          incrementCountMoneyForClick,
        },

        increases: {
          pasIncreaseMoney, setPasIncreaseMoney,
          actIncreaseMoney, setActIncreaseMoney,
        },

        delay: {
          minDelay, setMinDelay,
          maxDelay, setMaxDelay,
        },

        end: {
          end, setEnd,
        },

        resetStats
      }}
    >
      {children}
    </StatsContext.Provider>
  );
};