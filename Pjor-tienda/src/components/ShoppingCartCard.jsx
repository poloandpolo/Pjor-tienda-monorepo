import React from 'react';
import { useMenPageContext } from '../context/MenPageContext'; // Ajusta la ruta si es necesario
import './styles/ShoppingCartCard.scss';

export const ShoppingCartCard = ({ item }) => {
    const { updateItemQuantity } = useMenPageContext();

    const handleIncrement = () => {
        updateItemQuantity(item.id, item.size, item.color, 1);
    };

    const handleDecrement = () => {
        updateItemQuantity(item.id, item.size, item.color, -1);
    };

    // Calcular el total directamente
    const totalPrice = Number(item.price) * Number(item.quantity);

    return (
        <div className="shopping-cart-card">
            <div className="shopping-cart-card__image-wrapper">
                <img src={item.images[0]} alt={item.text} />
            </div>
            <div className="shopping-cart-card__text-container">
                <span>{item.text}</span>
                <div className="shopping-cart-card__details-container">
                    <div className="shopping-cart-card__color-size-container">
                        <div className="shopping-cart-card__color-container">
                            <label>Color: </label>
                            {item.color && (
                                <img src={item.color} alt="Selected color" className="shopping-cart-card__color-thumbnail" />
                            )}
                        </div>
                        <div className="shopping-cart-card__size-container">
                            <label>Talla: </label>
                            <span>{item.size ? item.size : 'Not Selected'}</span>
                        </div>
                    </div>
                    <div className="shopping-cart-card__counter-container">
                        <label>Cantidad</label> <br />
                        <button onClick={handleDecrement}>-</button>
                        <label>{item.quantity}</label>
                        <button onClick={handleIncrement}>+</button>
                    </div>
                    <div className="shopping-cart-card__price-container">
                        <label>Total: ${totalPrice.toFixed(2)}</label>
                    </div>
                </div>
            </div>
        </div>
    );
};
