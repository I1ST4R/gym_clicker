import { useState, useEffect, useRef } from 'react';

export const useBusterCooldown = (id, initialValue = 0) => {
  const [curCooldown, setCurCooldown] = useState(() => {
    const savedCooldown = localStorage.getItem(`buster_${id}_cooldown`);
    const savedTimestamp = localStorage.getItem(`buster_${id}_timestamp`);
    
    if (savedCooldown && savedTimestamp) {
      const elapsed = Date.now() - parseInt(savedTimestamp, 10);
      const remaining = parseInt(savedCooldown, 10) - elapsed;
      return remaining > 0 ? remaining : 0;
    }
    return initialValue;
  });

  const lastUpdateRef = useRef(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      if (curCooldown > 0) {
        const now = Date.now();
        const delta = now - lastUpdateRef.current;
        lastUpdateRef.current = now;
        
        setCurCooldown(prev => {
          const newValue = prev - delta;
          return newValue > 0 ? newValue : 0;
        });
      }
    }, 100);

    return () => clearInterval(interval);
  }, [curCooldown]);

  useEffect(() => {
    localStorage.setItem(`buster_${id}_cooldown`, curCooldown);
    localStorage.setItem(`buster_${id}_timestamp`, Date.now());
  }, [curCooldown, id]);

  return [curCooldown, setCurCooldown];
};