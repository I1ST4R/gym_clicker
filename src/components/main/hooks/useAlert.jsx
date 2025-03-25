import { useState, useEffect } from 'react';
import { loadState, saveState } from '../../../js/storage';

export const useAlert = () => {
  const [alertMessage, setAlertMessage] = useState('');
  const [alertOnConfirm, setAlertOnConfirm] = useState(() => () => {});
  const [alertOnCancel, setAlertOnCancel] = useState(() => () => {});
  const [showCustomAlert, setShowCustomAlert] = useState(false);

  const showAlert = (message, onConfirm, onCancel) => {
    setAlertMessage(message);
    setAlertOnConfirm(() => onConfirm);
    setAlertOnCancel(() => onCancel);
    setShowCustomAlert(true);
  };

  const resetAlert = () => {
    setShowCustomAlert(false);
    setAlertMessage("");
    setAlertOnConfirm(() => () => {});
    setAlertOnCancel(() => () => {});
  };

  // Сохранение состояния
  useEffect(() => {
    saveState('alertMessage', alertMessage);
    saveState('alertOnConfirm', alertOnConfirm.toString());
    saveState('alertOnCancel', alertOnCancel.toString());
    saveState('showCustomAlert', JSON.stringify(showCustomAlert));
  }, [alertMessage, alertOnConfirm, alertOnCancel, showCustomAlert]);

  return {
    alertMessage,
    setAlertMessage,
    alertOnConfirm,
    setAlertOnConfirm,
    alertOnCancel,
    setAlertOnCancel,
    showCustomAlert,
    setShowCustomAlert,
    showAlert,
    resetAlert,
  };
};