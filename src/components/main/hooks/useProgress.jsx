import { useCallback, useEffect } from 'react';
import { useShopContext } from '../../main/contexts/ShopContext.jsx';
import { useStatsContext } from '../contexts/StatsContext'; 

export const useProgress = () => {

  const calculateProgress = useCallback(() => {
    const {
      counters: { countDnk },
      increases: { pasIncreaseMoney },
    } = useStatsContext();

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