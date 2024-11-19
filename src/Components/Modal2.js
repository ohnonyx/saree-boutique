// Modal2.js
import React from 'react';
import './Modal2.css';

const Modal2 = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p className='Messages'>{message}</p>
        <div className="modal-buttons">
          <button onClick={onConfirm} className="modal-confirm-btn">Yes</button>
          <button onClick={onCancel} className="modal-cancel-btn">No</button>
        </div>
      </div>
    </div>
  );
};

export default Modal2;