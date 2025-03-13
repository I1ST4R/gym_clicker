import React, {useContext} from 'react';
import './css/Tooltip.css'

import { AppContext } from './main/AppContext.jsx'

function Tooltip({ position, content, type }) {
  const{
    increaseMultiplier,
  } = useContext(AppContext);
  if (!content) return null;
  return (
    <div
      className="Tooltip"
      style={{
        top: `${position.top}px`,
        right: `${position.right}px`,
      }}
    >
      {type === 'Dnk' && (
        <>
          <p>{content.benefit}</p>
        </>
      )}

      {type === 'Busters' && (
        <>
          <p>{content.desc}</p>
          <p className="Tooltip__upgrade-info">
            {`Улучшение: ${content.upgradeInfo}`}
          </p>
          <p className="Tooltip__benefit">
            {`Эффект: ${content.benefit}`}
          </p>
        </>
      )}

      {type === 'Upgrades' && (
        <>
          {content.isLastUpgrade ? (
            <p className="Tooltip__last">
              ВНИМАНИЕ! После покупки этой карточки игра будет считаться пройденной. Если вы не хотите завершать прохождение, не покупайте это улучшение!
            </p>
          ) : (
            <>
              <p>{content.desc}</p>
              <p className="Tooltip__upgrade-info">
                {`Улучшение: + ${content.initialIncrease} ${content.isIncreaseMoney ? "за клик" : "в секунду"}`}
              </p>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Tooltip;