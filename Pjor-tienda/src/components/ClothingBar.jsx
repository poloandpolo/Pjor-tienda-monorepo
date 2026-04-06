import React from 'react';
import './styles/ClothingBar.scss';
import { ClothingDropdownMenu } from './ClothingDropdownMenu';
import { ClothingBarButton } from './ClothingBarButton';

export const ClothingBar = ({ dropdownMenus, isOpen, toggleClothingBar }) => {
  return (
    <div className={`clothing-bar ${isOpen ? 'clothing-bar--show' : ''}`}>
      <button className='clothing-bar__close-button' onClick={toggleClothingBar}>X</button>

      {dropdownMenus.length > 0 && dropdownMenus.map((menu, index) => (
        <ClothingDropdownMenu key={index} title={menu.title} emoji={menu.emoji}>
          {menu.items.map((item, itemIndex) => (
            <ClothingBarButton key={itemIndex} text={item} />
          ))}
        </ClothingDropdownMenu>
      ))}
    </div>
  );
};
