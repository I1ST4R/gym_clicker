import React, { useState, useEffect, useRef } from 'react';
import './css/Buster.css';
import abbreviateNum from './js/numberAbbreviator.js';
import BustersParams from './js/BustersParams.js';

function Buster({
  id,
  title,
  img,
  desc,
  benefit,
  initialPrice,
  time,
  cooldown,
  maxLvl,
  level: propLevel,
  isActive: propIsActive,
  initialIncrease,
  isIncreaseMoney,
  onBusterLevelChange,
  onLevelTrainerChange,
  onCounterMoneyChange, 
  countMoney,
  onPasIncreaseMoneyChange,
  pasIncreaseMoney,
  onActIncreaseMoneyChange,
  actIncreaseMoney,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [isActive, setIsActive] = useState(() => {
    const savedIsActive = localStorage.getItem(`buster_${id}_isActive`);
    return savedIsActive ? savedIsActive === "true" : propIsActive;
  });
  const [curCooldown, setCurCooldown] = useState(() => {
    const savedCooldown = localStorage.getItem(`buster_${id}_curCooldown`);
    return savedCooldown ? parseInt(savedCooldown, 10) : 0; // Восстанавливаем из localStorage
  });
  const intervalRef = useRef(null);

  // Сохраняем isActive в localStorage при изменении
  useEffect(() => {
    localStorage.setItem(`buster_${id}_isActive`, isActive.toString());
  }, [id, isActive]);

  // Сохраняем curCooldown в localStorage при изменении
  useEffect(() => {
    localStorage.setItem(`buster_${id}_curCooldown`, curCooldown.toString());
  }, [id, curCooldown]);

  // Запускаем таймер, если curCooldown > 0
  useEffect(() => {
    if (curCooldown > 0) {
      intervalRef.current = setInterval(() => {
        setCurCooldown(prev => {
          if (prev <= 100) {
            clearInterval(intervalRef.current);
            setIsActive(true); // Бустер снова активен
            return 0;
          }
          return prev - 100; // Уменьшаем на 100 мс для большей точности
        });
      }, 100); // Обновляем каждые 100 мс
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [curCooldown]);

  const [level, setLevel] = useState(() => {
    const savedLevel = localStorage.getItem(`buster_${id}_level`);
    return savedLevel ? parseInt(savedLevel, 10) : propLevel;
  });

  useEffect(() => {
    localStorage.setItem(`buster_${id}_level`, level.toString());
  }, [id, level]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return minutes > 0 ? `${minutes} мин. ${seconds} сек.` : `${seconds} сек.`;
  };

  const handleMouseEnter = (event) => {
    const cardRect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      top: cardRect.top, 
      left: cardRect.left + 430, 
    });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const isMaxLevel = level >= maxLvl;
  const isEnoughClients = pasIncreaseMoney >= initialPrice;

  const handleUpgradeBusterClick = () => {
    if (isEnoughClients && !isMaxLevel) {
      setLevel(level + 1); 
      onBusterLevelChange(id);
      onPasIncreaseMoneyChange(pasIncreaseMoney - initialPrice);
    }
  };

  const handleActivateBusterClick = () => {
    if (!isActive || curCooldown > 0) return; // Если бустер не активен или на восстановлении, ничего не делаем

    const actIncreaseMoneyBefore = actIncreaseMoney;
    onActIncreaseMoneyChange(pasIncreaseMoney);
    setIsActive(false); // Деактивируем бустер

    // Запускаем таймер действия бустера
    setTimeout(() => {
      onActIncreaseMoneyChange(actIncreaseMoneyBefore); // Возвращаем значение после завершения времени бустера

      // Запускаем таймер восстановления
      setCurCooldown(cooldown); // Устанавливаем время восстановления
    }, time);
  };

  return (
    <div
      className={`Buster 
        ${!isActive || curCooldown > 0 ? 'Buster--nonavailable' : ''} 
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
            <img src="src/assets/Busters/time.png" alt="" />
            <p>{`${time / 1000} сек.`}</p>
          </div>
          <div className="Buster__timer">
            <img src="src/assets/Busters/cooldown.png" alt="" />
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
                <img src="src/assets/client.png" alt="" />
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
        <img src="./src/assets/Busters/upgrade.png" alt="" />
      </div>
      
      {isHovered && (
        <div
          className="Buster__tooltip"
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
          }}
        >
          <p>{desc}</p>
          <p className="Buster__upgrade-info">Улучшение: ожидание уменьшается на 7%</p>
          <p className="Buster__benefit">{`Эффект: ${benefit}`}</p>
        </div>
      )}
    </div>
  );
}

export default Buster;