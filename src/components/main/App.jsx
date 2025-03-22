import React, { useEffect } from 'react';
import Trainer from '../static/Trainer.jsx';
import Counters from '../static/Counters.jsx';
import Client from '../showingComponents/Client.jsx';
import DnkUpgrades from '../shop/DnkUpgrades.jsx';
import StoryIntro from '../showingComponents/StoryIntro.jsx';
import StoryAutro from '../showingComponents/StoryAutro.jsx';
import Tooltip from '../showingComponents/Tooltip.jsx';
import CustomAlert from '../showingComponents/CustomAlert';
import Footer from '../static/Footer';
import '../../css/App.css';
import SliderContainer from '../shop/SliderContainer.jsx';
import ImageSections from '../showingComponents/ImageSections.jsx';
import DnkProgressBar from '../showingComponents/DnkProgressBar';
import BgCharacterBlock from '../shop/BgCharacterBlock.jsx';
import { useStatsContext } from './StatsContext'; // Кастомный хук для StatsContext
import { useShopContext } from './ShopContext'; // Кастомный хук для ShopContext
import { useUIContext } from './UIContext'; // Кастомный хук для UIContext

function App() {
  // Используем кастомный хук для доступа к данным из StatsContext
  const {
    counters: { countMoney, countDnk, setCountMoney, setCountDnk, incrementCountMoneyForClick },
    increases: { pasIncreaseMoney, actIncreaseMoney },
    end: { end, setEnd },
    resetStats, 
  } = useStatsContext();

  // Используем кастомный хук для доступа к данным из ShopContext
  const {
    skins: { backgroundImage, setBackgroundImage },
    resetShop,
  } = useShopContext();

  // Используем кастомный хук для доступа к данным из UIContext
  const {
    alert: { alertMessage, alertOnConfirm, alertOnCancel },
    tooltip: { tooltipPosition, isUpgradeHovered, isDnkHovered, isBusterHovered, isCounterHovered, isSkinHovered },
    story: { storyIntroShown, storyAutroShown },
    trainerImage: { trainerImage },
    resultImages: { resultImages },
    resetUI,
  } = useUIContext();

  // Сброс прогресса
  useEffect(() => {
    if (countDnk === 0n && storyAutroShown) {
      resetStats()
      resetShop()
      resetUI()
    }
  }, [countDnk, storyAutroShown]);

  return (
    <div className="App">
      {end && !storyAutroShown && <StoryAutro />}
      {end && storyAutroShown && countDnk !== 0n && <DnkUpgrades />}
      {!end && !storyIntroShown && <StoryIntro />}

      <Client />
      <Trainer/>
      <Counters />
      <SliderContainer
        goNext={() => {}}
        goPrev={() => {}}
      />

      <BgCharacterBlock />
      {(isBusterHovered || isUpgradeHovered || isCounterHovered || isDnkHovered || isSkinHovered) &&
        <Tooltip/>
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