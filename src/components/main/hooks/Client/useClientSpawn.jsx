import { useEffect, useRef } from 'react';
import { useStatsContext } from '../../contexts/StatsContext';
import { useShopContext } from '../../contexts/ShopContext';
import { useUIContext } from '../../contexts/UIContext';
import ClientsBefore from '../../../../js/ClientsBefore.js';
import { getRandomRange } from '../../../../js/getRandomRange.js';

export function useClientSpawn() {
  const {
    delay: { minDelay, maxDelay },
  } = useStatsContext();

  const {
    skins: { isClientImgAdded }
  } = useShopContext();

  const {
    client: {
      setImage,
      setIsClientUpgraded,
      setIsVisible,
      setProgress,
      setPosition,
      isVisible
    }
  } = useUIContext();


  const clientRef = useRef(null);

  useEffect(() => {
    const spawnClient = () => {
      const randomIndex = getRandomRange(0, 4 + (5 * isClientImgAdded));
      setImage(ClientsBefore[randomIndex]);

      const clientRect = clientRef.current.getBoundingClientRect();
      setPosition({
        x: getRandomRange(430, window.innerWidth - clientRect.width - 530 - 50),
        y: getRandomRange(50, window.innerHeight - clientRect.height - 50),
      });

      setIsVisible(true);
      setIsClientUpgraded(false);
      setProgress(0);

      setTimeout(() => {
        setIsVisible(false);
        setPosition({
          y: -400,
        });
      }, 6000);
    };

    const randomDelay = getRandomRange(minDelay, maxDelay);
    const timer = setTimeout(spawnClient, randomDelay);
    return () => clearTimeout(timer);
  }, [isVisible, minDelay, maxDelay, isClientImgAdded]);

  return clientRef;
}