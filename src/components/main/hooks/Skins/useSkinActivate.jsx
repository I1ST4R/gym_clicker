import { useShopContext } from '../../contexts/ShopContext';

export const useSkinActivate = () => {

  const { skins:{ 
    diamondPurchases, setDiamondPurchases,
    setBackgroundImage, 
    setIsClientImgAdded,
    setCursorImage,
    setBackgroundRightImage,
    setIsBgCharacterAdded,
    setBackgroundLeftImage
    } } = useShopContext()

  const handleSkinActivate = (id) => {

    const activatedItem = diamondPurchases.find(item => item.id === id);
    const activatedChanges = activatedItem.changes;
    const isCurrentlyActive = activatedItem.isActive;
    const willBeActive = !isCurrentlyActive;

    setDiamondPurchases(prev => {
      const updatedPurchases = prev.map(item => {
        if (item.id === id) {
          return { ...item, isActive: willBeActive };
        }
        return {
          ...item,
          ...(item.changes === activatedChanges && { isActive: false })
        };
      });
      return updatedPurchases;
    });

    if (willBeActive) {
      switch (id) {
        case 1: case 2: case 3: case 4: case 9: case 11: case 12:
          setBackgroundImage(activatedItem.img);
          break;
        case 5: setIsClientImgAdded(true); break;
        case 6: setCursorImage(activatedItem.img); break;
        case 7: setBackgroundRightImage(false); break;
        case 8: setIsBgCharacterAdded(true); break;
        case 10: setBackgroundLeftImage(false); break;
        default: break;
      }
    } else {
      switch (id) {
        case 1: case 2: case 3: case 4: case 9: case 11: case 12:
          setBackgroundImage(null);
          break;
        case 5: setIsClientImgAdded(false); break;
        case 6: setCursorImage(null); break;
        case 7: setBackgroundRightImage(true); break;
        case 8: setIsBgCharacterAdded(false); break;
        case 10: setBackgroundLeftImage(true); break;
        default: break;
      }
    }
  }

  return handleSkinActivate
}