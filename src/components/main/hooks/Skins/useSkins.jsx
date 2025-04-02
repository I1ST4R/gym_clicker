import { useState, useEffect } from 'react';
import { loadState, saveState } from '../../../../js/storage.js';
import DiamondPurchasesParams from '../../../../js/DiamondPurchasesParams.js';
import { useSkinActivate } from './useSkinActivate.jsx';
import { useSkinBuy } from './useSkinBuy.jsx';
import { useSkinStyles } from './useSkinStyles.jsx';

export const useSkins = () => {
  // Состояния с автоматической загрузкой
  const [diamondPurchases, setDiamondPurchases] = useState(() => 
    loadState('diamondPurchases', DiamondPurchasesParams, JSON.parse));
  const [backgroundImage, setBackgroundImage] = useState(() => 
    loadState('backgroundImage', null));
  const [cursorImage, setCursorImage] = useState(() => 
    loadState('cursorImage', null));
  const [isClientImgAdded, setIsClientImgAdded] = useState(() => 
    loadState('isClientImgAdded', false, JSON.parse));
  const [backgroundRightImage, setBackgroundRightImage] = useState(() => 
    loadState('backgroundRightImage', true, JSON.parse));
  const [backgroundLeftImage, setBackgroundLeftImage] = useState(() => 
    loadState('backgroundLeftImage', true, JSON.parse));
  const [isBgCharacterAdded, setIsBgCharacterAdded] = useState(() => 
    loadState('isBgCaracterAdded', false, JSON.parse));

  // Автоматическое сохранение всех состояний
  useEffect(() => {
    saveState('diamondPurchases', JSON.stringify(diamondPurchases));
    saveState('backgroundImage', backgroundImage);
    saveState('cursorImage', cursorImage);
    saveState('isClientImgAdded', JSON.stringify(isClientImgAdded));
    saveState('backgroundRightImage', JSON.stringify(backgroundRightImage));
    saveState('backgroundLeftImage', JSON.stringify(backgroundLeftImage));
    saveState('isBgCharacterAdded', JSON.stringify(isBgCharacterAdded));
  }, [
    diamondPurchases, 
    backgroundImage, 
    cursorImage, 
    isClientImgAdded,
    backgroundRightImage, 
    backgroundLeftImage, 
    isBgCharacterAdded
  ]);

  const reset = (resetAdditionalStates) => {
    if (resetAdditionalStates){
      setDiamondPurchases(DiamondPurchasesParams)
      setBackgroundImage(null)
      setCursorImage(null)
      setIsClientImgAdded(false)
      setBackgroundRightImage(true)
      setBackgroundLeftImage(true)
      setIsBgCharacterAdded(null)
    }
  };

  return {
    diamondPurchases,
    setDiamondPurchases,
    backgroundImage,
    setBackgroundImage,
    cursorImage,
    setCursorImage,
    isClientImgAdded,
    setIsClientImgAdded,
    backgroundRightImage,
    setBackgroundRightImage,
    backgroundLeftImage,
    setBackgroundLeftImage,
    isBgCharacterAdded,
    setIsBgCharacterAdded,
    useSkinActivate,
    useSkinBuy,
    useSkinStyles,
    reset
  };
};