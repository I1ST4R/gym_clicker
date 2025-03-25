
import { useState, useEffect } from 'react';
import { loadState, saveState } from '../../../js/storage.js';

export const useBigIntState = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    const loaded = loadState(key);
    try {
      return loaded ? BigInt(loaded) : BigInt(defaultValue);
    } catch (e) {
      console.error(`Error parsing BigInt for key ${key}:`, e);
      return BigInt(defaultValue);
    }
  });

  useEffect(() => {
    saveState(key, value.toString());
  }, [key, value]);

  return [value, setValue];
};

export default useBigIntState;