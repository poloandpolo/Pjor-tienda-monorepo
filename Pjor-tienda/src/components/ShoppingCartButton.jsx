import React from 'react';
import shopping_cart from '/shopping_cart.png';
import './styles/ShoppingCartButton.scss';

export const ShoppingCartButton = ({ onClick, isOpen }) => {
  return (
    <div className={`shopping-cart-button__container ${isOpen ? 'shopping-cart-button__container--hide' : ''}`}>
      <img 
        className='shopping-cart-button__icon'
        src={shopping_cart} 
        alt="shopping-button" 
        onClick={onClick}
      />
    </div>
  );
};
