import React from 'react';
import '../../css/Footer.css';
import { useUIContext } from '../main/contexts/UIContext'; // Кастомный хук для UIContext
import { useStatsContext } from '../main/contexts/StatsContext'; // Кастомный хук для StatsContext
import { useShopContext } from '../main/contexts/ShopContext'; // Кастомный хук для StatsContext

function Footer() {
  
  const {
    alert: { showAlert, setShowCustomAlert },

    resetUI,
  } = useUIContext();
  
  const {
    resetStats,
  } = useStatsContext();

  const {
    resetShop,
  } = useShopContext();

  const handleClick = () => {
    showAlert(
      "Вы потеряете весь свой прогресс, включая очки днк, мутации и облики, при этом ничего не получите, вы уверены что готовы продолжить?",
      () => {
        resetUI(true)
        resetStats(true)
        resetShop(true)
        setShowCustomAlert(false);
      },
      () => {
        setShowCustomAlert(false);
      }
    );
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <button onClick={handleClick}>Сбросить прогресс</button>
        <div className="footer__point">
          Разработчик: <span>I1ST4R (Ivan)</span>
          <img src="star.png" alt="" />
        </div>
        <a className="footer__point" href="https://github.com/I1ST4R/gym_clicker">
          <span>Проект на GitHub</span>
          <img src="github.png" alt="tg" />
        </a>
        <a className="footer__point" href="https://t.me/SSSsTtAaRrr">
          <span>Баги, пожелания, идеи </span>
          <img src="tg.png" alt="tg" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;