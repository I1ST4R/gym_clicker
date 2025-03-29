import { updateArray } from '../../../../js/updateArray.js';
import { useStatsContext } from '../../contexts/StatsContext';
import { useShopContext } from '../../contexts/ShopContext';

export const useUpgradeLevelChange = () => {

  const {
    busters:{ isDiscountExists, setIsDiscountExists },
    upgrades:{ upgrades, setUpgrades, useUpgradeCalculations },
    dnk: { priceMultiplier, increaseMultiplier }
  } = useShopContext()

  const {
    counters: { countMoney, setCountMoney },
    increases: {
      pasIncreaseMoney,
      setPasIncreaseMoney,
      actIncreaseMoney,
      setActIncreaseMoney,
    }
  } = useStatsContext();

  const { calculateUpgradePrice} = useUpgradeCalculations();

  const handleUpgradeLevelChange = (id) => {

    const upgrade = upgrades.find(u => u.id === id);
    if (!upgrade) return;

    const isSmallNumber = upgrade.id < 7;
    const difference = !upgrade.isIncreaseMoney ? 0.035 : 0;
    let newIncrease, newPrice, BigIntInc;

    if (isSmallNumber) {
      const initialIncreaseNumber = Number(upgrade.initialIncrease);
      BigIntInc = BigInt(Math.floor(initialIncreaseNumber * increaseMultiplier));
      newIncrease = initialIncreaseNumber * (1.15 - difference) * increaseMultiplier;
      newPrice = Number(upgrade.initialPrice) * 1.16;
    } else {
      BigIntInc = (upgrade.initialIncrease / 100n) * BigInt(Math.floor(increaseMultiplier * 100));
      const diffMultiplier = BigInt(Math.ceil((1.15 - difference) * 100));
      newIncrease = (upgrade.initialIncrease / 100n) * diffMultiplier;
      newPrice = (upgrade.initialPrice / 100n) * 116n;
    }

    if (upgrade.isIncreaseMoney) {
      setActIncreaseMoney(actIncreaseMoney + BigIntInc);
    } else {
      setPasIncreaseMoney(pasIncreaseMoney + BigIntInc);
    }

    updateArray(setUpgrades, {
      level: upgrade.level + 1,
      initialIncrease: newIncrease,
      initialPrice: newPrice,
    }, id);

    setIsDiscountExists(false);
    setCountMoney(countMoney - calculateUpgradePrice(id));
  };

  return handleUpgradeLevelChange
};