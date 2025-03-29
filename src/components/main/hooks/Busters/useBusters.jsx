import { useState, useEffect } from 'react';
import { loadState, saveState, bigIntParser } from '../../../../js/storage.js';
import BustersParams from '../../../../js/BustersParams.js';
import { formatTime } from '../../../../js/formatTime.js';
import { useBusterActivate } from './useBusterActivate.jsx';
import { useBusterLevelChange } from './useBusterLevelChange.jsx';
import { useBusterTimers } from './useBusterTimers.jsx';
import { useBusterCooldown } from './useBusterCooldown.jsx';
import { useReset } from '../useReset.jsx';

export const useBusters = () => {
  // Состояния с автоматической загрузкой/сохранением
  const [busters, setBusters] = useState(() => 
    loadState('busters', BustersParams, (val) => JSON.parse(val, bigIntParser))
  );
  const [isDiscountExists, setIsDiscountExists] = useState(() => 
    loadState('isDiscountExists', false, JSON.parse)
  );
  // Автосохранение состояний
  useEffect(() => {
    saveState('busters', JSON.stringify(busters, (key, value) => 
      typeof value === 'bigint' ? `${value}n` : value
    ));
    saveState('isDiscountExists', JSON.stringify(isDiscountExists));
  }, [busters, isDiscountExists]);

  const { reset } = useReset({
    stateSetters: {
      busters: setBusters,
      isDiscountExists: setIsDiscountExists
    },
    initialState: {
      busters: BustersParams,
      isDiscountExists: false
    }
  });

  return {
    busters,
    setBusters,
    isDiscountExists,
    setIsDiscountExists,
    useBusterLevelChange,
    useBusterActivate,
    useBusterTimers,
    useBusterCooldown,
    formatTime,
    reset
  };
};