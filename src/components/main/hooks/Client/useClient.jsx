import { useState, useRef, useEffect } from 'react';
import { useClientClick } from './useClientClick';
import { useClientSpawn } from './useClientSpawn';

export function useClient() {
  // Состояния
  const [image, setImage] = useState('');
  const [isClientUpgraded, setIsClientUpgraded] = useState(
    localStorage.getItem('isClientUpgraded') === 'true'
  );
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [bonus, setBonus] = useState(0);
  const clientRef = useRef(null);

  // Эффекты
  useEffect(() => {
    localStorage.setItem('isClientUpgraded', isClientUpgraded.toString());
  }, [isClientUpgraded]);

  return {
    // Состояния
    image,
    isClientUpgraded,
    isVisible,
    progress,
    position,
    bonus,
    setImage,
    setIsClientUpgraded,
    setIsVisible,
    setProgress,
    setPosition,
    setBonus,
    clientRef,
    useClientClick,
    useClientSpawn
  };
}