import React, { useState, useEffect, useRef } from 'react';
import '../../css/Buster.css';
import abbreviateNum from '../../js/numberAbbreviator.js';
import { useStatsContext } from '../main/StatsContext'; 
import { useShopContext } from '../main/ShopContext'; 
import { useUIContext } from '../main/UIContext'; 
import { useBusterCooldown } from '../main/ShopContext';

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
    increases: { pasIncreaseMoney },
  } = useStatsContext();
  const {
    dnk: { cooldownDiscount },
    formatTime,
  } = useShopContext();
  const {
    tooltip: { setTooltipPosition, setIsBusterHovered },
  } = useUIContext();

  //таймеры
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  // Очистка таймеров при размонтировании
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);


  // Таймер перезарядки
  const [curCooldown, setCurCooldown] = useBusterCooldown(id, 0);

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
  const isMaxLevel = level >= maxLvl;
  const isEnoughClients = pasIncreaseMoney >= initialPrice;

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