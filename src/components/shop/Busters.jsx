import React from 'react';
import '../../css/slide.css';
import Buster from './Buster.jsx';
import { useStatsContext } from '../main/StatsContext'; // Кастомный хук для StatsContext
import { useShopContext } from '../main/ShopContext'; // Кастомный хук для ShopContext

function Busters({}) {
  // Используем кастомный хук для доступа к данным из StatsContext
  const {
    counters: { setCountMoney },
    increases: { pasIncreaseMoney, setPasIncreaseMoney, actIncreaseMoney, setActIncreaseMoney },
  } = useStatsContext();

  // Используем кастомный хук для доступа к данным из ShopContext
  const {
    busters: { busters, setBusters, setIsDiscountExists },
    dnk: { cooldownDiscount },
  } = useShopContext();

  // Обработчик изменения уровня бустера
  const handleBusterLevelChange = (id) => {
    const updatedBusters = busters.map((buster) => {
      if (buster.id === id) {
        const isFirstLevel = buster.level === 0;
        return {
          ...buster,
          level: buster.level + 1,
          initialPrice: buster.initialPrice * 1.16,
          cooldown: isFirstLevel ? buster.cooldown : buster.cooldown * 0.93,
        };
      }
      return buster;
    });
    setBusters(updatedBusters);
  };

  // Обработчик активации бустера
  const handleActivateBuster = (id, time) => {
    const updatedBusters = busters.map((buster) => {
      if (buster.id === id) {
        return {
          ...buster,
          curCooldown: Math.floor(buster.cooldown * cooldownDiscount),
          isActive: false,
        };
      }
      return buster;
    });
    setBusters(updatedBusters);

    // Логика эффектов бустера
    const buster = busters.find((b) => b.id === id);
    if (!buster || buster.level === 0) return;

    switch (id) {
      case 1:
        const actIncreaseMoneyBefore = actIncreaseMoney;
        setActIncreaseMoney(pasIncreaseMoney);
        setTimeout(() => {
          setActIncreaseMoney(actIncreaseMoneyBefore);
        }, time);
        break;
      case 2:
        const pasIncreaseMoneyBefore = pasIncreaseMoney;
        setPasIncreaseMoney(pasIncreaseMoney * BigInt(7));
        setTimeout(() => {
          setPasIncreaseMoney(pasIncreaseMoneyBefore);
        }, time);
        break;
      case 3:
        setTimeout(() => {
          setCountMoney(pasIncreaseMoney * BigInt(50));
        }, time);
        break;
      case 4:
        let newPasIncreaseMoney = BigInt('0');
        setTimeout(() => {
          if (pasIncreaseMoney <= 10000) {
            newPasIncreaseMoney = BigInt(Math.floor(Number(pasIncreaseMoney) * 1.05));
          } else {
            newPasIncreaseMoney = (pasIncreaseMoney * BigInt(105)) / BigInt(100);
          }
          setPasIncreaseMoney(newPasIncreaseMoney);
        }, time);
        break;
      case 5:
        setIsDiscountExists(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className="slide">
      <div className="slide__title">
        <p>Бустеры</p>
      </div>
      <div className="slide__flex-container">
        {busters.map((buster) => (
          <Buster
            key={buster.id}
            {...buster}
            onBusterLevelChange={handleBusterLevelChange}
            onActivateBuster={handleActivateBuster}
          />
        ))}
      </div>
    </div>
  );
}

export default Busters;