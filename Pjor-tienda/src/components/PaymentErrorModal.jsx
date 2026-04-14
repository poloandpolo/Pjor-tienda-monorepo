import React from 'react';
import verificacion_image from '/verificacion-verde.png';
import './styles/PaymentErrorModal.scss';

export const PaymentErrorModal = ({ isOpen, onClose }) => {
  return (
    <div
      className={`payment-error-modal__overlay ${
        isOpen ? 'payment-error-modal__overlay--open' : ''
      }`}
    >
      <div className="payment-error-modal__content">
        <img
          src={verificacion_image}
          alt="Error de pago"
          className="confirmation-modal__image"
        />
        <p className="payment-error-modal__text">
          El método de pago ya está registrado
        </p>

       
      </div>
    </div>
  );
};