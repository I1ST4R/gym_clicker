import React, { createContext, useContext } from 'react';
import { useAlert } from '../hooks/UI/useAlert';
import { useTooltip } from '../hooks/UI/useTooltip';
import { useStory } from '../hooks/UI/useStory';
import { useImages } from '../hooks/UI/useImages';
import { useProgress } from '../hooks/Dnk/useProgress';
import { useClient } from '../hooks/Client/useClient';

const UIContext = createContext();

export const useUIContext = () => {
  const data = useContext(UIContext);

  if (!data) {
    throw new Error("Can not 'useUIContext' outside of the 'UIProvider'");
  }

  return data;
};

export const UIProvider = ({ children }) => {
  const alert = useAlert();
  const tooltip = useTooltip();
  const story = useStory();
  const images = useImages();
  const client = useClient()
  const { calculateProgress } = useProgress();

  const resetUI = () => {
    alert.resetAlert();
    tooltip.resetTooltip();
    story.resetStory();
    images.resetImages();
  };

  return (
    <UIContext.Provider
      value={{
        alert,
        tooltip,
        story,
        trainerImage: {
          trainerImage: images.trainerImage,
          setTrainerImage: images.setTrainerImage,
        },
        resultImages: {
          resultImages: images.resultImages,
          setResultImages: images.setResultImages,
          updateResultImages: images.updateResultImages,
        },
        client,
        calculateProgress,
        resetUI,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};