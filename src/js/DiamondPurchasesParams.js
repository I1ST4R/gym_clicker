const DefaultDiamondPurchasesParams = {
  isBuyed: false,
  isActive: false,
};

const DiamondPurchasesParams = [
  {
    price: 2,
    changes: "Bg",
    desc: "Облик заднего фона"
  },
  {
    price: 2,
    changes: "Bg",
    desc: "Облик заднего фона"
  },
  {
    price: 2,
    changes: "Bg",
    desc: "Новые облики для клиентов"
  },
  {
    price: 2,
    changes: "Client",
    desc: "Облик заднего фона"
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