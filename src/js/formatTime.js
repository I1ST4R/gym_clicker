// Форматирование времени
export const formatTime = (time) => {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  return minutes > 0 ? `${minutes} : ${seconds}` : `${seconds}`;
};