const DefaultBusterParams = {
  cooldown: 1800000,
  maxLvl: 10,
  isActive: true,
  level: 0,
  upgradeInfo: "ожидание перезарядки бустера уменьшается на 7%",
  curCooldown: 0,
};

const BustersParams = [
  {
    title: "Расставание",
    desc: "Теперь ты настоящий сигма",
    benefit: "получай за 1 клик столько же сколько получаешь в секунду",
    initialPrice: 100,
    time: 10000,
  },

  {
    title: "Без побочек",
    desc: "Если ты не знаешь что это то и не стоит",
    benefit: "получай в 7 раз больше с каждого клиента",
    initialPrice: 1000,
    time: 10000,
  },

  {
    title: "Награда",
    desc: "Ты много сделал для продвижения спорта, держи анонимное пожертвование",
    benefit: "получи денежный бонус",
    initialPrice: 5000,
    time: 0,
  },

  {
    title: "Памятник",
    desc: "Вау! В твою честь построили памятник",
    benefit: "получи больше популярности",
    initialPrice: 10000,
    time: 0,
  },

  {
    title: "Экономия",
    desc: "Вместо рабочих позвал мужиков с качалки - на этом и сэкономил",
    benefit: "50% скидка на любую следующую покупку улучшения",
    initialPrice: 50000,
    time: 0,
  },
].map((upgrade, index) => {
  const id = index + 1; 
  const img = `Busters/img${id}.png`; 

  return {
    id,
    img,
    ...DefaultBusterParams, 
    ...upgrade, 
  };
});

export default BustersParams;