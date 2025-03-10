// App.js
import React, { useContext, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import Trainer from '../Trainer.jsx';
import Counters from '../Counters.jsx';
import Busters from '../Busters.jsx';
import Client from '../Client.jsx';
import Upgrades from '../Upgrades.jsx';
import DiamondUpgrades from '../DiamondUpgrades.jsx';
import StoryIntro from '../StoryIntro.jsx';
import StoryAutro from '../StoryAutro.jsx';
import '../css/App.css';
import '../css/SliderStyles.css';
import abbreviateNum from '../js/numberAbbreviator.js';
import { AppContext } from './AppContext.jsx';

function App() {
  const {
    countMoney,
    setCountMoney,
    countDnk,
    setCountDnk,
    pasIncreaseMoney,
    actIncreaseMoney,
    resultImages,
    setResultImages,
    upgrades,
    setUpgrades,
    diamondUpgrades,
    busters,
    tooltipPosition,
    isUpgradeHovered,
    isDUpgradeHovered,
    isBusterHovered,
    storyShown,
    setStoryShown,
    end,
    windowWidth,
    setWindowWidth,
  } = useContext(AppContext);

  const incrementCountMoneyForClick = () => {
    setCountMoney(countMoney + actIncreaseMoney);
  };

  const incrementCountDnk = () => {
    const increaseDnk = BigInt(Math.floor((pasIncreaseMoney.toString().length) / 2));
    setCountDnk(countDnk + increaseDnk);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setWindowWidth]);

  useEffect(() => {
    const updatedUpgrades = upgrades.map((upgrade) => {
      if(upgrade.level > 0 )upgrade.isHidden = false
      else if (upgrade.initialPrice <= countMoney) upgrade.isInvisible = false
      return upgrade
    });

    setUpgrades(updatedUpgrades);
  }, [countMoney]);

  useEffect(() => {
    upgrades.forEach((u) => {
      if (u.level === 1 && u.resultImg) {
        setResultImages((prevImages) => [
          ...prevImages,
          {
            zIndex: u.zIndex,
            src: u.resultImg,
            x: u.resultImgPositionX,
            y: u.resultImgPositionY,
            width: u.resultImgWidth,
            height: u.resultImgHeight,
          },
        ]);
      }
    });
  }, [pasIncreaseMoney, actIncreaseMoney, upgrades, setResultImages]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountMoney((prevCountMoney) => prevCountMoney + pasIncreaseMoney);
    }, 1000);
    return () => clearInterval(interval);
  }, [pasIncreaseMoney, setCountMoney]);

  const DUpgradesPrices = [1, 2, 5, 10];

  const swiperRef = useRef(null);

  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <>
      {!storyShown && <StoryIntro onClose={() => setStoryShown(true)} />}

      {end && <StoryAutro />}
      <Client />
      <Trainer onClick={incrementCountMoneyForClick} />
      <Counters />
      <div className="slider-container">
        <button className="button-prev" onClick={goPrev}>
          <svg width="30" height="21" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 7C21.5523 7 22 7.44772 22 8C22 8.55228 21.5523 9 21 9V7ZM0.292892 8.70711C-0.0976315 8.31658 -0.0976315 7.68342 0.292892 7.29289L6.65685 0.928932C7.04738 0.538408 7.68054 0.538408 8.07107 0.928932C8.46159 1.31946 8.46159 1.95262 8.07107 2.34315L2.41421 8L8.07107 13.6569C8.46159 14.0474 8.46159 14.6805 8.07107 15.0711C7.68054 15.4616 7.04738 15.4616 6.65685 15.0711L0.292892 8.70711ZM21 9H1V7H21V9Z" fill="black"></path>
          </svg>
        </button>
        <button className="button-next" onClick={goNext}>
          <svg width="30" height="21" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 7C0.447715 7 0 7.44772 0 8C0 8.55228 0.447715 9 1 9V7ZM21.7071 8.70711C22.0976 8.31658 22.0976 7.68342 21.7071 7.29289L15.3431 0.928932C14.9526 0.538408 14.3195 0.538408 13.9289 0.928932C13.5384 1.31946 13.5384 1.95262 13.9289 2.34315L19.5858 8L13.9289 13.6569C13.5384 14.0474 13.5384 14.6805 13.9289 15.0711C14.3195 15.4616 14.9526 15.4616 15.3431 15.0711L21.7071 8.70711ZM1 9H21V7H1V9Z" fill="black"></path>
          </svg>
        </button>
        <Swiper
          ref={swiperRef}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          navigation={{
            prevEl: '.button-prev',
            nextEl: '.button-next',
          }}
        >
          <SwiperSlide>
            <Upgrades onIncreaseDiamond={incrementCountDnk} />
          </SwiperSlide>
          <SwiperSlide><Busters /></SwiperSlide>
          <SwiperSlide><DiamondUpgrades /></SwiperSlide>
        </Swiper>
      </div>

      {/* Tooltip for DUpgrades */}
      {isDUpgradeHovered && (
        <div
          className="Tooltip"
          style={{
            top: `80px`,
            right: `530px`,
          }}
        >
          {!(diamondUpgrades[tooltipPosition.id - 1].level === 4) ? (
            <>
              <p className="Tooltip__upgrade-info">
                {`Улучшение: ${diamondUpgrades[tooltipPosition.id - 1].benefit} ${BigInt(DUpgradesPrices[diamondUpgrades[tooltipPosition.id - 1].level])} %`}
              </p>
              <div className="Tooltip__price-block">
                {`Стоимость: ${BigInt(DUpgradesPrices[diamondUpgrades[tooltipPosition.id - 1].level])} `}
                <img src="diamond.png" alt="" />
              </div>
            </>
          ) : (
            <div
              className="Tooltip"
              style={{
                top: `${tooltipPosition.top}px`,
                right: `${tooltipPosition.right}px`,
              }}
            >
              <p className="Tooltip__upgrade-info">Максимальный уровень</p>
            </div>
          )}
        </div>
      )}

      {/* Tooltip for Busters */}
      {isBusterHovered && (
        <div
          className="Tooltip"
          style={{
            top: `${tooltipPosition.top}px`,
            right: `530px`,
          }}
        >
          <p>{busters[tooltipPosition.id - 1].desc}</p>
          <p className="Tooltip__upgrade-info">
            {`Улучшение: ${busters[tooltipPosition.id - 1].upgradeInfo}`}
          </p>
          <p className="Tooltip__benefit">
            {`Эффект: ${busters[tooltipPosition.id - 1].benefit}`}
          </p>
        </div>
      )}

      {/* Tooltip for Upgrades */}
      {isUpgradeHovered && tooltipPosition.id !== 19 && (
        <div
          className="Tooltip"
          style={{
            top: `${tooltipPosition.top}px`,
            right: `530px`,
          }}
        >
          <p>{upgrades[tooltipPosition.id - 1].desc}</p>
          <p className="Tooltip__upgrade-info">
          {`Улучшение: 
        + ${
          typeof upgrades[tooltipPosition.id - 1].initialIncrease === 'bigint'
            ? abbreviateNum(upgrades[tooltipPosition.id - 1].initialIncrease) 
            : abbreviateNum(BigInt(Math.floor(upgrades[tooltipPosition.id - 1].initialIncrease))) 
        } 
        ${upgrades[tooltipPosition.id - 1].isIncreaseMoney ? "за клик" : "в секунду"}
      `}
          </p>
        </div>
      )}

      {isUpgradeHovered && tooltipPosition.id === 19 && upgrades[tooltipPosition.id - 2].level >= 50 && (
        <div
          className="Tooltip"
          style={{
            top: `${tooltipPosition.top}px`,
            right: `530px`,
          }}
        >
          <p className="Tooltip__last">
            ВНИМАНИЕ! После покупки этой карточки игра будет считаться пройденной. Если вы не хотите завершать прохождение, не покупайте это улучшение!
          </p>
        </div>
      )}

      {/*Result images*/}
      {resultImages.map((image, index) => (
        <img
          key={index}
          src={image.src}
          style={{
            position: 'absolute',
            left: `${(windowWidth - 480) / 2 + image.x}px`,
            top: `${image.y}px`,
            width: `${image.width}px`,
            height: `${image.height}px`,
            zIndex: `${image.zIndex}`,
            userSelect: `none`,
            pointerEvents: `none`,
          }}
          alt="Result"
        />
      ))}
      <footer className="footer">
        <div className="footer__container">
          <div className="footer__point">
            Разработчик: <span>I1ST4R (Ivan)</span>
            <img src="star.png" alt="" />
          </div>
          <a className="footer__point"
            href="https://github.com/I1ST4R/gym_clicker">
            <span>Проект на GitHub</span>
            <img src="github.png" alt="tg" />
          </a>
          <a className="footer__point"
            href="https://t.me/SSSsTtAaRrr">
            <span>Баги, пожелания, идеи </span>
            <img src="tg.png" alt="tg" />
          </a>
        </div>
      </footer>
    </>
  );
}

export default App;