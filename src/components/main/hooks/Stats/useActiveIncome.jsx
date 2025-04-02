
import { useBigIntState } from '../useBigIntState';

export const useActiveIncome = () => {
  const [actIncreaseMoney, setActIncreaseMoney] = useBigIntState('actIncreaseMoney', '1');
  const [countMoney, setCountMoney] = useBigIntState('countMoney', '0');

  const incrementCountMoneyForClick = () => {
    setCountMoney(prev => prev + actIncreaseMoney);
  };

  const resetActiveIncome = () => {
    setActIncreaseMoney(1n);
    setCountMoney(150n);
  };

  return {
    actIncreaseMoney,
    setActIncreaseMoney,
    countMoney,
    setCountMoney,
    incrementCountMoneyForClick,
    resetActiveIncome
  };
};

export default useActiveIncome;