import React from 'react';
import verificacion_image from '/verificacion-verde.png';
import './styles/PaymentErrorModal.scss';

export const PaymentErrorModal = () => {
  return (
    <div>
        <div className={'payment-error-modal__overlay'}>
            <div className="payment-error-modal__content">
                <img src={verificacion_image} alt="Verificación exitosa" className="confirmation-modal__image" />
                <p className="payment-error-modal__text">El metodo de pago ya esta registrado</p>
            </div>
        </div>

    </div>
  )
}

