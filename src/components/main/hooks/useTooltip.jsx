import { useState, useCallback, useEffect } from 'react';
import { saveState } from '../../../js/storage';
import abbreviateNum from '../../../js/numberAbbreviator.js';

export const useTooltip = () => {
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, right: 530, id: 1 });
  const [isUpgradeHovered, setIsUpgradeHovered] = useState(false);
  const [isDnkHovered, setIsDnkHovered] = useState(false);
  const [isBusterHovered, setIsBusterHovered] = useState(false);
  const [isCounterHovered, setIsCounterHovered] = useState(false);
  const [isSkinHovered, setIsSkinHovered] = useState(false);
  const [tooltipContent, setTooltipContent] = useState(null);
  const [tooltipType, setTooltipType] = useState('null');
  const [diamondPositive, setDiamondPositive] = useState(false);
  const [pasPositive, setPasPositive] = useState(false);

  const handleTooltipMouseEnter = useCallback((event, id, type, right = 530) => {
    const cardRect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      top: cardRect.top,
      right: 460,
      id: id,
    });

    switch (type) {
      /*
      case 'dnk':
        setTooltipPosition({
          top: 460,
          right: window.innerWidth - cardRect.right - 30,
        });
        setIsDnkHovered(true);
        break;
        */
      case 'skin': setIsSkinHovered(true); break;
      case 'upgrade': setIsUpgradeHovered(true); break;
      case 'buster': setIsBusterHovered(true); break;
      case 'counter':
        setTooltipPosition({
          top:20,
          right: 40,
        });
        setIsCounterHovered(true);
        break;
      default: break;
    }
  }, []);

  const handleTooltipMouseLeave = useCallback(() => {
    setIsDnkHovered(false);
    setIsSkinHovered(false);
    setIsUpgradeHovered(false);
    setIsBusterHovered(false);
    setIsCounterHovered(false);
  }, []);

  const updateTooltipContent = (upgrades, busters, dnkUpgrades, diamondPurchases, increaseMultiplier) => {
    if (isSkinHovered) {
      const skin = diamondPurchases[tooltipPosition.id - 1];
      setTooltipContent({
        desc: skin.desc,
        price: skin.price,
        isBuyed: skin.isBuyed,
      });
      setTooltipType('Skin');
    } else if (isDnkHovered) {
      const dnk = dnkUpgrades[tooltipPosition.id - 1];
      setTooltipContent({
        top: 500,
        benefit: dnk.benefit,
      });
      setTooltipType('Dnk');
    } else if (isCounterHovered) {
      setTooltipType('Counters');
    } else if (isBusterHovered) {
      const buster = busters[tooltipPosition.id - 1];
      setTooltipContent({
        desc: buster.desc,
        upgradeInfo: buster.upgradeInfo,
        benefit: buster.benefit,
      });
      setTooltipType('Busters');
    } else if (isUpgradeHovered) {
      const upgrade = upgrades[tooltipPosition.id - 1];
      setTooltipContent({
        desc: upgrade.desc,
        initialIncrease: abbreviateNum(
          typeof upgrade.initialIncrease === 'bigint'
            ? (upgrade.initialIncrease / 100n) * BigInt(Math.floor(increaseMultiplier * 100))
            : Math.floor(upgrade.initialIncrease * increaseMultiplier)
        ),
        isIncreaseMoney: upgrade.isIncreaseMoney,
        isLastUpgrade: tooltipPosition.id === 19 && upgrades[tooltipPosition.id - 2].level >= 50,
      });
      setTooltipType('Upgrades');
    } else {
      setTooltipContent(null);
      setTooltipType('null');
    }
  };

  const resetTooltip = () => {
    setTooltipPosition({ top: 0, right: 530, id: 1 });
    setIsUpgradeHovered(false);
    setIsDnkHovered(false);
    setIsBusterHovered(false);
    setIsCounterHovered(false);
    setIsSkinHovered(false);
  };

  // Сохранение состояния
  useEffect(() => {
    saveState('tooltipPosition', JSON.stringify(tooltipPosition));
    saveState('isUpgradeHovered', JSON.stringify(isUpgradeHovered));
    saveState('isDnkHovered', JSON.stringify(isDnkHovered));
    saveState('isBusterHovered', JSON.stringify(isBusterHovered));
    saveState('isCounterHovered', JSON.stringify(isCounterHovered));
    saveState('isSkinHovered', JSON.stringify(isSkinHovered));
  }, [tooltipPosition, isUpgradeHovered, isDnkHovered, isBusterHovered, isCounterHovered, isSkinHovered]);

  return {
    tooltipPosition,
    setTooltipPosition,
    isUpgradeHovered,
    setIsUpgradeHovered,
    isDnkHovered,
    setIsDnkHovered,
    isBusterHovered,
    setIsBusterHovered,
    isCounterHovered,
    setIsCounterHovered,
    isSkinHovered,
    setIsSkinHovered,
    tooltipContent,
    setTooltipContent,
    tooltipType,
    diamondPositive,
    setDiamondPositive,
    pasPositive,
    setPasPositive,
    setTooltipType,
    updateTooltipContent,
    handleTooltipMouseEnter,
    handleTooltipMouseLeave,
    resetTooltip,
  };
};