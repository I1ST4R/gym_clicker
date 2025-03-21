import React, { useEffect } from 'react';
import { useUIContext } from '../main/UIContext'; // Кастомный хук для ShopContext
import { useShopContext } from '../main/ShopContext'; // Кастомный хук для ShopContext
import ImageSection from './ImageSection';
import '../../css/ImageSections.css'; 

function ImageSections() {
  const {
    resultImages: { resultImages, setResultImages },
  } = useUIContext();

  const {
    upgrades: { upgrades },
  } = useShopContext();
  
  // Генерация случайных позиций для картинок
  const generateRandomPosition = () => {
    const width = 80; // Фиксированная ширина картинки
    const height = 80; // Фиксированная высота картинки
    return {
      x: Math.random() * (400 - width), // Случайное положение по X (в пределах ширины блока)
      y: Math.random() * (100 - height), // Случайное положение по Y (в пределах высоты секции)
    };
  };

  // Обновляем resultImages в зависимости от уровня улучшений
  useEffect(() => {
    const newResultImages = [];
    upgrades.forEach((u) => {
      if (u.level > 0 && u.resultImg) {
        // Находим существующие картинки для этого улучшения
        const existingImages = resultImages.filter((img) => img.upgradeId === u.id);

        // Если уровень улучшения меньше или равен 10, обновляем картинки
        if (u.level <= 10) {
          for (let i = 0; i < u.level; i++) {
            if (existingImages[i]) {
              // Если картинка уже существует, используем её текущие координаты
              newResultImages.push(existingImages[i]);
            } else {
              // Если картинки нет, создаем новую с случайными координатами
              const position = generateRandomPosition();
              newResultImages.push({
                upgradeId: u.id, // ID улучшения, к которому привязана картинка
                zIndex: u.zIndex,
                src: u.resultImg,
                x: position.x,
                y: position.y,
                width: 80, // Фиксированная ширина
                height: 80, // Фиксированная высота
              });
            }
          }
        } else {
          // Если уровень улучшения больше 10, используем существующие картинки (не создаем новых)
          newResultImages.push(...existingImages);
        }
      }
    });
    setResultImages(newResultImages);
  }, [upgrades, setResultImages]);

  // Группируем картинки по улучшениям
  const groupedImages = {};
  resultImages.forEach((image) => {
    if (!groupedImages[image.upgradeId]) {
      groupedImages[image.upgradeId] = [];
    }
    groupedImages[image.upgradeId].push(image);
  });

  return (
    <div className="image-container">
      {Object.keys(groupedImages).map((upgradeId) => (
        <div key={upgradeId} className="image-section">
          {groupedImages[upgradeId].map((image, index) => (
            <ImageSection key={`${upgradeId}-${index}`} image={image} />
          ))}
        </div>
      ))}
      <div className="image-container__spase"></div>
    </div>
  );
}

export default ImageSections;