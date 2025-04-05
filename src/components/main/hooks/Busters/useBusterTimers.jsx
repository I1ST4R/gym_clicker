import { useRef, useEffect } from 'react';
import { useShopContext } from '../../contexts/ShopContext.jsx';
import { useBusterActivate } from './useBusterActivate.jsx';

export const useBusterTimers = (id) => {
  const {
    busters: { busters },
    dnk: { cooldownDiscount },
  } = useShopContext();

  const busterActivate = useBusterActivate();
  const targetBuster = busters.find(b => b.id === id);
  const time = targetBuster.time;
  
  const timeoutRef = useRef(null);

  const startBusterTimer = (setCooldown) => {
    if (targetBuster.level === 0) return;
    
    busterActivate(id);
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const baseCooldown = Math.floor(targetBuster.cooldown * cooldownDiscount);
    console.log(baseCooldown)
    setCooldown(baseCooldown); 

    timeoutRef.current = setTimeout(() => {
      setCooldown(baseCooldown); 
    }, time);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return startBusterTimer;
};