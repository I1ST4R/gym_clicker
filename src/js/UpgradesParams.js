import getTrainerImage from './TrainerLevels';

const UpgradesParams = [
  {
    id: 1,
    title: "Подкачаться",
    img: "./src/assets/Trainer/img2.jpg",
    resultImg: false,
    desc: "Когда ты весишь 150 сложно не платить тебе за персональные тренировки",
    initialPrice: 150,
    initialIncrease: 1,
    isIncreaseMoney: true,
    images: getTrainerImage, 
    maxLvl: 20,
    isHidden: false,
    isInvisible: false,
    requirements: 0,
    level: 0,
  },
  {
    id: 2,
    title: "реклама",
    img: "src/assets/Upgrades/upgrade2.jpeg",
    resultImg: "src/assets/Upgrades/upgradeResult2.png",
    resultImgPositionX: 1040,
    resultImgPositionY: 250,
    resultImgWidth: 150,
    resultImgHeight: 300,
    desc: "Теперь о тебе будут знать не только бабушки из твоего подъезда",
    initialPrice: 900,
    initialIncrease: 6,
    isIncreaseMoney: false,
    images: () => false,
    maxLvl: 100,
    isHidden: true,
    isInvisible: false,
    requirements: 0,
    level: 0,
  },
  {
    id: 3,
    title: "выступить на России",
    img: "src/assets/Upgrades/upgrade3.png",
    resultImg: "src/assets/Upgrades/upgradeResult3.png",
    resultImgPositionX: 770,
    resultImgPositionY: 580,
    resultImgWidth: 160,
    resultImgHeight: 160,
    desc: "Помимо двух банок просроченного протеина ты получаешь большее уважение к своей персоне",
    initialPrice: 7000,
    initialIncrease: 47,
    isIncreaseMoney: true,
    images: () => false,
    maxLvl: 100,
    isHidden: true,
    isInvisible: true,
    requirements: 0,
    level: 0,
  },
  {
    id: 4,
    title: "коллаборация",
    img: "src/assets/Upgrades/upgrade4.png",
    resultImg: "src/assets/Upgrades/upgradeResult4.png",
    resultImgPositionX: 680,
    resultImgPositionY: 370,
    resultImgWidth: 180,
    resultImgHeight: 300,
    desc: "Известные спортивные блогеры наконец-то заметили обычного паренька из деревни с 'заурядной' генетикой",
    initialPrice: 75000,
    initialIncrease: 150,
    isIncreaseMoney: false,
    images: () => false,
    maxLvl: 100,
    isHidden: true,
    isInvisible: true,
    requirements: 0,
    level: 0,
  },
  {
    id: 5,
    title: "подвальная качалка",
    img: "src/assets/Upgrades/upgrade5.png",
    resultImg: "src/assets/Upgrades/upgradeResult5.png",
    resultImgPositionX: 1180,
    resultImgPositionY: 570,
    resultImgWidth: 170,
    resultImgHeight: 300,
    desc: "Отсюда свой путь начинали многие известные бодибилдеры",
    initialPrice: 820000,
    initialIncrease: 5460,
    isIncreaseMoney: false,
    images: () => false,
    maxLvl: 100,
    isHidden: true,
    isInvisible: true,
    requirements: 2000,
    level: 0,
  },
  {
    id: 6,
    title: "Мистер Олимпия",
    img: "src/assets/Upgrades/upgrade6.png",
    resultImg: "src/assets/Upgrades/upgradeResult6.png",
    resultImgPositionX: 1015,
    resultImgPositionY: 580,
    resultImgWidth: 160,
    resultImgHeight: 160,
    desc: "Вы - легенда",
    initialPrice: 9000000,
    initialIncrease: 60000,
    isIncreaseMoney: false,
    images: () => false,
    maxLvl: 100,
    isHidden: true,
    isInvisible: true,
    requirements: 0,
    level: 0,
  },
  {
    id: 7,
    title: "клуб франшизы",
    img: "src/assets/Upgrades/upgrade7.png",
    resultImg: "src/assets/Upgrades/upgradeResult7.png",
    resultImgPositionX: 1150,
    resultImgPositionY: 350,
    resultImgWidth: 300,
    resultImgHeight: 200,
    desc: "Спортивный клуб вашей собственной франшизы (звучит гордо, но пока что это обычный фитнес - зал)",
    initialPrice: 97500000,
    initialIncrease: 650000,
    isIncreaseMoney: false,
    images: () => false,
    maxLvl: 100,
    isHidden: true,
    isInvisible: true,
    requirements: 700000,
    level: 0,
  },
  {
    id: 8,
    title: "личный бренд",
    img: "src/assets/Upgrades/upgrade8.png",
    resultImg: "src/assets/Upgrades/upgradeResult8.png",
    resultImgPositionX: 720,
    resultImgPositionY: 210,
    resultImgWidth: 300,
    resultImgHeight: 200,
    desc: "Теперь вы законодатель моды в комьюнити бодибилдинга",
    initialPrice: 877500000,
    initialIncrease: 5850000,
    isIncreaseMoney: false,
    images: () => false,
    maxLvl: 100,
    isHidden: true,
    isInvisible: true,
    requirements: 5000000,
    level: 0,
  },
];

export default UpgradesParams;