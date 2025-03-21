import React, { useEffect } from 'react';
import '../../css/slide.css';
import Skin from './Skin.jsx';
import { useStatsContext } from '../main/StatsContext'; // Кастомный хук для StatsContext
import { useShopContext } from '../main/ShopContext'; // Кастомный хук для ShopContext

function Skins() {
  // Используем кастомный хук для доступа к данным из StatsContext
  const {
    counters: { countDiamond, setCountDiamond },
  } = useStatsContext();

  // Используем кастомный хук для доступа к данным из ShopContext
  const {
    skins: {
      diamondPurchases, setDiamondPurchases,
      setIsClientImgAdded, isClientImgAdded,
      setBackgroundImage,
      cursorImage, setCursorImage,
      backgroundRightImage, setBackgroundRightImage,
      backgroundLeftImage, setBackgroundLeftImage,
      setIsBgCharacterAdded
    },
  } = useShopContext();

  // Обработчик изменений активного элемента
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

  // Применяем изменения при обновлении diamondPurchases
  useEffect(() => {
    handleActiveChanges();
  }, [diamondPurchases]);

  // Убираем фон у элементов с классом slide, если backgroundRightImage === false
  useEffect(() => {
    const slideElements = document.querySelectorAll('.slide');

    if (backgroundRightImage === false) {
      slideElements.forEach((element) => {
        element.style.background = 'none'; // Убираем фон
      });
    } else {
      slideElements.forEach((element) => {
        element.style.background = ''; // Возвращаем фон по умолчанию
      });
    }
  }, [backgroundRightImage]);

  // Убираем фон у элементов с классами image-container и image-section, если backgroundLeftImage === false
  useEffect(() => {
    const imageContainerElements = document.querySelectorAll('.image-container');
    const imageSectionElements = document.querySelectorAll('.image-section');

    if (backgroundLeftImage === false) {
      imageContainerElements.forEach((element) => {
        element.style.background = 'none'; // Убираем фон
      });
      imageSectionElements.forEach((element) => {
        element.style.background = 'none'; // Убираем фон
      });
    } else {
      imageContainerElements.forEach((element) => {
        element.style.background = ''; // Возвращаем фон по умолчанию
      });
      imageSectionElements.forEach((element) => {
        element.style.background = ''; // Возвращаем фон по умолчанию
      });
    }
  }, [backgroundLeftImage]);

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

  // Обработчик активации элемента
  const handleActivate = (id) => {
    const activeItem = diamondPurchases.find((item) => item.id === id);
    if (!activeItem) return;

    const updatedPurchases = diamondPurchases.map((item) => {
      // Делаем активным только выбранный элемент
      if (item.id === id) {
        return { ...item, isActive: true };
      }
      // Делаем неактивными только элементы с тем же changes
      if (item.changes === activeItem.changes) {
        return { ...item, isActive: false };
      }
      return item;
    });

    setDiamondPurchases(updatedPurchases);
  };

  // Обработчик покупки элемента
  const handleBuy = (id) => {
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

  return (
    <div className="slide">
      <div className="slide__title">
        <p>Облики</p>
      </div>
      <div className="slide__grid-container">
        {diamondPurchases.map((upgrade) => (
          <Skin
            key={upgrade.id}
            {...upgrade}
            onActivate={handleActivate}
            onBuy={handleBuy}
          />
        ))}
      </div>
    </div>
  );
}

export default Skins;