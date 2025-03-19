import React, { useContext,  useEffect } from 'react';
import './css/Tooltip.css';
import { AppContext } from './main/AppContext.jsx';
import abbreviateNum from './js/numberAbbreviator.js';

function Tooltip({ position }) {
  const {
    tooltipPosition,
    isUpgradeHovered,
    isBusterHovered,
    isCounterHovered,
    isDnkHovered,
    upgrades,
    busters,
    dnkUpgrades,
    increaseMultiplier,
    countDnk,
    setIsDnkHovered,
    diamondPurchases,
    isSkinHovered,
  } = useContext(AppContext);

  let tooltipContent = null;
  let tooltipType = 'null';

  useEffect(()=>{
    if (countDnk === 0n) setIsDnkHovered(false)
  },[countDnk])

  if(isDnkHovered && countDnk === 0n) return
  if (isSkinHovered) {
    console.log("SkinHovered")
  } else if (isDnkHovered) {
    const dnk = dnkUpgrades[tooltipPosition.id - 1];
    tooltipContent = {
      benefit: dnk.benefit,
    };
    tooltipType = 'Dnk';
  } else if (isCounterHovered) {
    tooltipType = 'Counters';
  } else if (isBusterHovered) {
    const buster = busters[tooltipPosition.id - 1];
    tooltipContent = {
      desc: buster.desc,
      upgradeInfo: buster.upgradeInfo,
      benefit: buster.benefit,
    };
    tooltipType = 'Busters';
  } else if (isUpgradeHovered) {
    const upgrade = upgrades[tooltipPosition.id - 1];
    tooltipContent = {
      desc: upgrade.desc,
      initialIncrease: abbreviateNum(
        typeof upgrade.initialIncrease === 'bigint'
          ? (upgrade.initialIncrease / 100n) * BigInt(Math.floor(increaseMultiplier * 100))
          : Math.floor(upgrade.initialIncrease * increaseMultiplier)
      ),
      isIncreaseMoney: upgrade.isIncreaseMoney,
      isLastUpgrade: tooltipPosition.id === 19 && upgrades[tooltipPosition.id - 2].level >= 50,
    };
    tooltipType = 'Upgrades';
  }

  return (
    <div
      className="Tooltip"
      style={{
        top: `${position.top}px`,
        right: tooltipType !== "Dnk" ? "530px" : `${position.right}px`,
        width: tooltipType === "Counters" ? "300px" : "",
      }}
    >
      {tooltipType === 'Dnk' && <p>{tooltipContent.benefit}</p>}

      {tooltipType === 'Busters' && (
        <>
          <p>{tooltipContent.desc}</p>
          <p className="Tooltip__upgrade-info">
            {`Улучшение: ${tooltipContent.upgradeInfo}`}
          </p>
          <p className="Tooltip__benefit">
            {`Эффект: ${tooltipContent.benefit}`}
          </p>
        </>
      )}

      {tooltipType === 'Counters' && (
        <>
          <div className="Tooltip__point">
            <img src="money.png" alt="" />
            <p>- основная валюта, за нее полкупаются улучшения</p>
          </div>
          <div className="Tooltip__point">
            <img src="client.png" alt="" />
            <p>- показатель пассивного дохода в секунду</p>
          </div>
          <div className="Tooltip__point">
            <img src="diamond.png" alt="" />
            <p>- валюта для покупки различных обликов и визуальных улучшений, с низким шансом выпадает при покупке улучшения</p>
          </div>
        </>
      )}

      {tooltipType === 'Upgrades' && (
        <>
          {tooltipContent.isLastUpgrade ? (
            <p className="Tooltip__last">
              ВНИМАНИЕ! После покупки этой карточки игра будет считаться пройденной. Если вы не хотите завершать прохождение, не покупайте это улучшение!
            </p>
          ) : (
            <>
              <p>{tooltipContent.desc}</p>
              <p className="Tooltip__upgrade-info">
                {`Улучшение: + ${tooltipContent.initialIncrease} ${tooltipContent.isIncreaseMoney ? "за клик" : "в секунду"}`}
              </p>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Tooltip;