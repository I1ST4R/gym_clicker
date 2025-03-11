import React from 'react';
import './css/Tooltip.css'; // Подключите стили для Tooltip

function Tooltip({ position, content, type }) {
  if (!content) return null;

  return (
    <div
      className="Tooltip"
      style={{
        top: `${position.top}px`,
        right: `${position.right}px`,
      }}
    >
      {type === 'DUpgrades' && (
        <>
          {content.level === 4 ? (
            <p className="Tooltip__upgrade-info">Максимальный уровень</p>
          ) : (
            <>
              <p className="Tooltip__upgrade-info">
                {`Улучшение: ${content.benefit} ${content.price} %`}
              </p>
              <div className="Tooltip__price-block">
                {`Стоимость: ${content.price} `}
                <img src="diamond.png" alt="" />
              </div>
            </>
          )}
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