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
import { AppContext } from './AppContext.jsx';
import SliderContainer from '../SliderContainer';
import ImageSections from '../ImageSections.jsx';
import DnkProgressBar from '../DnkProgressBar';

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
    alertMessage,
    alertOnConfirm,
    alertOnCancel,
    isBusterHovered,
    isUpgradeHovered,
    isCounterHovered,
    isDnkHovered,
    storyIntroShown,
    backgroundImage, // Получаем фоновое изображение из контекста
  } = useContext(AppContext);

  // Изменение фона для всей страницы
  useEffect(() => {
    if (backgroundImage) {
      document.body.style.backgroundImage = `url(${backgroundImage})`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundRepeat = 'no-repeat';
    } else {
      document.body.style.backgroundImage = 'none';
    }
  }, [backgroundImage]); // Зависимость от backgroundImage

  // Активный доход (за клик)
  const incrementCountMoneyForClick = () => {
    setCountMoney(countMoney + actIncreaseMoney);
  };

  // Пассивный доход (в сек.)
  useEffect(() => {
    const interval = setInterval(() => {
      setCountMoney((prevCountMoney) => prevCountMoney + pasIncreaseMoney);
    }, 1000);
    return () => clearInterval(interval);
  }, [pasIncreaseMoney, setCountMoney]);

  // Расчет днк
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

  // Сброс прогресса
  useEffect(() => {
    countDnk === 0n && storyAutroShown ? resetProgress() : "";
  }, [countDnk]);

  // Для слайдера
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
    <div className="App">
      {end && !storyAutroShown && <StoryAutro />}
      {end && storyAutroShown && countDnk !== 0n && <DnkUpgrades />}
      {!end && !storyIntroShown && <StoryIntro />}

      <Client />
      <Trainer onClick={incrementCountMoneyForClick} />
      <Counters />
      <SliderContainer
        goNext={goNext}
        goPrev={goPrev}
      />
      {(isBusterHovered || isUpgradeHovered || isCounterHovered || isDnkHovered) &&
        <Tooltip position={tooltipPosition} />
      }
      <ImageSections />
      {(countDnk !== 0n) &&
        <DnkProgressBar />
      }
      <CustomAlert
        message={alertMessage}
        onConfirm={alertOnConfirm}
        onCancel={alertOnCancel}
      />
      <Footer />
    </div>
  );
}

export default App;