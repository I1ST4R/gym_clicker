import TrainerLevels from './TrainerLevels';

const UpgradesParams = [
  {
    id: 1,
    title: "Подкачаться",
    img: "./src/assets/Trainer/img2.jpg",
    desc: "Ты проходишь тренерские курсы и больше качаешся, тренировки с тобой теперь стоят дороже",
    benefit: "x2 денег за клик",
    maxLvlText: "Поздравляем! Теперь вы можете открывать свои залы",
    initialPrice: 200,
    increase: 2,
    images: TrainerLevels,
    maxLvl: 4,
    level: 0,
  },
  {
    id: 2,
    title: "купить рекламу",
    img: "src/assets/Upgrades/upgrade2.jpeg",
    desc: "Ты Привлекаешь новых клиентов через свой блог в соц сетях и получаешь дополниткльный доход",
    benefit: "x1.4 денег за клик",
    maxLvlText: "",
    initialPrice: 700,
    increase: 1.4,
    images: false,
    maxLvl: 7,
    level: 0,
  },
  {
    id: 3,
    title: "купить рекламу",
    img: "src/assets/Upgrades/upgrade2.jpeg",
    desc: "Ты Привлекаешь новых клиентов через свой блог в соц сетях и получаешь дополниткльный доход",
    benefit: "x1.4 денег за клик",
    maxLvlText: "",
    initialPrice: 700,
    increase: 1.4,
    images: false,
    maxLvl: 7,
    level: 0,
  },
  {
    id: 4,
    title: "купить рекламу",
    img: "src/assets/Upgrades/upgrade2.jpeg",
    desc: "Ты Привлекаешь новых клиентов через свой блог в соц сетях и получаешь дополниткльный доход",
    benefit: "x1.4 денег за клик",
    maxLvlText: "",
    initialPrice: 700,
    increase: 1.4,
    images: false,
    maxLvl: 7,
    level: 0,
  },
  // other upgrades
];

export default UpgradesParams;