import React from 'react';

function ImageSection({ image }) {
  if (!image) return null;

  const style = {
    position: 'absolute',
    left: `${image.x}px`, 
    top: `${image.y}px`, 
    width: `${image.width}px`,
    height: `${image.height}px`,
    zIndex: `${image.zIndex}`,
    userSelect: 'none',
    pointerEvents: 'none',
  };

  return <img className="image-section" src={image.src} style={style} alt="Result" />;
}

export default ImageSection;