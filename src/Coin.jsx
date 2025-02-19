import React, { useEffect, useRef } from 'react';
import './css/Coin.css';

function Coin({ id, startX, startY, onComplete }) {
  const coinRef = useRef(null);

  useEffect(() => {
    const coin = coinRef.current;

    // Устанавливаем начальные координаты монетки
    coin.style.left = `${startX}px`;
    coin.style.top = `${startY}px`;

    // Добавляем класс для запуска анимации
    coin.classList.add('Money--animate');

    // Обработчик события завершения анимации
    const handleAnimationEnd = () => {
      onComplete(id); // Уведомляем родительский компонент о завершении анимации
    };

    coin.addEventListener('animationend', handleAnimationEnd);

    // Очистка
    return () => {
      coin.removeEventListener('animationend', handleAnimationEnd);
    };
  }, [id, startX, startY, onComplete]);

  return (
    <div className="Money" ref={coinRef}>
      <img src="src/assets/money.png" alt="Coin" />
    </div>
  );
}

export default Coin;