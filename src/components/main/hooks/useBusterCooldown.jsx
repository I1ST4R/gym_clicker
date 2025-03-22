import { useState, useEffect } from 'react';

export const useBusterCooldown = (id, initialCooldown) => {
  const [curCooldown, setCurCooldown] = useState(() => {
    const savedCooldown = localStorage.getItem(`buster_${id}_cooldown`);
    return savedCooldown ? parseInt(savedCooldown, 10) : initialCooldown;
  });

  useEffect(() => {
    localStorage.setItem(`buster_${id}_cooldown`, curCooldown);
  }, [curCooldown, id]);

  return [curCooldown, setCurCooldown];
};