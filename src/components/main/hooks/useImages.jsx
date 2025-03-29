import { useState, useCallback, useEffect } from 'react';
import { loadState, saveState } from '../../../js/storage';

export const useImages = () => {
  const [trainerImage, setTrainerImage] = useState(() => loadState('trainerImage', "Trainer/img1.png"));
  const [resultImages, setResultImages] = useState(() => loadState('resultImages', [], JSON.parse));

  const generateRandomPosition = useCallback(() => {
    const width = 80;
    const height = 80;
    return {
      x: Math.random() * (320 - width),
      y: Math.random() * (100 - height),
    };
  }, []);

  const updateResultImages = useCallback((upgrades) => {
    const newResultImages = [];
    upgrades.forEach((u) => {
      if (u.level > 0 && u.resultImg) {
        const existingImages = resultImages.filter((img) => img.upgradeId === u.id);

        if (u.level <= 10) {
          for (let i = 0; i < u.level; i++) {
            if (existingImages[i]) {
              newResultImages.push(existingImages[i]);
            } else {
              const position = generateRandomPosition();
              newResultImages.push({
                upgradeId: u.id,
                zIndex: u.zIndex,
                src: u.resultImg,
                x: position.x,
                y: position.y,
                width: 80,
                height: 80,
              });
            }
          }
        } else {
          newResultImages.push(...existingImages);
        }
      }
    });

    if (JSON.stringify(newResultImages) !== JSON.stringify(resultImages)) {
      setResultImages(newResultImages);
    }
  }, [resultImages, generateRandomPosition]);

  const resetImages = () => {
    setTrainerImage("Trainer/img1.png");
    setResultImages([]);
  };

  useEffect(() => {
    saveState('trainerImage', trainerImage);
    saveState('resultImages', JSON.stringify(resultImages));
  }, [trainerImage, resultImages]);

  return {
    trainerImage,
    setTrainerImage,
    resultImages,
    setResultImages,
    updateResultImages,
    resetImages,
  };
};