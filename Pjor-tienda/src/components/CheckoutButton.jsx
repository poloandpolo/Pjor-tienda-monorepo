import React from 'react';
import './styles/CheckoutButton.scss';
import { useMenPageContext } from '../context/MenPageContext';

export const CheckoutButton = ({ onClickPayment }) => {
  const { cartItems } = useMenPageContext();

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className="checkout-button__container" onClick={onClickPayment}>
      <label>Proceder al pago ${totalPrice.toFixed(2)}</label>
    </div>
  );
};
