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
  level,
  isActive,
  onBusterLevelChange,
  onActivateBuster,
  curCooldown,
}) {
  const {
    setTooltipPosition,
    setIsBusterHovered,
    pasIncreaseMoney,
    cooldwonDiscount,
    busters,
    end,
  } = useContext(AppContext);

  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    setLocalCurCooldown(0)
  }, [end]);

  const [localCurCooldown, setLocalCurCooldown] = useState(curCooldown);

  const isMaxLevel = level >= maxLvl;
  const isEnoughClients = pasIncreaseMoney >= initialPrice;

  useEffect(() => {
    if (localCurCooldown > 0) {
      intervalRef.current = setInterval(() => {
        setLocalCurCooldown((prev) => {
          if (prev <= 100) {
            clearInterval(intervalRef.current);
            isActive = true;
            return 0;
          } else {
            return prev - 100;
          }
        });
      }, 100);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [localCurCooldown]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return minutes > 0 ? `${minutes} мин. ${seconds} сек.` : `${seconds} сек.`;
  };

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

  const handleUpgradeBusterClick = () => {
    if (isEnoughClients && !isMaxLevel) {
      level += 1;
      onBusterLevelChange(id);
    }
  };

  const handleActivateBusterClick = () => {
    if (!isActive || localCurCooldown > 0 || level === 0) return;
    isActive = false;
    if (time > 0) {
      timeoutRef.current = setTimeout(() => {
        setLocalCurCooldown(Math.floor(cooldown * cooldwonDiscount));
      }, time);
    } else {
      setLocalCurCooldown(Math.floor(cooldown * cooldwonDiscount));
    }
    onActivateBuster(id, time);
  };

  useEffect(() => {
    return () => {
      timeoutRef.current ? clearTimeout(timeoutRef.current) : "";
      intervalRef.current ? clearInterval(intervalRef.current) : "";
    };
  }, []);

  return (
    <div
      className={`Buster 
        ${!isActive || localCurCooldown > 0 || level === 0 ? 'Buster--nonavailable' : ''} 
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
            <p>{localCurCooldown > 0 ? formatTime(localCurCooldown) : "Готово"}</p>
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