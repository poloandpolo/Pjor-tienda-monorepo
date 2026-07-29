import React from 'react';
import { PaymentsList } from './PaymentsList';

export const AccountPaymentSection = ({
    handleBackToMenuClick,
    setActivePaymentMethodId
}) => {

    return (

        <div className='account-payment-section'>

            <PaymentsList
                setActivePaymentMethodId={
                    setActivePaymentMethodId
                }
            />

            <button
                className='account-payment-section__back-button'
                onClick={handleBackToMenuClick}
            >
                Volver
            </button>

        </div>

    );

};