import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; 
import Trainer from '../Trainer.jsx';
import Counters from '../Counters.jsx';
import Busters from '../Busters.jsx';
import Client from '../Client.jsx';
import Upgrades from '../Upgrades.jsx';
import DiamondUpgrades from '../DiamondUpgrades.jsx';
import BustersParams from '../js/BustersParams.js';
import UpgradesParams from '../js/UpgradesParams.js';
import DiamondUpgradesParams from '../js/DiamondUpgradesParams.js';
import StoryIntro from '../StoryIntro.jsx'; 
import StoryAutro from '../StoryAutro.jsx'; 
import '../css/App.css';
import '../css/SliderStyles.css';
import abbreviateNum from '../js/numberAbbreviator.js'; 

function App() {

  const [countMoney, setCountMoney] = useState(() => {
    const savedCountMoney = localStorage.getItem('countMoney');
    return savedCountMoney ? parseInt(savedCountMoney, 10) : 0;
  });

  const [countDiamond, setCountDiamond] = useState(() => {
    const savedCountDiamond = localStorage.getItem('countDiamond');
    return savedCountDiamond ? parseInt(savedCountDiamond, 10) : 0;
  });

  const [multiplier, setMultiplier] = useState(() => {
    const savedMultiplier = localStorage.getItem('multiplier');
    return savedMultiplier ? parseInt(savedMultiplier, 10) : 30;
  });

  const [priceMultiplier, setPriceMultiplier] = useState(() => {
    const savedPriceMultiplier = localStorage.getItem('priceMultiplier');
    return savedPriceMultiplier ? parseInt(savedPriceMultiplier, 10) : 1;
  });

  const [increaseMultiplier, setIncreaseMultiplier] = useState(() => {
    const savedIncreaseMultiplier = localStorage.getItem('increaseMultiplier');
    return savedIncreaseMultiplier ? parseInt(savedIncreaseMultiplier, 10) : 1;
  });

  const [minDelay, setMinDelay] = useState(() => {
    const savedMinDelay = localStorage.getItem('minDelay');
    return savedMinDelay ? parseInt(savedMinDelay, 10) : 300000;
  });

  const [maxDelay, setMaxDelay] = useState(() => {
    const savedMaxDelay = localStorage.getItem('maxDelay');
    return savedMaxDelay ? parseInt(savedMaxDelay, 10) : 600000;
  });

  const [trainerImage, setTrainerImage] = useState(() => {
    const savedTrainerImage = localStorage.getItem('trainerImage');
    return savedTrainerImage || "src/assets/Trainer/img1.png";
  });

  const [pasIncreaseMoney, setPasIncreaseMoney] = useState(() => {
    const savedPasIncreaseMoney = localStorage.getItem('pasIncreaseMoney');
    return savedPasIncreaseMoney ? parseInt(savedPasIncreaseMoney, 10) : 0;
  });

  const [actIncreaseMoney, setActIncreaseMoney] = useState(() => {
    const savedActIncreaseMoney = localStorage.getItem('actIncreaseMoney');
    return savedActIncreaseMoney ? parseInt(savedActIncreaseMoney, 10) : 1;
  });

  const [resultImages, setResultImages] = useState(() => {
    const savedResultImages = localStorage.getItem('resultImages');
    return savedResultImages ? JSON.parse(savedResultImages) : [];
  });

  const [upgrades, setUpgrades] = useState(() => {
    const savedUpgrades = localStorage.getItem('upgrades');
    return savedUpgrades ? JSON.parse(savedUpgrades) : UpgradesParams;
  });

  const [diamondUpgrades, setDiamondUpgrades] = useState(() => {
    const savedDiamondUpgrades = localStorage.getItem('diamondUpgrades');
    return savedDiamondUpgrades ? JSON.parse(savedDiamondUpgrades) : DiamondUpgradesParams;
  });

  const [busters, setBusters] = useState(() => {
    const savedBusters = localStorage.getItem('busters');
    return savedBusters ? JSON.parse(savedBusters) : BustersParams;
  });

  const [isDiscountExists, setIsDiscountExists] = useState(() => {
    const savedIsDiscountExists = localStorage.getItem('isDiscountExists');
    return savedIsDiscountExists ? JSON.parse(savedIsDiscountExists) : false;
  });

  const [cooldwonDiscount, setCooldwonDiscount] = useState(() => {
    const savedCooldwonDiscount = localStorage.getItem('cooldwonDiscount');
    return savedCooldwonDiscount ? JSON.parse(savedCooldwonDiscount) : 1;
  });

  const [storyShown, setStoryShown] = useState(() => {
    const savedStoryShown = localStorage.getItem('storyShown');
    return savedStoryShown ? JSON.parse(savedStoryShown) : false;
  });

  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, right: 0 , id: 1});

  const [isUpgradeHovered, setIsUpgradeHovered] = useState(false);

  const [isDUpgradeHovered, setIsDUpgradeHovered] = useState(false);

  const [isBusterHovered, setIsBusterHovered] = useState(false);

  const [showStory, setShowStory] = useState(!storyShown);

  const [end, setEnd] = useState(false);

  useEffect(() => {
    localStorage.setItem('countMoney', countMoney.toString());
  }, [countMoney]);

  useEffect(() => {
    localStorage.setItem('countDiamond', countDiamond.toString());
  }, [countDiamond]);

  useEffect(() => {
    localStorage.setItem('multiplier', multiplier.toString());
  }, [multiplier]);

  useEffect(() => {
    localStorage.setItem('priceMultiplier', priceMultiplier.toString());
  }, [priceMultiplier]);

  useEffect(() => {
    localStorage.setItem('increaseMultiplier', increaseMultiplier.toString());
  }, [increaseMultiplier]);

  useEffect(() => {
    localStorage.setItem('minDelay', minDelay.toString());
  }, [minDelay]);

  useEffect(() => {
    localStorage.setItem('maxDelay', maxDelay.toString());
  }, [maxDelay]);

  useEffect(() => {
    localStorage.setItem('trainerImage', trainerImage);
  }, [trainerImage]);

  useEffect(() => {
    localStorage.setItem('pasIncreaseMoney', pasIncreaseMoney.toString());
  }, [pasIncreaseMoney]);

  useEffect(() => {
    localStorage.setItem('actIncreaseMoney', actIncreaseMoney.toString());
  }, [actIncreaseMoney]);

  useEffect(() => {
    localStorage.setItem('resultImages', JSON.stringify(resultImages));
  }, [resultImages]);

  useEffect(() => {
    localStorage.setItem('isDiscountExists', JSON.stringify(isDiscountExists));
  }, [isDiscountExists]);

  useEffect(() => {
    localStorage.setItem('cooldwonDiscount', JSON.stringify(cooldwonDiscount));
  }, [cooldwonDiscount]);



  const incrementCountMoneyForClick = () => {
    setCountMoney(countMoney + actIncreaseMoney);
  };

  const incrementCountDiamond = () => {
    const increaseDiamond = Math.random() * 100 > 92
    setCountDiamond(countDiamond + increaseDiamond );
  };
  
  const [windowWidth, setwindowWidth] = useState(window.innerWidth);

  window.addEventListener("resize", () => {
    setwindowWidth(window.innerWidth)
  });

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
  }, [pasIncreaseMoney, actIncreaseMoney]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountMoney((prevCountMoney) => prevCountMoney + pasIncreaseMoney);
    }, 1000);
    return () => clearInterval(interval);
  }, [pasIncreaseMoney]);
  
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

  const DUpgradesPrices = [1, 2, 5, 10]

  return (
   
    <>
      {showStory && <StoryIntro onClose={() => setShowStory(false)} />}
      
      {end && <StoryAutro/>}
      <Client
        minDelay={minDelay}
        maxDelay={maxDelay}
        numOfClicks={10}
        waitingTime={10000}
        onCounterMoneyChange={setCountMoney}
        countMoney={countMoney}
        pasIncreaseMoney={pasIncreaseMoney}
        actIncreaseMoney={actIncreaseMoney}
        multiplier={multiplier}
      />
      <Trainer trainerImage={trainerImage} onClick={() => incrementCountMoneyForClick()} />
      <Counters 
        countMoney={countMoney} 
        pasIncreaseMoney={pasIncreaseMoney}
        countDiamond={countDiamond} 
      />
      <div className="slider-container">
        <button className="button-prev" onClick={goPrev}>
          <svg width="30" height="21" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M21 7C21.5523 7 22 7.44772 22 8C22 8.55228 21.5523 9 21 9V7ZM0.292892 8.70711C-0.0976315 8.31658 -0.0976315 7.68342 0.292892 7.29289L6.65685 0.928932C7.04738 0.538408 7.68054 0.538408 8.07107 0.928932C8.46159 1.31946 8.46159 1.95262 8.07107 2.34315L2.41421 8L8.07107 13.6569C8.46159 14.0474 8.46159 14.6805 8.07107 15.0711C7.68054 15.4616 7.04738 15.4616 6.65685 15.0711L0.292892 8.70711ZM21 9H1V7H21V9Z" fill="black"></path>
					</svg>
        </button>
        <button className="button-next" onClick={goNext}>
        <svg width="30" height="21" viewBox="0 0 22 16" fill="none"   xmlns="http://www.w3.org/2000/svg">
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
            <Upgrades
              onIncreaseDiamond={incrementCountDiamond}
              onPasIncreaseMoneyChange={setPasIncreaseMoney}
              pasIncreaseMoney={pasIncreaseMoney}
              onActIncreaseMoneyChange={setActIncreaseMoney}
              actIncreaseMoney={actIncreaseMoney}
              onLevelTrainerChange={(newImage) => setTrainerImage(newImage)}
              onCounterMoneyChange={setCountMoney}
              countMoney={countMoney}
              onCounterUpgradesChange={setUpgrades}
              upgrades={upgrades}
              priceMultiplier={priceMultiplier}
              increaseMultiplier={increaseMultiplier}
              isDiscountExists={isDiscountExists}
              onIsDiscountExistsChange={setIsDiscountExists}
              onEndChange={setEnd}
              onTooltipPositionChange={setTooltipPosition}
              onIsUpgradeHoveredChange={setIsUpgradeHovered}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Busters
              onIncreaseDiamond={incrementCountDiamond}
              onPasIncreaseMoneyChange={setPasIncreaseMoney}
              pasIncreaseMoney={pasIncreaseMoney}
              onActIncreaseMoneyChange={setActIncreaseMoney}
              actIncreaseMoney={actIncreaseMoney}
              onCounterMoneyChange={setCountMoney}
              countMoney={countMoney}
              onCounterBustersChange={setBusters}
              busters={busters}
              onIsDiscountExistsChange={setIsDiscountExists}
              cooldwonDiscount={cooldwonDiscount}
              onTooltipPositionChange={setTooltipPosition}
              onIsBusterHoveredChange={setIsBusterHovered}
            />
          </SwiperSlide>
          <SwiperSlide>
            <DiamondUpgrades
              onMaxDelayChange={setMaxDelay}
              maxDelay={maxDelay}
              onMinDelayChange={setMinDelay}
              minDelay={minDelay}
              onMultiplierChange={setMultiplier}
              multiplier={multiplier}
              onCounterDiamondChange={setCountDiamond}
              diamond={countDiamond}
              onCounterBustersChange={setBusters}
              busters={busters}
              onCounterDiamondsUpgradesChange={setDiamondUpgrades}
              diamondUpgrades={diamondUpgrades}
              onPriceMultiplierChange={setPriceMultiplier}
              onIncreaseMultiplierChange={setIncreaseMultiplier}
              onCooldwonDiscountChange={setCooldwonDiscount}
              onTooltipPositionChange={setTooltipPosition}
              onIsDUpgradeHoveredChange={setIsDUpgradeHovered}
            />
          </SwiperSlide>
        </Swiper>
      </div> 

      {/*Tooltip for DUpgrades*/}
      {isDUpgradeHovered && (
        <div
          className="Tooltip"
          style={{
            top: `80px`,
            right: `530px`,
          }}
        >
        {!(diamondUpgrades[tooltipPosition.id - 1].level === 4) ?
        (
            <>
            <p className="Tooltip__upgrade-info">
              {`
              Улучшение: 
              ${diamondUpgrades[tooltipPosition.id - 1].benefit} 
              ${DUpgradesPrices[diamondUpgrades[tooltipPosition.id - 1].level]}%
              `}
            </p>
            <div className="Tooltip__price-block">
              {`
              Стоимость: 
              ${DUpgradesPrices[diamondUpgrades[tooltipPosition.id - 1].level]} 
              `}
              <img src="src/assets/diamond.png" alt="" />
            </div>
            </>
          ) : 
          (
            <>
              <div
                  className="Tooltip"
                  style={{
                    top: `${tooltipPosition.top}px`,
                    right: `${tooltipPosition.right}px`,
                }}
                >
                <p className="Tooltip__upgrade-info">
                  Максимальный уровень
                </p>
              </div>
            </>
          )}
          
        </div>
      )}

      {/*Tooltip for Busters*/}    
      {isBusterHovered && (
        <div
          className="Tooltip"
          style={{
            top: `${tooltipPosition.top}px`,
            right: `530px`,
          }}
        >
          <p>{busters[tooltipPosition.id - 1].desc}</p>
          <p className="Tooltip__upgrade-info">{
            `Улучшение: ${busters[tooltipPosition.id - 1].upgradeInfo}`
          }</p>
          <p className="Tooltip__benefit">{
            `Эффект: ${busters[tooltipPosition.id - 1].benefit}`
          }</p>
        </div>
      )}    

      {/*Tooltip for Upgrades*/}
      { isUpgradeHovered && 
      tooltipPosition.id != 16 && (
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
                  + ${abbreviateNum(Math.floor(upgrades[tooltipPosition.id  - 1].initialIncrease))} 
                  ${upgrades[tooltipPosition.id  - 1].isIncreaseMoney ? "за клик" : "в секунду"}
                `}
              </p>    
          </div>
        )
      }

      { isUpgradeHovered && 
      tooltipPosition.id === 16 && 
      upgrades[tooltipPosition.id - 2].level >= 50 &&(
          <div
            className="Tooltip"
            style={{
              top: `${tooltipPosition.top}px`,
              right: `530px`,
            }}
          >
            <p className="Tooltip__last">ВНИМАНИЕ! После покупки этой карточки игра будет считаться пройденой. Если вы не хотите завершать прохождение не покупайте это улучшение!</p>    
          </div>
        )
      }

      {/*Result images*/}
      {resultImages.map((image, index) => (
        <img
          key={index} 
          src={image.src}
          style={{
            position: 'absolute',
            left: `${(windowWidth - 480)/2 +image.x}px`,
            top: `${image.y}px`,
            width: `${image.width}px`,
            height: `${image.height}px`,
            zIndex:`${image.zIndex}`,
            userSelect: `none`,
            pointerEvents: `none`,
          }}
          alt="Result"
        />
      ))}
    </>
  );
}

export default App;