import React, { useState, useEffect, useRef, useContext } from 'react';
import './css/Buster.css';
import abbreviateNum from './js/numberAbbreviator.js';
import { AppContext } from './main/AppContext.jsx';

function Buster({
  id,
  title,
  img,
  initialPrice,
  time,
  cooldown,
  maxLvl,
  level: propLevel,
  isActive: propIsActive,
  onBusterLevelChange,
  onActivateBuster,
}) {
  const {
    setTooltipPosition,
    setIsBusterHovered,
    pasIncreaseMoney,
  } = useContext(AppContext);

  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const [isActive, setIsActive] = useState(() => {
    const savedIsActive = localStorage.getItem(`buster_${id}_isActive`);
    return savedIsActive ? savedIsActive === "true" : propIsActive;
  });

  const [curCooldown, setCurCooldown] = useState(() => {
    const savedCooldown = localStorage.getItem(`buster_${id}_curCooldown`);
    return savedCooldown ? parseInt(savedCooldown, 10) : 0;
  });

  const [level, setLevel] = useState(() => {
    const savedLevel = localStorage.getItem(`buster_${id}_level`);
    return savedLevel ? parseInt(savedLevel, 10) : propLevel;
  });

  const isMaxLevel = level >= maxLvl;
  const isEnoughClients = pasIncreaseMoney >= initialPrice;

  useEffect(() => {
    localStorage.setItem(`buster_${id}_level`, level.toString());
  }, [id, level]);

  useEffect(() => {
    localStorage.setItem(`buster_${id}_isActive`, isActive);
  }, [id, isActive]);

  useEffect(() => {
    localStorage.setItem(`buster_${id}_curCooldown`, curCooldown.toString());
  }, [id, curCooldown]);

  useEffect(() => {
    if (curCooldown > 0) {
      intervalRef.current = setInterval(() => {
        setCurCooldown(prev => {
          if (prev <= 100) {
            clearInterval(intervalRef.current);
            setIsActive(true); 
            return 0;
          }
          return prev - 100;
        });
      }, 100);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [curCooldown]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return minutes > 0 ? `${minutes} мин. ${seconds} сек.` : `${seconds} сек.`;
  };

  const handleMouseEnter = (event) => {
    const cardRect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      top: cardRect.top,
      right: 500,
      id: id,
    });
    setIsBusterHovered(true);
  };

  const handleMouseLeave = () => {
    setIsBusterHovered(false);
  };

  const handleUpgradeBusterClick = () => {
    if (isEnoughClients && !isMaxLevel) {
      setLevel(level + 1);
      onBusterLevelChange(id);
    }
  };

  const handleActivateBusterClick = () => {
    if (!isActive || curCooldown > 0 || level === 0) return;
    setIsActive(false);
    if (time > 0) {
      timeoutRef.current = setTimeout(() => {
        setCurCooldown(cooldown)
      }, time);
    } else setCurCooldown(cooldown)
    onActivateBuster(id, time);
  }

  useEffect(() => {
    return () => {
      timeoutRef.current ? clearTimeout(timeoutRef.current): ""
      intervalRef.current ? clearInterval(intervalRef.current): ""
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
            {time != 0 ? (
              <>
                <img src="Busters/time.png" alt="" />
                <p>{`${time / 1000} сек.`}</p>
              </>
            ) : (
              <>
              </>
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