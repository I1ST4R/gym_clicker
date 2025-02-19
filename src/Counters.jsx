import React from 'react';
import './css/Counter.css'; // Импортируем стили для монетки

function Counter({ count }) {
  return (
    <div className="Counter">
      <span>{count}</span>
      <img className="Counter__img" src="src/assets/money.png" alt="" />
    </div>
  );
}

export default Counter;