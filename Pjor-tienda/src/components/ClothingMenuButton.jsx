import React from 'react';
import './styles/ClothingMenuButton.scss';

export const ClothingMenuButton = ({ isOpen, toggleClothingBar }) => {
  return (
    <div className="clothing-menu-button__container">
      <label 
        className={`clothing-menu-button ${isOpen ? 'clothing-menu-button--hidden' : 'clothing-menu-button--visible'}`}  
        onClick={toggleClothingBar}
      >
        {'📌'.split('\n').map((char, index) => (
          <React.Fragment key={index}>
            {char}
            <br />
          </React.Fragment>
        ))}
      </label>
    </div>
  );
};
