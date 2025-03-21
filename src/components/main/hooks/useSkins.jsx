import { useState, useEffect } from 'react';
import { loadState, saveState } from '../../../js/storage.js';
import DiamondPurchasesParams from '../../../js/DiamondPurchasesParams.js';

export const useSkins = () => {
  const [diamondPurchases, setDiamondPurchases] = useState(() => loadState('diamondPurchases', DiamondPurchasesParams, JSON.parse));
  const [backgroundImage, setBackgroundImage] = useState(() => loadState('backgroundImage', null));
  const [cursorImage, setCursorImage] = useState(() => loadState('cursorImage', null));
  const [isClientImgAdded, setIsClientImgAdded] = useState(() => loadState('isClientImgAdded', false, JSON.parse));
  const [backgroundRightImage, setBackgroundRightImage] = useState(() => loadState('backgroundRightImage', true, JSON.parse));
  const [backgroundLeftImage, setBackgroundLeftImage] = useState(() => loadState('backgroundLeftImage', true, JSON.parse));
  const [isBgCharacterAdded, setIsBgCharacterAdded] = useState(() => loadState('isBgCaracterAdded', false, JSON.parse));

  const handleActiveChanges = () => {
    const activeItem = diamondPurchases.find((item) => item.isActive);

    if (activeItem) {
      switch (activeItem.id) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 9:
        case 11:
        case 12:
          setBackgroundImage(activeItem.img);
          break;
        case 5:
          setIsClientImgAdded(true);
          break;
        case 6:
          setCursorImage(activeItem.img);
          break;
        case 7:
          setBackgroundRightImage(false);
          break;
        case 8:
          setIsBgCharacterAdded(true);
          break;
        case 10:
          setBackgroundLeftImage(false);
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    handleActiveChanges();
  }, [diamondPurchases]);

  const handleActivate = (id) => {
    const activeItem = diamondPurchases.find((item) => item.id === id);
    if (!activeItem) return;

    const updatedPurchases = diamondPurchases.map((item) => {
      if (item.id === id) {
        return { ...item, isActive: true };
      }
      if (item.changes === activeItem.changes) {
        return { ...item, isActive: false };
      }
      return item;
    });

    setDiamondPurchases(updatedPurchases)
  };

  const handleBuy = (id, countDiamond, setCountDiamond) => {
    const itemToBuy = diamondPurchases.find((item) => item.id === id);

    if (itemToBuy && !itemToBuy.isBuyed && countDiamond >= BigInt(itemToBuy.price)) {
      setCountDiamond(countDiamond - BigInt(itemToBuy.price));

      const updatedPurchases = diamondPurchases.map((item) => {
        if (item.id === id) {
          return { ...item, isBuyed: true, isActive: true };
        }
        return item;
      });

      setDiamondPurchases(updatedPurchases);
    }
  };

  useEffect(() => {
    const slideElements = document.querySelectorAll('.slide');
    const imageContainer = document.querySelector('.image-container');
    if (backgroundRightImage === false) {
      slideElements.forEach((element) => {
        element.style.background = 'none'; // Убираем фон
      });
    } else {
      slideElements.forEach((element) => {
        element.style.background = ''; // Возвращаем фон по умолчанию
      });
    }

    if (backgroundLeftImage === false) {
      imageContainer.style.background = 'none';
    } else {
      imageContainer.style.background = '';
    }
  }, [backgroundRightImage, backgroundLeftImage]);

  // Применяем кастомный курсор ко всем элементам
  useEffect(() => {
    if (cursorImage) {
      // Применяем кастомный курсор для обычного состояния
      document.body.style.cursor = `url(${cursorImage}), auto`;

      // Применяем кастомный курсор для состояния pointer
      const pointerElements = document.querySelectorAll('*');
      pointerElements.forEach((element) => {
        const computedStyle = window.getComputedStyle(element);
        if (computedStyle.cursor === 'pointer') {
          element.style.cursor = `url(${cursorImage}), pointer`;
        }
      });
    } else {
      // Сбрасываем курсор, если cursorImage равен null
      document.body.style.cursor = 'auto';
      const pointerElements = document.querySelectorAll('*');
      pointerElements.forEach((element) => {
        const computedStyle = window.getComputedStyle(element);
        if (computedStyle.cursor === 'pointer') {
          element.style.cursor = 'pointer';
        }
      });
    }
  }, [cursorImage]);

  useEffect(() => {
    if (backgroundImage) {
      document.body.style.backgroundImage = `url(${backgroundImage})`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundRepeat = 'no-repeat';
    } else {
      document.body.style.backgroundImage = 'none';
    }
  }, [backgroundImage]);
  
  // Сохранение состояний в localStorage
  useEffect(() => {
    saveState('diamondPurchases', JSON.stringify(diamondPurchases));
  }, [diamondPurchases]);

  useEffect(() => {
    saveState('backgroundImage', backgroundImage);
  }, [backgroundImage]);

  useEffect(() => {
    saveState('cursorImage', cursorImage);
  }, [cursorImage]);

  useEffect(() => {
    saveState('isClientImgAdded', JSON.stringify(isClientImgAdded));
  }, [isClientImgAdded]);

  useEffect(() => {
    saveState('backgroundRightImage', JSON.stringify(backgroundRightImage));
  }, [backgroundRightImage]);

  useEffect(() => {
    saveState('backgroundLeftImage', JSON.stringify(backgroundLeftImage));
  }, [backgroundLeftImage]);

  useEffect(() => {
    saveState('isBgCharacterAdded', JSON.stringify(isBgCharacterAdded));
  }, [isBgCharacterAdded]);

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
  };
};