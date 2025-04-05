import { updateArray } from '../../../../js/updateArray.js';
import { useStatsContext } from '../../contexts/StatsContext';
import { useShopContext } from '../../contexts/ShopContext';
import dnk from '../../../../../public/sounds/dnk.mp3';

export const useDnkLevelChange = (id) => {
  const {
    counters: { countDnk, setCountDnk },
    delay: { minDelay, setMinDelay, maxDelay, setMaxDelay }
  } = useStatsContext()

  const { dnk: { 
    multiplier, 
    setMultiplier, 
    setPriceMultiplier,
    setIncreaseMultiplier, 
    setCooldownDiscount, 
    setDnkUpgrades, 
    dnkUpgrades 
  } } = useShopContext()

  const handleDnkLevelChange = () => {

    new Audio(dnk).play();

    const dnkUpgrade = dnkUpgrades.find(d => d.id === id)
    const increase = Math.pow(1.01, dnkUpgrade.level);
    const decrease = Math.pow(0.99, dnkUpgrade.level);

    switch (id) {
      case 1:{
        setPriceMultiplier(decrease); 
        break;
      } 
      case 2: setIncreaseMultiplier(increase); break;
      case 3: setCooldownDiscount(decrease); break;
      case 4: 
        setMaxDelay(Math.floor(maxDelay * 0.99));
        setMinDelay(Math.floor(minDelay * 0.99));
        break;
      case 5: setMultiplier(multiplier * 1.01); break;
    }

    updateArray(setDnkUpgrades, {
      level: dnkUpgrade.level + 1,
    }, id);
    setCountDnk(countDnk - 1n);
  }

  return handleDnkLevelChange
}