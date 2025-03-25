import { useCallback } from 'react';

export const useProgress = () => {
  const calculateProgress = useCallback((countDnk, pasIncreaseMoney) => {
    const divisor = 1000000000000000000n;
    const nextDnkLevel = countDnk + 1n;
    const prevRequiredPasIncrease = BigInt(3n ** countDnk * divisor - 1n);
    const newRequiredPasIncrease = 3n ** nextDnkLevel * divisor;

    const curProgressForShow = Number(
      ((pasIncreaseMoney - prevRequiredPasIncrease) * 100n) /
      (newRequiredPasIncrease - prevRequiredPasIncrease)
    );

    return {
      progressForShow: curProgressForShow,
      requiredPasIncrease: newRequiredPasIncrease,
    };
  }, []);

  return {
    calculateProgress,
  };
};