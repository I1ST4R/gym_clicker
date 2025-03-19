import React, { useContext, useEffect } from 'react';
import './css/slide.css';
import Skin from './Skin.jsx';
import { AppContext } from './main/AppContext.jsx';

function Skins() {
  const {
    diamondPurchases,
    setDiamondPurchases,
    countDiamond,
    setCountDiamond,
    setBackgroundImage,
    setIsClientImgAdded,
  } = useContext(AppContext);

  const handleActiveChanges = () => {
    const activeItem = diamondPurchases.find(item => item.isActive);

    if (activeItem) {
      switch (activeItem.id) {
        case 1:
        case 2:
          setBackgroundImage(activeItem.img);
          break;
        case 3:
          setIsClientImgAdded(true)
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    handleActiveChanges();
  }, [diamondPurchases]);

  const handleActivate = (id) => {
    const updatedPurchases = diamondPurchases.map(item => {
      if (item.id === id) {
        return { ...item, isActive: true };
      } else {
        return { ...item, isActive: false };
      }
    });
    setDiamondPurchases(updatedPurchases);
  };

  const handleBuy = (id) => {
    const itemToBuy = diamondPurchases.find(item => item.id === id);

    if (itemToBuy && !itemToBuy.isBuyed && countDiamond >= BigInt(itemToBuy.price)) {
      setCountDiamond(countDiamond - BigInt(itemToBuy.price));

      const updatedPurchases = diamondPurchases.map(item => {
        if (item.id === id) {
          return { ...item, isBuyed: true, isActive: true };
        }
        return item;
      });

      setDiamondPurchases(updatedPurchases);
    }
  };

  return (
    <div className="slide">
      <div className="slide__title">
        <p>Улучшения</p>
      </div>
      <div className="slide__grid-container">
        {diamondPurchases.map((upgrade) => (
          <Skin
            key={upgrade.id}
            {...upgrade}
            onActivate={handleActivate}
            onBuy={handleBuy}
          />
        ))}
      </div>
    </div>
  );
}

export default Skins;