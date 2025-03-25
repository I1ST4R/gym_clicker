import React, { useState } from 'react';
import '../../../css/StoryIntro.css';
import { useUIContext } from '../../main/contexts/UIContext';
import { StoryIntroSlides } from '../../../js/StoryIntroSlides'; // Импортируем слайды

const StoryIntro = () => {
  const {
    story: { setStoryIntroShown },
  } = useUIContext();

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < StoryIntroSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleClose = () => {
    setStoryIntroShown(true);
  };

  return (
    <div className="story-overlay">
      <div
        className="story-slide-container"
        style={{ backgroundImage: `url(${StoryIntroSlides[currentSlide].image})` }}
      >
        <div className="story-caption">{StoryIntroSlides[currentSlide].caption}</div>
        {currentSlide > 0 && (
          <button className="story-button prev" onClick={handlePrev}>
            Назад
          </button>
        )}
        {currentSlide < StoryIntroSlides.length - 1 && (
          <button className="story-button next" onClick={handleNext}>
            Вперед
          </button>
        )}
        {currentSlide === StoryIntroSlides.length - 1 && (
          <button className="story-button close" onClick={handleClose}>
            Закрыть
          </button>
        )}
      </div>
    </div>
  );
};

export default StoryIntro;