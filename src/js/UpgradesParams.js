import getTrainerImage from './TrainerLevels.js';

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
    maxLvl: 25,
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
    resultImgPositionY: 350,
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
    resultImgPositionY: 620,
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
    resultImgPositionX: 1180,
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
  {
    id: 9,
    title: "Элитная качалка",
    img: "src/assets/Upgrades/upgrade9.png",
    resultImg: "src/assets/Upgrades/upgradeResult9.png",
    resultImgPositionX: 500,
    resultImgPositionY: 650,
    resultImgWidth: 300,
    resultImgHeight: 200,
    desc: "Да, атмосфера в зале уже не та.. Но зато сколько денег!",
    initialPrice: 9700000000,
    initialIncrease: 64000000,
    isIncreaseMoney: false,
    images: () => false,
    maxLvl: 100,
    isHidden: true,
    isInvisible: true,
    requirements: 80000000,
    level: 0,
  },
  {
    id: 10,
    title: "атлеты-мутанты",
    img: "src/assets/Upgrades/upgrade10.png",
    resultImg: "src/assets/Upgrades/upgradeResult10.png",
    resultImgPositionX: 870,
    resultImgPositionY: 800,
    resultImgWidth: 250,
    resultImgHeight: 140,
    desc: "Несколько лет на эксперименты - и теперь даже не нужно тренироваться чтобы быть как горилла",
    initialPrice: 110000000000,
    initialIncrease: 7300000000,
    isIncreaseMoney: false,
    images: () => false,
    maxLvl: 100,
    isHidden: true,
    isInvisible: true,
    requirements: 900000000,
    level: 0,
  },
  {
    id: 11,
    title: "страна качков",
    img: "src/assets/Upgrades/upgrade11.png",
    resultImg: "src/assets/Upgrades/upgradeResult11.png",
    resultImgPositionX: 1150,
    resultImgPositionY: 800,
    resultImgWidth: 200,
    resultImgHeight: 150,
    desc: "Выкупил несколько островов и организовал свою страну - с накаченными мужиками и протеином",
    initialPrice: 1300000000000,
    initialIncrease: 8600000000,
    isIncreaseMoney: false,
    images: () => false,
    maxLvl: 100,
    isHidden: true,
    isInvisible: true,
    requirements: 8500000000,
    level: 0,
  },
  {
    id: 12,
    title: "качалка на луне",
    img: "src/assets/Upgrades/upgrade12.jpeg",
    resultImg: "src/assets/Upgrades/upgradeResult12.jpeg",
    resultImgPositionX: 480,
    resultImgPositionY: 500,
    resultImgWidth: 200,
    resultImgHeight: 150,
    desc: "из за гравитации заветную сотку будет пожать куда легче...",
    initialPrice: 16900000000000,
    initialIncrease: 113000000000,
    isIncreaseMoney: false,
    images: () => false,
    maxLvl: 100,
    isHidden: true,
    isInvisible: true,
    requirements: 25000000000,
    level: 0,
  },

  {
    id: 13,
    title: "встреча рас",
    img: "src/assets/Upgrades/upgrade13.jpeg",
    resultImg: "src/assets/Upgrades/upgradeResult13.png",
    resultImgPositionX: 480,
    resultImgPositionY: 280,
    resultImgWidth: 200,
    resultImgHeight: 200,
    desc: "встреча с инопланетянами с дружественных планет, поддерживающих идею культуризма",
    initialPrice: 220000000000000,
    initialIncrease: 1450000000000,
    isIncreaseMoney: false,
    images: () => false,
    maxLvl: 100,
    isHidden: true,
    isInvisible: true,
    requirements: 300000000000,
    level: 0,
  },
  {
    id: 14,
    title: "мкс",
    img: "src/assets/Upgrades/upgrade14.jpg",
    resultImg: "src/assets/Upgrades/upgradeResult14.png",
    resultImgPositionX: 480,
    resultImgPositionY: 0,
    resultImgWidth: 400,
    resultImgHeight: 400,
    desc: "межрассовая космическая станция в виде огромной гантели",
    initialPrice: 3000000000000000,
    initialIncrease: 20000000000000,
    isIncreaseMoney: false,
    images: () => false,
    maxLvl: 100,
    isHidden: true,
    isInvisible: true,
    requirements: 4000000000000,
    level: 0,
  },
  {
    id: 15,
    title: "священная война",
    img: "src/assets/Upgrades/upgrade15.png",
    resultImg: "src/assets/Upgrades/upgradeResult15.png",
    resultImgPositionX: 1050,
    resultImgPositionY: 70,
    resultImgWidth: 380,
    resultImgHeight: 300,
    desc: "межпланетарная война между культуристами и дрищами во имя религии не заставила себя долго ждать",
    initialPrice: 50000000000000000,
    initialIncrease: 340000000000000,
    isIncreaseMoney: false,
    images: () => false,
    maxLvl: 100,
    isHidden: true,
    isInvisible: true,
    requirements: 50000000000000,
    level: 0,
  },
  {
    id: 16,
    title: "пожать черную дыру",
    img: "src/assets/Upgrades/upgrade16.jpg",
    resultImg: "src/assets/Upgrades/upgradeResult16.png",
    resultImgPositionX: 1050,
    resultImgPositionY: 70,
    resultImgWidth: 380,
    resultImgHeight: 300,
    desc: "вы победили в священной войне и стали настолько сильным что решаете поставить свой последний рекорд и уйти на покой",
    initialPrice: 50000000000000000,
    initialIncrease: 0,
    isIncreaseMoney: false,
    images: () => false,
    maxLvl: 1,
    isHidden: true,
    isInvisible: true,
    requirements: 0,
    level: 0,
  },
];

export default UpgradesParams;