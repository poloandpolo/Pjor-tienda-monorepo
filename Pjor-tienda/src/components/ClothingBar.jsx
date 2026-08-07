import React from 'react';
import './styles/ClothingBar.scss';
import { ClothingDropdownMenu } from './ClothingDropdownMenu';
import { ClothingBarButton } from './ClothingBarButton';

export const ClothingBar = ({
  dropdownMenus,
  isOpen,
  toggleClothingBar,
  onSelectGarmentType
}) => {

  return (
    <div className={`clothing-bar ${isOpen ? 'clothing-bar--show' : ''}`}>

      <button
        className='clothing-bar__close-button'
        onClick={toggleClothingBar}
      >
        X
      </button>


      {dropdownMenus.map((menu) => (

        <ClothingDropdownMenu
          key={menu.categoryId || menu.title}
          title={menu.title}
          emoji={menu.emoji}
        >

          {menu.items.map((item) => (

            <ClothingBarButton

              key={item.id}

              text={item.name}

              onClick={(checked) =>
                onSelectGarmentType(
                  item.id,
                  checked
                )
              }

            />

          ))}

        </ClothingDropdownMenu>

      ))}

    </div>
  );
};