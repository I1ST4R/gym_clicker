import React, { useContext, useEffect, useRef } from 'react';
import 'swiper/swiper-bundle.css';
import Trainer from '../Trainer.jsx';
import Counters from '../Counters.jsx';
import Client from '../Client.jsx';
import DnkUpgrades from '../DnkUpgrades.jsx';
import StoryIntro from '../StoryIntro.jsx';
import StoryAutro from '../StoryAutro.jsx';
import Tooltip from '../Tooltip.jsx';
import CustomAlert from '../CustomAlert';
import Footer from '../Footer';
import '../css/App.css';
import abbreviateNum from '../js/numberAbbreviator.js';
import { AppContext } from './AppContext.jsx';
import SliderContainer from '../SliderContainer';
import ResultImages from '../ResultImages'; 

function App() {
  const {
    countMoney, setCountMoney,
    countDnk, setCountDnk,
    pasIncreaseMoney,
    actIncreaseMoney,
    resultImages,
    resetProgress,
    tooltipPosition,
    storyAutroShown,
    end,
    windowWidth, setWindowWidth,
    alertMessage,
    alertOnConfirm,
    alertOnCancel,
    isBusterHovered,
    isUpgradeHovered,
    isCounterHovered,
    isDnkHovered,
    storyIntroShown,
  } = useContext(AppContext);

  //активный доход (за клик)
  const incrementCountMoneyForClick = () => {
    setCountMoney(countMoney + actIncreaseMoney);
  };

  //пассивный доход (в сек.)
  useEffect(() => {
    const interval = setInterval(() => {
      setCountMoney((prevCountMoney) => prevCountMoney + pasIncreaseMoney);
    }, 1000);
    return () => clearInterval(interval);
  }, [pasIncreaseMoney, setCountMoney]);

  //расчет днк
  useEffect(() => {
    const log3 = (value) => {
      if (value < 3n) return 0n;
      let count = 0n;
      while (value >= 3n) {
        value /= 3n;
        count += 1n;
      }
      return count;
    };

    const divisor = 1000000000000000000n;
    const increaseDnk = log3(pasIncreaseMoney / divisor);
    setCountDnk(increaseDnk);
  }, [pasIncreaseMoney]);

  //сброс прогресса
  useEffect(() => {
    countDnk === 0n && storyAutroShown ? resetProgress() : ""
  }, [countDnk]);

  //ивент на изменение окна для адаптива
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setWindowWidth]);

  //для слайдера
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
      {end && !storyAutroShown && <StoryAutro />}
      {end && storyAutroShown && countDnk != 0 && <DnkUpgrades />}
      {!end && !storyIntroShown && <StoryIntro />}

      <Client/>
      <Trainer onClick={incrementCountMoneyForClick}/>
      <Counters/>
      <SliderContainer 
        goNext={goNext} 
        goPrev={goPrev} 
      /> 
      {(isBusterHovered || isUpgradeHovered || isCounterHovered || isDnkHovered) &&
        <Tooltip position={tooltipPosition}/>
      }
      <ResultImages 
        resultImages={resultImages} 
        windowWidth={windowWidth} 
      /> 
      <CustomAlert
        message={alertMessage}
        onConfirm={alertOnConfirm}
        onCancel={alertOnCancel}
      />
      <Footer/>
    </>
  );
}

export default App;