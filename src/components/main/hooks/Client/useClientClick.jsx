import { useStatsContext } from '../../contexts/StatsContext';
import { useShopContext } from '../../contexts/ShopContext';
import { useUIContext } from '../../contexts/UIContext';
import clientClick from '../../../../../public/sounds/clientClick.mp3';
import clientUpgrade from '../../../../../public/sounds/clientUpgrade.mp3';
import clientThanksgiving from '../../../../../public/sounds/clientThanksgiving.mp3';
import ClientsAfter from '../../../../js/ClientsAfter.js';
import { getRandomRange } from '../../../../js/getRandomRange.js';

export function useClientClick() {
  const {
    counters: { countMoney, setCountMoney },
    increases: { pasIncreaseMoney, actIncreaseMoney },
  } = useStatsContext();

  const {
    dnk: { multiplier },
    skins: { isClientImgAdded }
  } = useShopContext();

  const {
    client: {
      isClientUpgraded,
      setIsClientUpgraded,
      setImage,
      progress,
      setProgress,
      setBonus
    }
  } = useUIContext();

  const numOfClicks = 10;
  const step = Math.floor(100 / numOfClicks);

  const handleClick = () => {
    if (!isClientUpgraded) {
      if (100 - progress <= step) {
        new Audio(clientUpgrade).play();
        const randomIndex = getRandomRange(0, 4 + (5 * isClientImgAdded));
        setImage(ClientsAfter[randomIndex]);
        setIsClientUpgraded(true);
        new Audio(clientThanksgiving).play();

        const calculatedBonus = pasIncreaseMoney < 1000000
          ? BigInt(Math.floor(Number(pasIncreaseMoney + actIncreaseMoney) * multiplier))
          : (pasIncreaseMoney + actIncreaseMoney) / 100n * BigInt(Math.floor(multiplier * 100));

        setBonus(calculatedBonus);
        setCountMoney(countMoney + calculatedBonus);
      }
      new Audio(clientClick).play();
      setProgress((prevProgress) => prevProgress + step);
    }
  };

  return handleClick;
}