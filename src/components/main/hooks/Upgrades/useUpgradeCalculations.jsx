import { useShopContext } from '../../contexts/ShopContext';
import { useStatsContext } from '../../contexts/StatsContext';

export const useUpgradeCalculations = () => {

  const {
    upgrades: { upgrades },
    busters: { isDiscountExists },
    dnk: { priceMultiplier }
  } = useShopContext()

  const { counters: { countMoney } } = useStatsContext();

  const calculateUpgradePrice = (id) => {
    const upgrade = upgrades.find((u) => u.id === id);
    if (!upgrade) return BigInt(0);

    const discount = (isDiscountExists ? 1 : 2) / 2;

    let priceWithMults, initialPrice;

    if (id < 7) {
      initialPrice = Number(upgrade.initialPrice);
      priceWithMults = Math.floor(initialPrice * priceMultiplier * discount);
      return BigInt(priceWithMults);
    } else {
      initialPrice = BigInt(upgrade.initialPrice) / 1000n;
      const dnkMult = BigInt(Math.floor(priceMultiplier * 100));
      const discountBigInt = BigInt(Math.floor(discount * 10));
      priceWithMults = (initialPrice / 1000n) * dnkMult * discountBigInt;
      return priceWithMults;
    }
  };

  const isEnoughMoneyForUpgrade = (id) => {
    const price = calculateUpgradePrice(id, isDiscountExists, priceMultiplier);
    return countMoney >= price;
  };

  return {
    calculateUpgradePrice,
    isEnoughMoneyForUpgrade
  };
};