import React, { useState, useContext } from 'react';
import './css/StoryIntro.css';
import { AppContext } from './main/AppContext.jsx';

const StoryAutro = (onClose) => {

  const {setStoryAutroShown} = useContext(AppContext);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { 
      image: 'StoryAutro/img1.png', 
      caption: 'Вы победили в священной войне. Теперь вы решаете поставить свой последний рекорд и уйти на покой. В качестве снаряда была выбрана черная дыра - обычной штангой и гантелями вашу силу уже давно не измеришь. Вы стоите перед черной дырой и готовитесь к подходу.' 
    },
    { 
      image: 'StoryAutro/img2.jpg', 
      caption: 'Невероятно! Вы смогли это сделать. Вы пожали черную дыру. Теперь вы сильнее не только всех существ в галактике но и вообще всего сущего, живого и неживого.' 
    },
    { 
      image: 'StoryAutro/img3.png', 
      caption: 'Вдуг вокруг вас начинают появляться разрывы в пространстве времени. Вы пытаетесь от них отдалиться, но своими движениями только увеличиваете их количество. Похоже, вы стали настолько сильным, что своими движениями способны создавать разрывы в ткани самой вселенной.' 
    },
    { 
      image: 'StoryAutro/img4.png', 
      caption: 'Вас засасывает в один из qw..--^&*@dШСА;#)!&(!DUIN--!' 
    },
    { 
      image: 'StoryAutro/img5.png', 
      caption: '...' 
    },
    { image: 'StoryAutro/img6.png', 
      caption: 'Хм... Я где-то это уже видел...' 
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
    setStoryAutroShown(true)
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

export default StoryAutro;