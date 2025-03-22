import React from 'react';
import { useUIContext } from '../main/UIContext';

function UpgradesTooltip() {
  const {
    tooltip: { tooltipContent },
  } = useUIContext();

  return (
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
  );
}

export default UpgradesTooltip;