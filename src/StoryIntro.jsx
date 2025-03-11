import React, { useState, useContext  } from 'react';
import './css/StoryIntro.css';
import { AppContext } from './main/AppContext.jsx';

const StoryIntro = ({ onClose }) => {

  const {
    setStoryIntroShown,
  } = useContext(AppContext);

  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { 
      image: 'StoryIntro/img1.png', 
      caption: 'Вы - директор крупной компании, которая занимается проиводством спортивного питания, а также имеет собственные спортивные залы по всему миру. Вы счастливы.' 
    },
    { 
      image: 'StoryIntro/img2.jpg', 
      caption: 'Неожиданно в офис вашей компании пробираются бандиты.На самом деле, они не смогли накачаться также как вы и по этому завидуют вам и хотят отнять вашу жизнь и ваш бизнес. Они угрожают вам.' 
    },
    { 
      image: 'StoryIntro/img3.png', 
      caption: 'Вам приходится выпрыгнуть из окна собственного офиса.Несмотря на то, что офис находится на 50-ом этаже лететь до земли все равно не долго, но для вас время растянулось на часы.' 
    },
    { 
      image: 'StoryIntro/img4.png', 
      caption: 'Вы падаете на землю. Вас окружают люди, кто-то из них просто смотрит, кто-то вызывает скорую, хотя какой смысл? - падение с 50-го этажа никто не переживет.' 
    },
    { 
      image: 'StoryIntro/img5.jpg', 
      caption: 'Вы просыпаетесь в больнице весь перевязанный бинтами.Смотрите на свое тело и ужасаетесь - на нем совсем нет тех мышц.Врач говорит вам что то, что вы выжили - чудо. Ваши мышци каким-то образом смогли амортизировать этот чудовищный удар, и вы остались в живых.' 
    },
    { image: 'StoryIntro/img6.png', 
      caption: 'Пока вы лежали в больнице вы потратили все ваши оставшиесмя деньги на дорогостоящее лечение и реабилитацию. У вас нет денег даже чтобы купить стаканчик кофе, не говоря уже о суде с новыми "владельцами" вашего бизнеса. Вам нужно начать все с начала. Вперед.' 
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleClose = () => {
    setStoryIntroShown(true)
  };

  return (
    <div className="story-overlay">
      <div
        className="story-slide-container"
        style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
      >
        <div className="story-caption">{slides[currentSlide].caption}</div>
        {currentSlide > 0 && (
          <button className="story-button prev" onClick={handlePrev}>
            Назад
          </button>
        )}
        {currentSlide < slides.length - 1 && (
          <button className="story-button next" onClick={handleNext}>
            Вперед
          </button>
        )}
        {currentSlide === slides.length - 1 && (
          <button className="story-button close" onClick={handleClose}>
            Закрыть
          </button>
        )}
      </div>
    </div>
  );
};

export default StoryIntro;