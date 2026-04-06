import React from 'react';
import './styles/ShoppingCart.scss';
import { ShoppingCartCard } from './ShoppingCartCard';
import { useMenPageContext } from '../context/MenPageContext';
import { CheckoutButton } from './CheckoutButton';

export const ShoppingCart = ({ isOpen, onClose, onClickPayment }) => {
    const { cartItems } = useMenPageContext();

    const cartCards = cartItems.map((item) => (
        <ShoppingCartCard key={item.id} item={item} /> // Usar item.id como clave
    ));

    return (
        <div className={`shopping-cart__overlay ${isOpen ? 'shopping-cart__overlay--show' : ''}`} onClick={onClose}>
            <div className="shopping-cart__content" onClick={(e) => e.stopPropagation()}>
                <div className='shopping-cart__close-wrapper'>
                    <button className='shopping-cart__close-button' onClick={onClose}>X</button>
                </div>
                <h2 className='shopping-cart__title'>Carrito de Compras</h2>
                <div className='shopping-cart__checkout-button-wrapper'>
                    <CheckoutButton onClickPayment={onClickPayment}/>
                </div>
                <div className="shopping-cart__items">
                    {cartCards}
                </div>
            </div>
        </div>
    );
};
