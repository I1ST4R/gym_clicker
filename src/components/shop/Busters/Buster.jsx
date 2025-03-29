import React from 'react';
import '../../../css/Buster.css';
import abbreviateNum from '../../../js/numberAbbreviator.js';
import { formatTime } from '../../../js/formatTime.js';
import { useStatsContext } from '../../main/contexts/StatsContext.jsx';
import { useShopContext } from '../../main/contexts/ShopContext.jsx';
import { useUIContext } from '../../main/contexts/UIContext.jsx';

function Buster({
  id,
  title,
  img,
  initialPrice,
  time,
  maxLvl,
  level,
  isActive,
  isReady,
}) {
  const { increases: { pasIncreaseMoney } } = useStatsContext();
  const {
    busters: { useBusterLevelChange, useBusterTimers, useBusterCooldown }
  } = useShopContext();
  const { tooltip: { handleTooltipMouseEnter, handleTooltipMouseLeave } } = useUIContext();

  const [curCooldown, setCurCooldown] = useBusterCooldown(id);
  const startBusterTimer = useBusterTimers(id);
  const busterLevelChange = useBusterLevelChange();

  const isMaxLevel = level >= maxLvl;
  const isEnoughClients = pasIncreaseMoney >= initialPrice;

  return (
    <div
      className={`Buster ${!isReady || level === 0 ? 'Buster--nonavailable' : ''
        }`}
      onMouseEnter={(event) => handleTooltipMouseEnter(event, id, 'buster')}
      onMouseLeave={handleTooltipMouseLeave}
    >
      <img
        className="Buster__img"
        src={img}
        alt={title}
      />
      <div className="Buster__info" onClick={() => startBusterTimer(setCurCooldown)}>
        <p className="Buster__title">{title}</p>
        <div className="Buster__timers">
          <div className="Buster__timer">
            {time !== 0 ? (
              <>
                <img src="Busters/time.png" alt="" />
                <p>{`${time / 1000} сек.`}</p>
              </>
            ) : null}
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
        className={`${isEnoughClients ? 'Buster__upgrader--availavle' : ''
          } Buster__upgrader`}
        onClick={() => busterLevelChange(id)}
      >
        <img src="Busters/upgrade.png" alt="" />
      </div>
    </div>
  );
}

export default Buster