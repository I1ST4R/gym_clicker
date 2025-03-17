import React, {useEffect, useContext } from 'react';
import { AppContext } from './main/AppContext.jsx';

const ResultImages = ({ resultImages, windowWidth }) => {
  const {
    pasIncreaseMoney,
    actIncreaseMoney,
    upgrades,
    setResultImages,
  } = useContext(AppContext);

  useEffect(() => {
      upgrades.forEach((u) => {
        if (u.level === 1 && u.resultImg) {
          setResultImages((prevImages) => [
            ...prevImages,
            {
              zIndex: u.zIndex,
              src: u.resultImg,
              x: u.resultImgPositionX,
              y: u.resultImgPositionY,
              width: u.resultImgWidth,
              height: u.resultImgHeight,
            },
          ]);
        }
      });
    }, [pasIncreaseMoney, actIncreaseMoney, upgrades, setResultImages]);

  return (
    <>
      {resultImages.map((image, index) => (
        <img
          key={index}
          src={image.src}
          style={{
            position: 'absolute',
            left: `${(windowWidth - 480) / 2 + image.x}px`,
            top: `${image.y}px`,
            width: `${image.width}px`,
            height: `${image.height}px`,
            zIndex: `${image.zIndex}`,
            userSelect: `none`,
            pointerEvents: `none`,
          }}
          alt="Result"
        />
      ))}
    </>
  );
};

export default ResultImages;