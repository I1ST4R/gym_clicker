import { useState, useEffect } from 'react';
import { loadState, saveState } from '../../../js/storage.js';
import DiamondPurchasesParams from '../../../js/DiamondPurchasesParams.js';
import { useReset } from './useReset.jsx';

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

  // Обработка активных изменений
  const handleActiveChanges = () => {
    const activeItem = diamondPurchases.find((item) => item.isActive);

    if (activeItem) {
      switch (activeItem.id) {
        case 1: case 2: case 3: case 4: case 9: case 11: case 12:
          setBackgroundImage(activeItem.img);
          break;
        case 5: setIsClientImgAdded(true); break;
        case 6: setCursorImage(activeItem.img); break;
        case 7: setBackgroundRightImage(false); break;
        case 8: setIsBgCharacterAdded(true); break;
        case 10: setBackgroundLeftImage(false); break;
        default: break;
      }
    }
  };

  useEffect(() => {
    handleActiveChanges();
  }, [diamondPurchases]);

  // Активация предмета
  const handleActivate = (id) => {
    setDiamondPurchases(prev => prev.map(item => ({
      ...item,
      isActive: item.id === id,
      ...(item.changes === prev.find(i => i.id === id)?.changes && { isActive: false })
    })));
  };

  // Покупка предмета
  const handleBuy = (id, countDiamond, setCountDiamond) => {
    const itemToBuy = diamondPurchases.find(item => item.id === id);
    
    if (itemToBuy && !itemToBuy.isBuyed && countDiamond >= BigInt(itemToBuy.price)) {
      setCountDiamond(countDiamond - BigInt(itemToBuy.price));
      setDiamondPurchases(prev => prev.map(item => 
        item.id === id 
          ? { ...item, isBuyed: true, isActive: true } 
          : item
      ));
    }
  };

  // Эффекты для применения стилей
  useEffect(() => {
    const slideElements = document.querySelectorAll('.slide');
    const imageContainer = document.querySelector('.image-container');
    
    slideElements.forEach(el => {
      el.style.background = backgroundRightImage ? '' : 'none';
    });
    
    imageContainer.style.background = backgroundLeftImage ? '' : 'none';
  }, [backgroundRightImage, backgroundLeftImage]);

  useEffect(() => {
    const cursorStyle = cursorImage ? `url(${cursorImage}), auto` : 'auto';
    document.body.style.cursor = cursorStyle;
    
    if (cursorImage) {
      document.querySelectorAll('*').forEach(el => {
        if (window.getComputedStyle(el).cursor === 'pointer') {
          el.style.cursor = `url(${cursorImage}), pointer`;
        }
      });
    }
  }, [cursorImage]);

  useEffect(() => {
    document.body.style.backgroundImage = backgroundImage 
      ? `url(${backgroundImage})` 
      : 'none';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
  }, [backgroundImage]);

  const { reset } = useReset({
    stateSetters: {
      diamondPurchases: setDiamondPurchases,
      backgroundImage: setBackgroundImage,
      cursorImage: setCursorImage,
      isClientImgAdded: setIsClientImgAdded,
      backgroundRightImage: setBackgroundRightImage,
      backgroundLeftImage: setBackgroundLeftImage,
      isBgCharacterAdded: setIsBgCharacterAdded
    },
    initialState: {
      diamondPurchases: DiamondPurchasesParams,
      backgroundImage: null,
      cursorImage: null,
      isClientImgAdded: false,
      backgroundRightImage: true,
      backgroundLeftImage: true,
      isBgCharacterAdded: false
    }
  });

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
    handleActivate,
    handleBuy,
    reset
  };
};