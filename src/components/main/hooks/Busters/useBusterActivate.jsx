import { useStatsContext } from '../../contexts/StatsContext.jsx';
import { updateArray } from '../../../../js/updateArray.js';
import { useShopContext } from '../../contexts/ShopContext.jsx';

export const useBusterActivate = () => {

  const {
    busters: 
    { busters, setBusters, setIsDiscountExists},
  } = useShopContext();
  const {
    counters: { setCountMoney, countMoney },
    increases: {
      pasIncreaseMoney,
      setPasIncreaseMoney,
      setIsPassiveIncreaseChanged,
      actIncreaseMoney,
      setActIncreaseMoney,
    }
  } = useStatsContext();

  const busterActivate = (id) => {

    const targetBuster = busters.find(b => b.id === id);
    const time = targetBuster.time
    if (targetBuster.level === 0) return;

    const activateBuster = () => {
      updateArray(setBusters, { isActive: true, isReady: false }, id);
    };

    const deactivateBuster = () => {
      updateArray(setBusters, { isActive: false}, id);
    };

    const doChange = (newValue, setValue, prevValue = newValue) => {
      setValue(newValue);
      activateBuster()

      setTimeout(() => {
        setValue(prevValue);
        deactivateBuster();
      }, time);
    };

    switch (id) {
      case 1:
        doChange(pasIncreaseMoney, setActIncreaseMoney, actIncreaseMoney)
        break;
      case 2:
        console.log(2)
        setIsPassiveIncreaseChanged(true)
        doChange(true, setIsPassiveIncreaseChanged, false)
        break;
      case 3:
        doChange(countMoney + pasIncreaseMoney * 50n, setCountMoney,)
        break;
      case 4:
        const newValue = pasIncreaseMoney <= 10000n
          ? BigInt(Math.floor(Number(pasIncreaseMoney) * 1.05))
          : (pasIncreaseMoney * 105n) / 100n;
        doChange(newValue, setPasIncreaseMoney,)
        break;
      case 5:
        doChange(true, setIsDiscountExists,)
        break;
    }

  }

  return busterActivate

};