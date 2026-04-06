import React from 'react';
import './styles/SizeModal.scss';

export const SizeModal = ({ isOpen, onClose, sizes = [], onSelectSize }) => {
  const handleSizeSelect = (size) => {
    onSelectSize(size);
    onClose();
  };

  return (
    <div className={`modal-size ${isOpen ? 'modal-size--show' : ''}`} onClick={onClose}>
      <div className="modal-size__content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-size__close-wrapper">
          <button className="modal-size__close-button" onClick={onClose}>X</button>
        </div>
        <div className="modal-size__sizes-wrapper">
          {sizes.length > 0 ? (
            sizes.map((size, index) => (
              <label key={index} className="modal-size__size-option" onClick={() => handleSizeSelect(size)}>
                {size}
              </label>
            ))
          ) : (
            <p className="modal-size__no-sizes">No sizes available</p>
          )}
        </div>
      </div>
    </div>
  );
};
