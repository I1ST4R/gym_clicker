import React, { useEffect } from 'react';
import { useUIContext } from '../../main/contexts/UIContext';
import { useShopContext } from '../../main/contexts/ShopContext';
import ImageSection from './ImageSection';
import '../../../css/ImageSections.css';

function ImageSections() {
  const {
    resultImages: {resultImages, updateResultImages}  
  } = useUIContext();
  const { 
    upgrades: {upgrades }  
  } = useShopContext();

  useEffect(() => {
    updateResultImages(upgrades);
  }, [upgrades, updateResultImages]);

  const groupedImages = {};
  resultImages.forEach((image) => {
    if (!groupedImages[image.upgradeId]) {
      groupedImages[image.upgradeId] = [];
    }
    groupedImages[image.upgradeId].push(image);
  });

  return (
    <div className="image-container">
      {Object.keys(groupedImages).map((upgradeId) => (
        <div key={upgradeId} className="image-section">
          {groupedImages[upgradeId].map((image, index) => (
            <ImageSection key={`${upgradeId}-${index}`} image={image} />
          ))}
        </div>
      ))}
      <div className="image-container__spase"></div>
    </div>
  );
}

export default ImageSections;