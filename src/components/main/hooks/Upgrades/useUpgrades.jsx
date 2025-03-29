import { useState, useEffect } from 'react';
import { loadState, saveState, bigIntParser } from '../../../../js/storage.js';
import { useReset } from '../useReset.jsx';
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

  const { reset } = useReset({
    stateSetters: { upgardes: setUpgrades },
    initialState: { upgardes: UpgradesParams }
  });

  return {
    upgrades,
    setUpgrades,
    useUpgradeLevelChange,
    useUpgradeCalculations,
    useUpgradeVisibility,
    reset,
  };
};