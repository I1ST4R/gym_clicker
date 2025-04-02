import { useShopContext } from '../../contexts/ShopContext';
import { useStatsContext } from '../../contexts/StatsContext';
import { useEffect } from 'react';

export const useUpgradeVisibility = () => {
  const { upgrades: { setUpgrades, upgrades } } = useShopContext();
  const { counters: { countMoney } } = useStatsContext();

  useEffect(() => {
    setUpgrades(prevUpgrades =>
      prevUpgrades.map((upgrade, index, array) => {
        const previousHasLevel = index > 0 && array[index - 1].level > 0;
        const isAffordable = upgrade.initialPrice <= countMoney;
        const isFirstUpgrade = upgrade.id === 1

        const shouldBeVisible = previousHasLevel || isAffordable || isFirstUpgrade;

        return {
          ...upgrade,
          isInvisible: !shouldBeVisible
        };
      })
    );
  }, [countMoney]); 
};