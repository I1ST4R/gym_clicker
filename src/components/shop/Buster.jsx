import React, { useState, useEffect, useRef, useContext } from 'react';
import '../../css/Buster.css';
import abbreviateNum from '../../js/numberAbbreviator.js';
import { AppContext } from '../main/AppContext.jsx';

// Кастомный хук для управления curCooldown
const useBusterCooldown = (id, initialCooldown) => {
  const [curCooldown, setCurCooldown] = useState(() => {
    const savedCooldown = localStorage.getItem(`buster_${id}_cooldown`);
    return savedCooldown ? parseInt(savedCooldown, 10) : initialCooldown;
  });

  useEffect(() => {
    localStorage.setItem(`buster_${id}_cooldown`, curCooldown);
  }, [curCooldown, id]);

  return [curCooldown, setCurCooldown];
};

function Buster({
  id,
  title,
  img,
  initialPrice,
  time,
  cooldown,
  maxLvl,
  level,
  isActive,
  onBusterLevelChange,
  onActivateBuster,
}) {
  const {
    setTooltipPosition,
    setIsBusterHovered,
    pasIncreaseMoney,
    cooldownDiscount,
    busters,
    end,
  } = useContext(AppContext);

  // Используем кастомный хук для управления curCooldown
  const [curCooldown, setCurCooldown] = useBusterCooldown(id, 0);

  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const isMaxLevel = level >= maxLvl;
  const isEnoughClients = pasIncreaseMoney >= initialPrice;

  // Таймер перезарядки
  useEffect(() => {
    if (curCooldown > 0) {
      intervalRef.current = setInterval(() => {
        setCurCooldown((prev) => prev - 100); // Уменьшаем curCooldown на 100 мс
      }, 100);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [curCooldown]);

  // Форматирование времени для отображения
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return minutes > 0 ? `${minutes} мин. ${seconds} сек.` : `${seconds} сек.`;
  };

  // Обработчик наведения мыши
  const handleMouseEnter = (event) => {
    const cardRect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      top: cardRect.top,
      id: id,
    });
    setIsBusterHovered(true);
  };

  const handleMouseLeave = () => {
    setIsBusterHovered(false);
  };

  // Обработчик улучшения бустера
  const handleUpgradeBusterClick = () => {
    if (isEnoughClients && !isMaxLevel) {
      onBusterLevelChange(id);
    }
  };

  // Обработчик активации бустера
  const handleActivateBusterClick = () => {
    if (isActive && curCooldown === 0 && level !== 0) {
      // Запускаем время действия бустера
      timeoutRef.current = setTimeout(() => {
        // После завершения времени действия запускаем перезарядку
        setCurCooldown(Math.floor(cooldown * cooldownDiscount));
      }, time);

      // Вызываем внешний обработчик активации бустера
      onActivateBuster(id, time);
    }
  };

  // Очистка таймеров при размонтировании
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div
      className={`Buster 
        ${!isActive || curCooldown > 0 || level === 0 ? 'Buster--nonavailable' : ''} 
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        onClick={handleActivateBusterClick}
        className="Buster__img"
        src={img}
        alt={title}
      />
      <div
        className="Buster__info"
        onClick={handleActivateBusterClick}
      >
        <p className="Buster__title">{title}</p>
        <div className="Buster__timers">
          <div className="Buster__timer">
            {time !== 0 ? (
              <>
                <img src="Busters/time.png" alt="" />
                <p>{`${time / 1000} сек.`}</p>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="Buster__timer">
            <img src="Busters/cooldown.png" alt="" />
            <p>{curCooldown > 0 ? formatTime(curCooldown) : "Готово"}</p>
          </div>
        </div>
        <div className="Buster__price-level">
          {isMaxLevel ? (
            <p className="Buster__max-level">максимальный уровень</p>
          ) : (
            <>
              <div className="Buster__price-block">
                <p className="Buster__price">{abbreviateNum(Math.floor(initialPrice))}</p>
                <img src="client.png" alt="" />
              </div>
            </>
          )}
          <p className="Buster__level">{level === 0 ? "" : level}</p>
        </div>
      </div>

      <div
        className={`
          ${isEnoughClients ? "Buster__upgrader--availavle" : ""}
          Buster__upgrader
        `}
        onClick={handleUpgradeBusterClick}
      >
        <img src="Busters/upgrade.png" alt="" />
      </div>
    </div>
  );
}

export default Buster;