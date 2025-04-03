import { updateArray } from '../../../../js/updateArray.js'
import getTrainerImage from '../../../../js/TrainerLevels.js';
import upgradeLevelUp from '../../../../../public/sounds/upgradeLevelUp.mp3';
import { useStatsContext } from '../../contexts/StatsContext'
import { useShopContext } from '../../contexts/ShopContext'
import { useUIContext } from '../../contexts/UIContext'

export const useUpgradeLevelChange = () => {

  const {
    busters:{ setIsDiscountExists },
    upgrades:{ upgrades, setUpgrades, useUpgradeCalculations },
    dnk: { increaseMultiplier }
  } = useShopContext()

  const {
    counters: { countMoney, setCountMoney, setCountDiamond },
    increases: {
      pasIncreaseMoney,
      setPasIncreaseMoney,
      actIncreaseMoney,
      setActIncreaseMoney,
    },
    end: { setEnd }
  } = useStatsContext();

  const {
      alert: { showAlert, setShowCustomAlert },
      trainerImage: { setTrainerImage },
    } = useUIContext();

  const { calculateUpgradePrice} = useUpgradeCalculations();

  const increaseDiamond = () => {
    const chanse = Math.random() * 100 > 97
    chanse ? setCountDiamond(prev => prev + 1n) : ""
  }

  const handleUpgradeLevelChange = (id) => {

    const upgrade = upgrades.find(u => u.id === id);

    if (upgrade.initialPrice > countMoney) return

    increaseDiamond()

    id === 1 ? setTrainerImage(getTrainerImage(upgrade.level + 1)) : ""
    new Audio(upgradeLevelUp).play();

    if (upgrade.id === upgrades.length) {
      showAlert(
        "При улучшении этой карточки игра будет завершена. Вы уверены, что хотите продолжить?",
        () => {
          setShowCustomAlert(false);
          setEnd(true);
        },
        () => {
          setShowCustomAlert(false);
        }
      );
    }

    const isSmallNumber = upgrade.id < 7;
    const difference = !upgrade.isIncreaseMoney ? 0.035 : 0;
    let newIncrease, newPrice, BigIntInc;

    if (isSmallNumber) {
      const initialIncreaseNumber = Number(upgrade.initialIncrease);
      BigIntInc = BigInt(Math.floor(initialIncreaseNumber * increaseMultiplier));
      newIncrease = initialIncreaseNumber * (1.15 - difference) * increaseMultiplier;
      newPrice = Number(upgrade.initialPrice) * 1.16;
    } else {
      BigIntInc = (upgrade.initialIncrease / 100n) * BigInt(Math.floor(increaseMultiplier * 100));
      const diffMultiplier = BigInt(Math.ceil((1.15 - difference) * 100));
      newIncrease = (upgrade.initialIncrease / 100n) * diffMultiplier;
      newPrice = (upgrade.initialPrice / 100n) * 116n;
    }

    if (upgrade.isIncreaseMoney) {
      setActIncreaseMoney(actIncreaseMoney + BigIntInc);
    } else {
      setPasIncreaseMoney(pasIncreaseMoney + BigIntInc);
    }

    updateArray(setUpgrades, {
      level: upgrade.level + 1,
      initialIncrease: newIncrease,
      initialPrice: newPrice,
    }, id);

    setIsDiscountExists(false);
    setCountMoney(countMoney - calculateUpgradePrice(id));
  };

  return handleUpgradeLevelChange
};