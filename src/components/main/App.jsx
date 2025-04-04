import React, { useEffect } from 'react';
import Trainer from '../static/Trainer.jsx';
import Counters from '../static/Counters.jsx';
import Client from '../showingComponents/Client.jsx';
import DnkUpgrades from '../shop/DnkUpgrades/DnkUpgrades.jsx';
import StoryIntro from '../showingComponents/stories/StoryIntro.jsx';
import StoryAutro from '../showingComponents/stories/StoryAutro.jsx';
import Tooltip from '../showingComponents/Tooltip/Tooltip.jsx';
import CustomAlert from '../showingComponents/CustomAlert';
import Footer from '../static/Footer';
import '../../css/App.css';
import SliderContainer from '../shop/SliderContainer.jsx';
import ImageSections from '../showingComponents/ImageSections/ImageSections.jsx';
import BgCharacterBlock from '../showingComponents/BgCharacterBlock.jsx';
import { useStatsContext } from './contexts/StatsContext'; 
import { useShopContext } from './contexts/ShopContext'; 
import { useUIContext } from './contexts/UIContext'; 

function App() {

  const {
    counters: { countDnk, setCountMoney},
    increases: { usePassiveIncomeEffect },
    end: { end},
    resetStats, 
  } = useStatsContext();
  const {
    resetShop,
  } = useShopContext();

  // Используем кастомный хук для доступа к данным из UIContext
  const {
    alert: { alertMessage, alertOnConfirm, alertOnCancel },
    tooltip: { isUpgradeHovered, isDnkHovered, isBusterHovered, isCounterHovered, isSkinHovered },
    story: { storyIntroShown, storyAutroShown },
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

  usePassiveIncomeEffect(setCountMoney)

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