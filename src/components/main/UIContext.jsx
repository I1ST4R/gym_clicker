import React, { createContext, useState, useContext, useEffect } from 'react';
import { loadState, saveState } from '../../js/storage';

const UIContext = createContext();

export const useUIContext = () => {
  const data = useContext(UIContext)

  if (!data) {
    throw new Error("Can not 'useUIContext' outside of the 'UIProvider'")
  }

  return data
}

export const UIProvider = ({ children }) => {
  //alert:
  const [alertMessage, setAlertMessage] = useState("");
  const [alertOnConfirm, setAlertOnConfirm] = useState(() => () => {});
  const [alertOnCancel, setAlertOnCancel] = useState(() => () => {});
  const [showCustomAlert, setShowCustomAlert] = useState(false);

   //tooltip:
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, right: 0, id: 1 });
  const [isUpgradeHovered, setIsUpgradeHovered] = useState(false);
  const [isDnkHovered, setIsDnkHovered] = useState(false);
  const [isBusterHovered, setIsBusterHovered] = useState(false);
  const [isCounterHovered, setIsCounterHovered] = useState(false);
  const [isSkinHovered, setIsSkinHovered] = useState(false);

  //story:
  const [storyIntroShown, setStoryIntroShown] = useState(() => loadState('storyIntroShown', false, JSON.parse));
  const [storyAutroShown, setStoryAutroShown] = useState(() => loadState('storyAutroShown', false, JSON.parse));

  //trainerImage:
  const [trainerImage, setTrainerImage] = useState(() => loadState('trainerImage', "Trainer/img1.png"));

  //resultImages:
  const [resultImages, setResultImages] = useState(() => loadState('resultImages', [], JSON.parse));

  const showAlert = (message, onConfirm, onCancel) => {
    setAlertMessage(message);
    setAlertOnConfirm(() => onConfirm);
    setAlertOnCancel(() => onCancel);
    setShowCustomAlert(true);
  };

  const resetUI = () => {
    // Сброс состояний, связанных с UI
    setTrainerImage("Trainer/img1.png");
    setResultImages([]);
    setStoryIntroShown(false);
    setStoryAutroShown(false);
    setShowCustomAlert(false);
    setAlertMessage("");
    setAlertOnConfirm(() => () => {});
    setAlertOnCancel(() => () => {});
    setTooltipPosition({ top: 0, right: 0, id: 1 });
    setIsUpgradeHovered(false);
    setIsDnkHovered(false);
    setIsBusterHovered(false);
    setIsCounterHovered(false);
    setIsSkinHovered(false);
  
    // Очистка localStorage
    const keysToRemove = [
      'trainerImage', 'resultImages', 'storyIntroShown', 'storyAutroShown',
      'alertMessage', 'alertOnConfirm', 'alertOnCancel', 'showCustomAlert',
      'tooltipPosition', 'isUpgradeHovered', 'isDnkHovered', 'isBusterHovered',
      'isCounterHovered', 'isSkinHovered',
    ];
  
    keysToRemove.forEach(key => localStorage.removeItem(key));
  };

  // Сохранение состояний в localStorage
  useEffect(() => {
    const stateToSave = {
      alertMessage,
      alertOnConfirm: alertOnConfirm.toString(),
      alertOnCancel: alertOnCancel.toString(),
      showCustomAlert: JSON.stringify(showCustomAlert),
      tooltipPosition: JSON.stringify(tooltipPosition),
      isUpgradeHovered: JSON.stringify(isUpgradeHovered),
      isDnkHovered: JSON.stringify(isDnkHovered),
      isBusterHovered: JSON.stringify(isBusterHovered),
      isCounterHovered: JSON.stringify(isCounterHovered),
      isSkinHovered: JSON.stringify(isSkinHovered),
      storyIntroShown: JSON.stringify(storyIntroShown),
      storyAutroShown: JSON.stringify(storyAutroShown),
      trainerImage,
      resultImages: JSON.stringify(resultImages),
    };

    Object.entries(stateToSave).forEach(([key, value]) => saveState(key, value));
  }, [alertMessage, alertOnConfirm, alertOnCancel, showCustomAlert, tooltipPosition, isUpgradeHovered, isDnkHovered, isBusterHovered, isCounterHovered, isSkinHovered, storyIntroShown, storyAutroShown, trainerImage, resultImages]);

  return (
    <UIContext.Provider
      value={{
        alert: {
          alertMessage, setAlertMessage,
          alertOnConfirm, setAlertOnConfirm,
          alertOnCancel, setAlertOnCancel,
          showCustomAlert, setShowCustomAlert,
          showAlert,
        },
        
        tooltip: {
          tooltipPosition, setTooltipPosition,
          isUpgradeHovered, setIsUpgradeHovered,
          isDnkHovered, setIsDnkHovered,
          isBusterHovered, setIsBusterHovered,
          isCounterHovered, setIsCounterHovered,
          isSkinHovered, setIsSkinHovered,
        },

        story: {
          storyIntroShown, setStoryIntroShown,
          storyAutroShown, setStoryAutroShown,
        },

        trainerImage: {
          trainerImage, setTrainerImage,
        },

        resultImages: {
          resultImages, setResultImages,
        }, 

        resetUI,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};