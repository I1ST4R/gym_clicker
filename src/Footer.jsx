import React, { useContext } from 'react';
import './css/Footer.css';
import { AppContext } from './main/AppContext.jsx';

function Footer({}) {
  const {
    resetProgress,
    showAlert,
    setShowCustomAlert,
  } = useContext(AppContext);

  const handleClick = () => {
    console.log(1)
    showAlert(
      "Вы потеряете весь свой прогресс, включая очки днк и мутации, при этом ничего не получите, вы уверены что готовы продолжить?",
      () => {
        resetProgress(true)
        setAlertOnConfirm()
      },
      () => {
        setShowCustomAlert(false)
      }
    )
  }
  
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