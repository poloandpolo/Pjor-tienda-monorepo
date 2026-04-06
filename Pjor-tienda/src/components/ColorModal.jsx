import React from 'react';
import './styles/ColorModal.scss';

export const ColorModal = ({ isOpen, onClose, colors = [], onSelectColor }) => {
  const handleColorSelect = (color) => {
    onSelectColor(color);
    onClose();
  };

  return (
    <div className={`color-modal ${isOpen ? 'color-modal--show' : ''}`} onClick={onClose}>
      <div className="color-modal__content" onClick={(e) => e.stopPropagation()}>
        <div className="color-modal__close-wrapper">
          <button className="color-modal__close-button" onClick={onClose}>X</button>
        </div>
        <div className="color-modal__colors-wrapper">
          {colors.length > 0 ? (
            colors.map((color, index) => (
              <label key={index} onClick={() => handleColorSelect(color)} className="color-modal__color-option">
                <img src={color} alt={`color-${index}`} className="color-modal__color-thumbnail" />
              </label>
            ))
          ) : (
            <p>No colors available</p>
          )}
        </div>
      </div>
    </div>
  );
};
