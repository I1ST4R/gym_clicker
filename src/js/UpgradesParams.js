const DefaultUpgradeParams = {
  isHidden: false,
  isInvisible: false,
  level: 0,
};

const UpgradesParams = [
  {
    title: "Подкачаться",
    desc: "Когда ты весишь 150 сложно не платить тебе за персональные тренировки",
    resultImg: false,
    isIncreaseMoney: true,
  },
  {
    title: "реклама",
    desc: "Теперь о тебе будут знать не только бабушки из твоего подъезда",
    resultImgPositionX:200,
    resultImgPositionY: 250,
    resultImgWidth: 150,
    resultImgHeight: 300,
    zIndex: 3,
    isIncreaseMoney: false,
  },
  {
    title: "выступить на России",
    desc: "Помимо двух банок просроченного протеина ты получаешь большее уважение к своей персоне",
    resultImgPositionX: -240,
    resultImgPositionY: 420,
    resultImgWidth: 160,
    resultImgHeight: 160,
    zIndex: 5,
    isIncreaseMoney: true,
  },
  {
    title: "коллаборация",
    desc: "Известные спортивные блогеры наконец-то заметили обычного паренька из деревни с 'заурядной' генетикой",
    resultImgPositionX: -300,
    resultImgPositionY: 280,
    resultImgWidth: 180,
    resultImgHeight: 300,
    zIndex: 3,
    isIncreaseMoney: false,
  },
  {
    title: "подвальная качалка",
    desc: "Отсюда свой путь начинали многие известные бодибилдеры",
    resultImgPositionX: 150,
    resultImgPositionY: 620,
    resultImgWidth: 170,
    resultImgHeight: 300,
    zIndex: 3,
    isIncreaseMoney: false,
  },
  {
    title: "Мистер Олимпия",
    desc: "Вы - легенда",
    resultImgPositionX: 80,
    resultImgPositionY: 450,
    resultImgWidth: 160,
    resultImgHeight: 160,
    zIndex: 4,
    isIncreaseMoney: true,
  },
  {
    title: "Снять фильм",
    desc: "Вы всегда хотели снять новый фильм с арнольдом",
    resultImgPositionX: 80,
    resultImgPositionY: 450,
    resultImgWidth: 160,
    resultImgHeight: 160,
    zIndex: 4,
    isIncreaseMoney: false,
  },
  {
    desc: "Спортивный клуб вашей собственной франшизы (звучит гордо, но пока что это обычный фитнес - зал)",
    title: "клуб франшизы",
    resultImgPositionX: 0,
    resultImgPositionY: 0,
    resultImgWidth: 300,
    resultImgHeight: 200,
    zIndex: 1,
    isIncreaseMoney: false,
  },
  {
    title: "Тренировка с президентом",
    desc: "Кто-то смотрел президента по телевизору, кто-то видел его пару раз в живую, а есть те - кто страховали его на жиме",
    resultImgPositionX: 0,
    resultImgPositionY: 0,
    resultImgWidth: 300,
    resultImgHeight: 200,
    zIndex: 1,
    isIncreaseMoney: true,
  },
  {
    desc: "Теперь вы законодатель моды в комьюнити бодибилдинга",
    title: "личный бренд",
    resultImgPositionX: -350,
    resultImgPositionY: 130,
    resultImgWidth: 300,
    resultImgHeight: 200,
    zIndex: 2,
    isIncreaseMoney: false,
  },
  {
    title: "Элитная качалка",
    desc: "Да, атмосфера в зале уже не та.. Но зато сколько денег!",
    resultImgPositionX: -340,
    resultImgPositionY: 555,
    resultImgWidth: 300,
    resultImgHeight: 200,
    zIndex: 2,
    isIncreaseMoney: false,
  },
  {
    title: "атлеты-мутанты",
    desc: "Несколько лет на эксперименты - и теперь даже не нужно тренироваться чтобы быть как горилла",
    resultImgPositionX: -350,
    resultImgPositionY: 50,
    resultImgWidth: 250,
    resultImgHeight: 140,
    zIndex: 2,
    isIncreaseMoney: true,
  },
  {
    title: "страна качков",
    desc: "Выкупил несколько островов и организовал свою страну - с накаченными мужиками и протеином",
    resultImgPositionX: -300,
    resultImgPositionY: 320,
    resultImgWidth: 200,
    resultImgHeight: 150,
    zIndex: 1,
    isIncreaseMoney: false,
  },
  {
    title: "качалка на луне",
    desc: "из за гравитации заветную сотку будет пожать куда легче...",
    resultImgPositionX: -80,
    resultImgPositionY: 615,
    resultImgWidth: 200,
    resultImgHeight: 150,
    zIndex: 1,
    isIncreaseMoney: false,
  },

  {
    title: "встреча рас",
    desc: "встреча с инопланетянами с дружественных планет, поддерживающих идею культуризма",
    resultImgPositionX: -300,
    resultImgPositionY: 620,
    resultImgWidth: 200,
    resultImgHeight: 200,
    zIndex: 100,
    isIncreaseMoney: false,
  },

  {
    title: "тяга континента",
    desc: "Представьте себе на земле нашелся никому не нужный континет и теперь можно поставить новый рекорд в становой тяге",
    resultImgPositionX: -300,
    resultImgPositionY: 620,
    resultImgWidth: 200,
    resultImgHeight: 200,
    zIndex: 100,
    isIncreaseMoney: true,
  },
  {
    title: "мкс",
    desc: "межрассовая космическая станция в виде огромной гантели",
    resultImgPositionX: -85,
    resultImgPositionY: 30,
    resultImgWidth: 400,
    resultImgHeight: 400,
    zIndex: 2,
    isIncreaseMoney: false,
  },
  {
    title: "священная война",
    desc: "межпланетарная война между культуристами и дрищами во имя религии не заставила себя долго ждать",
    resultImgPositionX: -80,
    resultImgPositionY: 300,
    resultImgWidth: 380,
    resultImgHeight: 300,
    zIndex: 1,
    isIncreaseMoney: false,
  },
  {
    title: "пожать черную дыру",
    desc: "вы победили в священной войне и стали настолько сильным что решаете поставить свой последний рекорд и уйти на покой",
    resultImgPositionX: 0,
    resultImgPositionY: 0,
    resultImgWidth: 380,
    resultImgHeight: 300,
    isIncreaseMoney: false,
  },
  
].map((upgrade, index) => {
  const id = index + 1; 
  const img = `Upgrades/upgrade${id}.png`; 
  const resultImg = upgrade.resultImg ? `Upgrades/upgradeResult${id}.png` : false; 
  const initialPrice = 150 * Math.pow(11, index);
  const initialIncrease = Math.floor(initialPrice / 150)

  return {
    id,
    img,
    resultImg,
    initialPrice,
    initialIncrease,
    ...DefaultUpgradeParams, 
    ...upgrade, 
  };
});

export default UpgradesParams;