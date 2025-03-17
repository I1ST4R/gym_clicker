import React, {useContext } from 'react';
import './css/CustomAlert.css';
import { AppContext } from './main/AppContext.jsx';

function CustomAlert({ message, onConfirm, onCancel }) {
  const {
    showCustomAlert,
  } = useContext(AppContext);
  if (!showCustomAlert) return
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