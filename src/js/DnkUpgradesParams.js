const DnkUpgradesParams = [
  {
    benefit: "понижение цен на все улучшения на 1%", 
  },
  {
    benefit: "повышение будущего дохода всех карточек на 1%", 
  },
  {
    benefit: "снижение времени ожидания бустеров на 1%", 
  },
  {
    benefit: "снижение времени ожидания клиента на 1%", 
  },
  {
    benefit: "повышение количества денег за клиента на 1%", 
  },
].map((upgrade, index) => {
  const id = index + 1; 
  const img = `DnkUpgrades/img${id}.png` 
  return {
    id,
    img,
    level: 0, 
    ...upgrade, 
  };
})

export default DnkUpgradesParams;