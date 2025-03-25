import { useBigIntState } from './useBigIntState';
import React, { useEffect} from 'react';

export const usePassiveIncome = () => {
  const [pasIncreaseMoney, setPasIncreaseMoney] = useBigIntState('pasIncreaseMoney', '10000000000000000000000000');

  const resetPassiveIncome = () => {
    setPasIncreaseMoney(BigInt('0'));
  };

  return {
    pasIncreaseMoney,
    setPasIncreaseMoney,
    resetPassiveIncome
  };
};

export const usePassiveIncomeEffect = (pasIncreaseMoney, setCountMoney) => {
  useEffect(() => {
    if (!pasIncreaseMoney || !setCountMoney) return;
    
    const interval = setInterval(() => {
      setCountMoney(prev => prev + pasIncreaseMoney);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [pasIncreaseMoney, setCountMoney]);
};