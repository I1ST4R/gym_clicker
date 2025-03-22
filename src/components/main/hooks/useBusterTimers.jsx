import { useState, useRef, useEffect } from 'react';

export const useBusterTimers = (initialCooldown, cooldownTime, cooldownDiscount) => {
  const [curCooldown, setCurCooldown] = useState(initialCooldown);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  // Очистка таймеров при размонтировании
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Таймер перезарядки
  useEffect(() => {
    if (curCooldown > 0) {
      intervalRef.current = setInterval(() => {
        setCurCooldown((prev) => prev - 100);
      }, 100);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [curCooldown]);

  // Запуск перезарядки
  const startCooldown = () => {
    setCurCooldown(Math.floor(cooldownTime * cooldownDiscount));
  };

  // Запуск таймера действия бустера
  const startBusterTimer = (busterTime, onBusterEnd) => {
    timeoutRef.current = setTimeout(() => {
      startCooldown();
      if (onBusterEnd) onBusterEnd();
    }, busterTime);
  };

  return {
    curCooldown,
    startBusterTimer,
  };
};