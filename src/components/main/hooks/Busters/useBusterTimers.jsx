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
    
    // Очищаем предыдущий таймер
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // Устанавливаем новый таймер
    timeoutRef.current = setTimeout(() => {
      const newCooldown = Math.floor(targetBuster.cooldown * cooldownDiscount);
      setCooldown(newCooldown);
    }, time);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return startBusterTimer;
};