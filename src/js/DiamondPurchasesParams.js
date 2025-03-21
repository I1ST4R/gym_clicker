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
    desc: "Облик заднего фона"
  },
  {
    price: 2,
    changes: "Bg",
    desc: "Облик заднего фона"
  },
  {
    price: 2,
    changes: "zzz",
    desc: "Дополнительные облики для клиентов"
  },
  {
    price: 2,
    changes: "Cursor",
    desc: "Облик для кусрсора мыши"
  },
  {
    price: 2,
    changes: "Bg-right",
    desc: "Прозрачный фон у магазина"
  },
  {
    price: 2,
    changes: "Bg-caracter",
    desc: "Добавление персонажа на задний фон"
  },
  {
    price: 2,
    changes: "Bg",
    desc: "Облик заднего фона"
  },
  {
    price: 2,
    changes: "Bg-left",
    desc: "Прозрачный фон у левой вкладки"
  },
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