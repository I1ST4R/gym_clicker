import React from 'react';
import '../../../css/Buster.css';
import abbreviateNum from '../../../js/numberAbbreviator.js';
import { useStatsContext } from '../../main/contexts/StatsContext.jsx';
import { useShopContext } from '../../main/contexts/ShopContext.jsx';
import { useUIContext } from '../../main/contexts/UIContext.jsx';
import { useBusterTimers } from '../../main/hooks/useBusterTimers.jsx'; 

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
}) {

  const {
    increases: { pasIncreaseMoney, setPasIncreaseMoney, actIncreaseMoney, setActIncreaseMoney },
    counters: {setCountMoney}
  } = useStatsContext();
  const {
    dnk: { cooldownDiscount },
    busters:{ formatTime, handleActivateBuster, handleBusterLevelChange },
  } = useShopContext();
  const {
    tooltip: { handleTooltipMouseEnter, handleTooltipMouseLeave },
  } = useUIContext();

  const { curCooldown, startBusterTimer } = useBusterTimers(0, cooldown, cooldownDiscount);

  // Обработчик улучшения бустера
  const isMaxLevel = level >= maxLvl;
  const isEnoughClients = pasIncreaseMoney >= initialPrice;

  const handleUpgradeBusterClick = () => {
    if (isEnoughClients && !isMaxLevel) {
      handleBusterLevelChange(id, cooldownDiscount, );
    }
  };

  // Обработчик активации бустера
  const handleActivateBusterClick = () => {
    if (isActive && curCooldown === 0 && level !== 0) {
      startBusterTimer(time, () => handleActivateBuster(id, time, cooldownDiscount, {
        setCountMoney,
        pasIncreaseMoney,
        setPasIncreaseMoney,
        actIncreaseMoney,
        setActIncreaseMoney,
      }));
    }
  };

  return (
    <div
      className={`Buster ${
        !isActive || curCooldown > 0 || level === 0 ? 'Buster--nonavailable' : ''
      }`}
      onMouseEnter={(event) => handleTooltipMouseEnter(event, id, 'buster')}
      onMouseLeave={handleTooltipMouseLeave}
    >
      <img
        onClick={handleActivateBusterClick}
        className="Buster__img"
        src={img}
        alt={title}
      />
      <div className="Buster__info" onClick={handleActivateBusterClick}>
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
            <p>{curCooldown > 0 ? formatTime(curCooldown) : 'Готово'}</p>
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
          <p className="Buster__level">{level === 0 ? '' : level}</p>
        </div>
      </div>

      <div
        className={`${
          isEnoughClients ? 'Buster__upgrader--availavle' : ''
        } Buster__upgrader`}
        onClick={handleUpgradeBusterClick}
      >
        <img src="Busters/upgrade.png" alt="" />
      </div>
    </div>
  );
}

export default Buster;