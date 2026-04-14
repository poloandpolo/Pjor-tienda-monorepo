import React from 'react';
import './styles/PaymentItem.scss';

// Componente para representar un método de pago individual
export const PaymentItem = ({ payment, isSelected, onSelect }) => {
  return (
    <li className='payment-item__content'>
      <label>
        <input
          type='radio'
          name='payment'
          value={payment.id}
          checked={isSelected}
          onChange={() => onSelect(payment)}
        />
        <span>
          {payment.card_holder} <br />
          **** **** **** {payment.last4} <br />
          Exp: {payment.exp_month}/{payment.exp_year}
        </span>
      </label>
    </li>
  );
};