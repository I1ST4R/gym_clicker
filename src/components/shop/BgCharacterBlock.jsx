import React, { useContext } from 'react';
import { useShopContext } from '../main/ShopContext'; // Импортируем контекст
import '../../css/BgCharacterBlock.css'; // Импортируем стили

const BgCharacterBlock = () => {
  // Используем кастомный хук для доступа к данным из ShopContext
  const {
    skins: {
      isBgCharacterAdded,
      diamondPurchases,
    },
  } = useShopContext();

  // Находим активный элемент
  const activeItem = diamondPurchases.find((item) => item.id === 8);

  if(!isBgCharacterAdded || !activeItem) return

  return (
    <div
      className="bg-character-block"
      style={{ backgroundImage: `url(${activeItem.img})` }}
    >
      <p>его бы в подвал, ему кусок хлеба кинуть с водой, три таблетки метана и свободен</p>
    </div>
  );
};

export default BgCharacterBlock;