import { useBigIntState } from '../useBigIntState.jsx';
import { loadState, saveState} from '../../../../js/storage.js';
import React, { useEffect, useState } from 'react';

export const usePassiveIncome = () => {

  const [pasIncreaseMoney, setPasIncreaseMoney] = useBigIntState('pasIncreaseMoney', '1000000');

  const [isPassiveIncreaseChanged, setIsPassiveIncreaseChanged] = useState(() => {
    const loaded = loadState('isPassiveIncreaseChanged');
    return loaded ? JSON.parse(loaded) : false;
  });

  const resetPassiveIncome = () => {
    setPasIncreaseMoney(BigInt('0'));
  };

  const usePassiveIncomeEffect = (setCountMoney) => {

    useEffect(() => {
      if (!pasIncreaseMoney || !setCountMoney) return;
  
      const interval = setInterval(() => {
        let increase = BigInt(pasIncreaseMoney)
        if (isPassiveIncreaseChanged) {
          increase = BigInt(7n * pasIncreaseMoney)
        }
        setCountMoney(prev => prev + increase);
      }, 1000);
  
      return () => clearInterval(interval);
    }, [pasIncreaseMoney, setCountMoney]);
  };

  return {
    pasIncreaseMoney,
    setPasIncreaseMoney,
    isPassiveIncreaseChanged,
    setIsPassiveIncreaseChanged,
    resetPassiveIncome,
    usePassiveIncomeEffect
  };
};

