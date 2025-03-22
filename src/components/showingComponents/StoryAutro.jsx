import React, { useState } from 'react';
import '../../css/StoryIntro.css';
import { useUIContext } from '../main/UIContext';
import { StoryAutroSlides } from '../../js/StoryAutroSlides'; 

const StoryAutro = () => {
  const {
    story: { setStoryAutroShown },
  } = useUIContext();

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < StoryAutroSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleClose = () => {
    setStoryAutroShown(true);
  };

  return (
    <div className="story-overlay">
      <div
        className="story-slide-container"
        style={{ backgroundImage: `url(${StoryAutroSlides[currentSlide].image})` }}
      >
        <div className="story-caption">{StoryAutroSlides[currentSlide].caption}</div>
        {currentSlide > 0 && (
          <button className="story-button prev" onClick={handlePrev}>
            Назад
          </button>
        )}
        {currentSlide < StoryAutroSlides.length - 1 && (
          <button className="story-button next" onClick={handleNext}>
            Вперед
          </button>
        )}
        {currentSlide === StoryAutroSlides.length - 1 && (
          <button className="story-button close" onClick={handleClose}>
            Закрыть
          </button>
        )}
      </div>
    </div>
  );
};

export default StoryAutro;