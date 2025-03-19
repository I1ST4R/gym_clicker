const DefaultDiamondPurchasesParams = {
  isBuyed: false,
  isActive: false,
};

const DiamondPurchasesParams = [
  {
    price: 2,
    changes: "Bg",
  },
  {
    price: 5,
    changes: "Bg",
  },
].map((upgrade, index) => {
  const id = index + 1; 
  const img = `Skins/skin${id}.png`; 

  return {
    id,
    img,
    ...DefaultDiamondPurchasesParams, 
    ...upgrade, 
  };
});

export default DiamondPurchasesParams;