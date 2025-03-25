import React from 'react';

function CountersTooltip() {
  return (
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
  );
}

export default CountersTooltip;