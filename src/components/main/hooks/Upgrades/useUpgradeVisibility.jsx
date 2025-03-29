import { useShopContext } from '../../contexts/ShopContext';
import { useStatsContext } from '../../contexts/StatsContext';
import React, { useEffect, useState } from 'react';

export const useUpgradeVisibility = () => {

  const { upgrades: { setUpgrades, upgrades } } = useShopContext()
  const { counters: { countMoney } } = useStatsContext();

  useEffect(() => {
    setUpgrades(prevUpgrades =>
      prevUpgrades.map(upgrade =>
        upgrade.initialPrice <= countMoney && upgrade.isInvisible
          ? { ...upgrade, isInvisible: false }
          : upgrade
      )
    )
  }, [countMoney])

};