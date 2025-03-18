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
    zIndex: 3,
    isIncreaseMoney: false,
  },
  {
    title: "выступить на России",
    desc: "Помимо двух банок просроченного протеина ты получаешь большее уважение к своей персоне",
    zIndex: 5,
    isIncreaseMoney: true,
  },
  {
    title: "коллаборация",
    desc: "Известные спортивные блогеры наконец-то заметили обычного паренька из деревни с 'заурядной' генетикой",
    zIndex: 3,
    isIncreaseMoney: false,
  },
  {
    title: "подвальная качалка",
    desc: "Отсюда свой путь начинали многие известные бодибилдеры",
    zIndex: 3,
    isIncreaseMoney: false,
  },
  {
    title: "Мистер Олимпия",
    desc: "Вы - легенда",
    zIndex: 4,
    isIncreaseMoney: true,
  },
  {
    title: "Снять фильм",
    desc: "Вы всегда хотели снять новый фильм с арнольдом",
    zIndex: 4,
    isIncreaseMoney: false,
  },
  {
    desc: "Спортивный клуб вашей собственной франшизы (звучит гордо, но пока что это обычный фитнес - зал)",
    title: "клуб франшизы",
    zIndex: 1,
    isIncreaseMoney: false,
  },
  {
    title: "Тренировка с президентом",
    desc: "Кто-то смотрел президента по телевизору, кто-то видел его пару раз в живую, а есть те - кто страховали его на жиме",
    zIndex: 1,
    isIncreaseMoney: true,
  },
  {
    desc: "Теперь вы законодатель моды в комьюнити бодибилдинга",
    title: "личный бренд",
    zIndex: 2,
    isIncreaseMoney: false,
  },
  {
    title: "Элитная качалка",
    desc: "Да, атмосфера в зале уже не та.. Но зато сколько денег!",
    zIndex: 2,
    isIncreaseMoney: false,
  },
  {
    title: "атлеты-мутанты",
    desc: "Несколько лет на эксперименты - и теперь даже не нужно тренироваться чтобы быть как горилла",
    zIndex: 2,
    isIncreaseMoney: true,
  },
  {
    title: "страна качков",
    desc: "Выкупил несколько островов и организовал свою страну - с накаченными мужиками и протеином",
    zIndex: 1,
    isIncreaseMoney: false,
  },
  {
    title: "качалка на луне",
    desc: "из за гравитации заветную сотку будет пожать куда легче...",
    zIndex: 1,
    isIncreaseMoney: false,
  },

  {
    title: "встреча рас",
    desc: "встреча с инопланетянами с дружественных планет, поддерживающих идею культуризма",
    zIndex: 100,
    isIncreaseMoney: false,
  },

  {
    title: "тяга континента",
    desc: "Представьте себе на земле нашелся никому не нужный континет и теперь можно поставить новый рекорд в становой тяге",
    zIndex: 100,
    isIncreaseMoney: true,
  },
  {
    title: "мкс",
    desc: "межрассовая космическая станция в виде огромной гантели",
    zIndex: 2,
    isIncreaseMoney: false,
  },
  {
    title: "священная война",
    desc: "межпланетарная война между культуристами и дрищами во имя религии не заставила себя долго ждать",
    zIndex: 1,
    isIncreaseMoney: false,
  },
  {
    title: "пожать черную дыру",
    desc: "вы победили в священной войне и стали настолько сильным что решаете поставить свой последний рекорд и уйти на покой",
    isIncreaseMoney: false,
  },
  
].map((upgrade, index) => {
  const id = index + 1; 
  const img = `Upgrades/upgrade${id}.png`; 
  const resultImg = upgrade.id != 1 ? `Upgrades/upgradeResult${id}.png` : false; 

  let initialPrice, initialIncrease
  if(index + 1 < 7){
    initialPrice = 150 * Math.pow(11, index)
    initialIncrease = initialPrice / 150
  }
  else{
    initialPrice = BigInt(Math.floor(150 * Math.pow(11, index)))
    initialIncrease = BigInt(initialPrice / 150n)
  }

  if(id === 19){
    initialPrice = 0
  }

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