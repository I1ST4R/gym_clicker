import { updateArray } from '../../../../js/updateArray.js';
import { useStatsContext } from '../../contexts/StatsContext.jsx';
import { useShopContext } from '../../contexts/ShopContext.jsx';

export const useBusterLevelChange = () => {
  const {
    increases: { pasIncreaseMoney, setPasIncreaseMoney},
  } = useStatsContext();
  const {
    busters: {busters, setBusters} 
  } = useShopContext();

  const busterLevelChange = (id) => {
  
    const targetBuster = busters.find(b => b.id === id);
    const isMaxLevel = targetBuster.level >= targetBuster.maxLvl;
    const isEnoughClients = pasIncreaseMoney >= targetBuster.initialPrice;
  
    if (!isEnoughClients || isMaxLevel) return
  
    setPasIncreaseMoney(pasIncreaseMoney - BigInt(Math.floor(targetBuster.initialPrice)))
    const isFirstLevel = targetBuster.level === 0;
  
    updateArray(
      setBusters, {
      level: targetBuster.level + 1,
      initialPrice: targetBuster.initialPrice * 1.16,
      cooldown: isFirstLevel ? targetBuster.cooldown : targetBuster.cooldown * 0.93
    },
      id
    );
  }

  return busterLevelChange
}