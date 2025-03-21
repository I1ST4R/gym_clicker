import React from 'react';
import '../../css/CustomAlert.css';
import { useUIContext } from '../main/UIContext'; // Кастомный хук для UIContext

function CustomAlert({ message, onConfirm, onCancel }) {
  const {
    alert: { showCustomAlert },
  } = useUIContext();

  if (!showCustomAlert) return null;

  return (
    <div className="custom-alert-overlay">
      <div className="custom-alert">
        <p>{message}</p>
        <div className="custom-alert-buttons">
          <button onClick={onConfirm}>Да</button>
          <button onClick={onCancel}>Нет</button>
        </div>
      </div>
    </div>
  );
}

export default CustomAlert;