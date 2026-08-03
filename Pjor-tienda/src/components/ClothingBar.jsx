import React from 'react';
import './styles/ClothingBar.scss';
import { ClothingDropdownMenu } from './ClothingDropdownMenu';
import { ClothingBarButton } from './ClothingBarButton';

export const ClothingBar = ({ dropdownMenus, isOpen, toggleClothingBar }) => {

  console.log('DROPDOWN MENUS:', dropdownMenus);

  return (
    <div className={`clothing-bar ${isOpen ? 'clothing-bar--show' : ''}`}>
      <button 
        className='clothing-bar__close-button' 
        onClick={toggleClothingBar}
      >
        X
      </button>

      {dropdownMenus.map((menu) => {

        console.log('MENU:', menu);

        return (
          <ClothingDropdownMenu
            key={menu.categoryId || menu.title}
            title={menu.title}
            emoji={menu.emoji}
          >
            {menu.items.map((item, index) => {

              console.log('ITEM MENU:', item);

              return (
                <ClothingBarButton
                  key={item.id || index}
                  text={item.name || item}
                />
              );

            })}
          </ClothingDropdownMenu>
        );

      })}
    </div>
  );
};