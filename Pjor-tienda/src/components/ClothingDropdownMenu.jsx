import React, { useState } from 'react';
import './styles/ClothingDropdownMenu.scss';

export const ClothingDropdownMenu = ({ title, children, emoji }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="clothing-dropdown-menu">
      <button className="clothing-dropdown-menu__button" onClick={toggleDropdown}>
        <label className="clothing-dropdown-menu__emoji">{emoji}</label> 
        <span className="clothing-dropdown-menu__title">{title}</span>
      </button>
      <div className={`clothing-dropdown-menu__content ${isOpen ? 'clothing-dropdown-menu__content--show' : ''}`}>
        {children}
      </div>
    </div>
  );
};
