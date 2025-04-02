import { useState, useEffect } from 'react';
import { loadState, saveState, bigIntParser } from '../../../../js/storage.js';
import UpgradesParams from '../../../../js/UpgradesParams.js';
import { useUpgradeLevelChange } from './useUpgradeLevelChange';
import { useUpgradeVisibility } from './useUpgradeVisibility';
import { useUpgradeCalculations } from './useUpgradeCalculations';

export const useUpgrades = () => {
  const [upgrades, setUpgrades] = useState(() => 
    loadState('upgrades', UpgradesParams, (val) => JSON.parse(val, bigIntParser))
  );

  useEffect(() => {
    saveState('upgrades', JSON.stringify(upgrades, (key, value) => 
      (typeof value === 'bigint' ? `${value}n` : value)
    ));
  }, [upgrades]);

  const reset = (resetAdditionalStates) => {
    setUpgrades(UpgradesParams)
  };

  return {
    upgrades,
    setUpgrades,
    useUpgradeLevelChange,
    useUpgradeCalculations,
    useUpgradeVisibility,
    reset,
  };
};