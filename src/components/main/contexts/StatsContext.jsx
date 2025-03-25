import React, { createContext, useContext, useEffect, useState } from 'react';
import { useActiveIncome } from '../hooks/useActiveIncome.jsx';
import { usePassiveIncome, usePassiveIncomeEffect } from '../hooks/usePassiveIncome.jsx';
import { useDna, useDnaCalculation } from '../hooks/useDnaCalculation.jsx';
import { useBigIntState } from '../hooks/useBigIntState.jsx';
import { loadState, saveState } from '../../../js/storage.js';

const StatsContext = createContext();

export const useStatsContext = () => {
  const context = useContext(StatsContext);
  if (!context) {
    throw new Error("Can not 'useStatsContext' outside of the 'StatsProvider'");
  }
  return context;
};

export const StatsProvider = ({ children }) => {
  const activeIncome = useActiveIncome();
  const passiveIncome = usePassiveIncome();
  const dna = useDna();

  const [countDiamond, setCountDiamond] = useBigIntState('countDiamond', '30');
  const [minDelay, setMinDelay] = useState(() => {
    const loaded = loadState('minDelay');
    return loaded ? parseInt(loaded) : 10000;
  });
  const [maxDelay, setMaxDelay] = useState(() => {
    const loaded = loadState('maxDelay');
    return loaded ? parseInt(loaded) : 20000;
  });
  const [end, setEnd] = useState(() => {
    const loaded = loadState('end');
    return loaded ? JSON.parse(loaded) : false;
  });

  // Подключение эффектов с проверкой
  usePassiveIncomeEffect(passiveIncome.pasIncreaseMoney, activeIncome.setCountMoney);
  useDnaCalculation(passiveIncome.pasIncreaseMoney, dna.setCountDnk);

  const resetStats = (resetAdditionalStates = false) => {
    activeIncome.resetActiveIncome();
    passiveIncome.resetPassiveIncome();
    dna.resetDna();
    setCountDiamond(BigInt('10'));
    setMinDelay(300000);
    setMaxDelay(600000);
    setEnd(false);

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

  // Сохранение оставшихся состояний
  useEffect(() => {
    saveState('minDelay', minDelay.toString());
    saveState('maxDelay', maxDelay.toString());
    saveState('end', JSON.stringify(end));
  }, [minDelay, maxDelay, end]);

  return (
    <StatsContext.Provider
      value={{
        counters: {
          countMoney: activeIncome.countMoney,
          setCountMoney: activeIncome.setCountMoney,
          countDnk: dna.countDnk,
          setCountDnk: dna.setCountDnk,
          countDiamond,
          setCountDiamond,
          incrementCountMoneyForClick: activeIncome.incrementCountMoneyForClick,
        },
        increases: {
          pasIncreaseMoney: passiveIncome.pasIncreaseMoney,
          setPasIncreaseMoney: passiveIncome.setPasIncreaseMoney,
          actIncreaseMoney: activeIncome.actIncreaseMoney,
          setActIncreaseMoney: activeIncome.setActIncreaseMoney,
        },
        delay: {
          minDelay,
          setMinDelay,
          maxDelay,
          setMaxDelay,
        },
        end: {
          end,
          setEnd,
        },
        resetStats
      }}
    >
      {children}
    </StatsContext.Provider>
  );
};