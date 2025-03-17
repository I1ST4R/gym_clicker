import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import Upgrades from './Upgrades.jsx';
import Busters from './Busters.jsx';
import './css/SliderStyles.css';

const SliderContainer = () => {
  const swiperRef = useRef(null);

  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <div className="slider-container">
      <button className="button-prev" onClick={goPrev}>
        <svg width="30" height="21" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 7C21.5523 7 22 7.44772 22 8C22 8.55228 21.5523 9 21 9V7ZM0.292892 8.70711C-0.0976315 8.31658 -0.0976315 7.68342 0.292892 7.29289L6.65685 0.928932C7.04738 0.538408 7.68054 0.538408 8.07107 0.928932C8.46159 1.31946 8.46159 1.95262 8.07107 2.34315L2.41421 8L8.07107 13.6569C8.46159 14.0474 8.46159 14.6805 8.07107 15.0711C7.68054 15.4616 7.04738 15.4616 6.65685 15.0711L0.292892 8.70711ZM21 9H1V7H21V9Z" fill="black"></path>
        </svg>
      </button>
      <button className="button-next" onClick={goNext}>
        <svg width="30" height="21" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 7C0.447715 7 0 7.44772 0 8C0 8.55228 0.447715 9 1 9V7ZM21.7071 8.70711C22.0976 8.31658 22.0976 7.68342 21.7071 7.29289L15.3431 0.928932C14.9526 0.538408 14.3195 0.538408 13.9289 0.928932C13.5384 1.31946 13.5384 1.95262 13.9289 2.34315L19.5858 8L13.9289 13.6569C13.5384 14.0474 13.5384 14.6805 13.9289 15.0711C14.3195 15.4616 14.9526 15.4616 15.3431 15.0711L21.7071 8.70711ZM1 9H21V7H1V9Z" fill="black"></path>
        </svg>
      </button>
      <Swiper
        ref={swiperRef}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        navigation={{
          prevEl: '.button-prev',
          nextEl: '.button-next',
        }}
      >
        <SwiperSlide><Upgrades /></SwiperSlide>
        <SwiperSlide><Busters /></SwiperSlide>
        <SwiperSlide>Скоро тут что-то будет</SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SliderContainer;