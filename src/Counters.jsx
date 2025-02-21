import React from 'react';
import './css/Counters.css'; // Импортируем стили для монетки

function Counter({ countMoney, pasIncreaseMoney }) {
  return (
    <div className="Counters">
      <div className="Counter">
        <span>{pasIncreaseMoney}</span>
        <img className="Counter__clients__img" src="src/assets/client.png" alt="" />
      </div>
      <div className="Counter">
        <span>{countMoney}</span>
        <img className="Counter__money__img" src="src/assets/money.png" alt="" />
      </div>
    </div>
  );
}

export default Counter;