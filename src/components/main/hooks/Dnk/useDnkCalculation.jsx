import { useBigIntState } from '../useBigIntState';
import React, { useEffect, } from 'react';

export const useDnk = () => {
  const [countDnk, setCountDnk] = useBigIntState('countDnk', '0');

  const resetDna = () => {
    setCountDnk(BigInt('0'));
  };

  return {
    countDnk,
    setCountDnk,
    resetDna
  };
};

export const useDnkCalculation = (pasIncreaseMoney, setCountDnk) => {
  useEffect(() => {
    if (!pasIncreaseMoney || !setCountDnk ) return;

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
  }, [pasIncreaseMoney, setCountDnk]);
};