import { useShopContext } from '../../contexts/ShopContext';
import { useStatsContext } from '../../contexts/StatsContext';
import { useSkinActivate } from './useSkinActivate.jsx';
import { updateArray } from '../../../../js/updateArray.js';

export const useSkinBuy = () => {

  const {
    skins: {
      diamondPurchases, setDiamondPurchases,
  } } = useShopContext()

  const {
    counters: {
      countDiamond, setCountDiamond,
    } }  = useStatsContext()


  const handleActivate = useSkinActivate()


  const handleSkinBuy = (id) => {
    const itemToBuy = diamondPurchases.find(item => item.id === id);

    if (!itemToBuy.isBuyed && countDiamond >= itemToBuy.price) {
      setCountDiamond(countDiamond - BigInt(itemToBuy.price));
      updateArray( setDiamondPurchases, { isBuyed: true}, id )
      handleActivate(id)
    }
  }

  return handleSkinBuy
}