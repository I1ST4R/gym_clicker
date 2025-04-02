// countersData.js
export const getCountersParams = (countDiamond, pasIncreaseMoney, countMoney, diamondPositive, pasPositive) => {
  return [
    { value: countDiamond, img: 'diamond.png', condition: diamondPositive || countDiamond > 0 },
    { value: pasIncreaseMoney, img: 'client.png', condition: pasPositive || pasIncreaseMoney > 0 },
    { value: countMoney, img: 'money.png', condition: true }, // Всегда отображаем деньги
  ];
};