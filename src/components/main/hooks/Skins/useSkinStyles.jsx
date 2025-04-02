import { useShopContext } from '../../contexts/ShopContext';
import { useState, useEffect } from 'react';

export const useSkinStyles = () => {

  const { 
    skins:{ 
      backgroundLeftImage, 
      backgroundRightImage, 
      cursorImage, 
      backgroundImage
    } } = useShopContext()
  
  useEffect(() => {
    const slideElements = document.querySelectorAll('.slide');
    const imageContainer = document.querySelector('.image-container');
    
    slideElements.forEach(el => {
      el.style.background = backgroundRightImage ? '' : 'none';
    });
    
    imageContainer.style.background = backgroundLeftImage ? '' : 'none';
  }, [backgroundRightImage, backgroundLeftImage]);

  useEffect(() => {
    const cursorStyle = cursorImage ? `url(${cursorImage}), auto` : 'auto';
    document.body.style.cursor = cursorStyle;
    
    if (cursorImage) {
      document.querySelectorAll('*').forEach(el => {
        if (window.getComputedStyle(el).cursor === 'pointer') {
          el.style.cursor = `url(${cursorImage}), pointer`;
        }
      });
    }
  }, [cursorImage]);

  useEffect(() => {
    document.body.style.backgroundImage = backgroundImage 
      ? `url(${backgroundImage})` 
      : 'none';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
  }, [backgroundImage]);
}