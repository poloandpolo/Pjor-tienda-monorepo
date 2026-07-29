import React, { useState } from 'react';

import './styles/AddressesAndPaymentsSection.scss';

import {
    AccountAddressesSection
} from './AccountAddressesSection';

import {
    AccountPaymentSection
} from './AccountPaymentSection';

import {
    AddressForm
} from './AddressForm';

import {
    PaymentModal
} from './PaymentModal';

import {
    deleteAddress
} from '../services/addressService';

import {
    useMenPageContext
} from '../context/MenPageContext';

import {
    deletePaymentMethod
} from '../services/paymentService';

import thrash_can from '/thrash_can.png';

export const AddressesAndPaymentsSection = ({
    handleBackToMenuClick,

    editingFields,

    handleFieldChange,

    handleEditClick,

    handleSaveClick,

    handleCancelClick,

    tempValues
}) => {

    const [activePaymentMethodId, setActivePaymentMethodId] =
        useState(null);

    const [activeAddressId, setActiveAddressId] =
        useState(null);

    const [activeSection, setActiveSection] =
        useState('addresses');

    const [showAddressForm, setShowAddressForm] =
        useState(false);

    const [showPaymentModal, setShowPaymentModal] =
        useState(false);


    const {
        fetchAddresses,
        fetchPaymentMethods
    } = useMenPageContext();


    const handleDeleteAddress = async () => {

        try {

            if (!activeAddressId) return;

            const confirmed = window.confirm(
                '¿Eliminar esta dirección?'
            );

            if (!confirmed) return;

            await deleteAddress(
                activeAddressId
            );

            await fetchAddresses();

        } catch (error) {

            console.error(error);

        }

    };


    const handleDeletePayment = async () => {

        try {

            if (!activePaymentMethodId) return;

            const confirmed = window.confirm(
                '¿Eliminar este método de pago?'
            );

            if (!confirmed) return;

            await deletePaymentMethod(
                activePaymentMethodId
            );

            await fetchPaymentMethods();

            setActivePaymentMethodId(null);

        } catch (error) {

            console.error(error);

        }

    };


    return (

        <div className='addresses-and-payment-section__container'>

            <div className='addresses-and-payment-section__header-buttons'>

                <div className='addresses-and-payment-section__header-buttons-wrapper'>


                    <button
                        className='addresses-and-payment-section__add_address_button'
                        onClick={() => {

                            if (
                                activeSection === 'addresses'
                            ) {

                                setShowAddressForm(true);

                            } else {

                                setShowPaymentModal(true);

                            }

                        }}
                    >
                        +
                    </button>


                    <button
                        onClick={() =>
                            setActiveSection('addresses')
                        }
                    >
                        Direcciones
                    </button>


                    <button
                        onClick={() =>
                            setActiveSection('payments')
                        }
                    >
                        Pagos
                    </button>


                    <img
                        src={thrash_can}
                        onClick={() => {

                            if (
                                activeSection === 'addresses'
                            ) {

                                handleDeleteAddress();

                            } else {

                                handleDeletePayment();

                            }

                        }}
                    />


                </div>

            </div>


            <AddressForm
                modalOpen={showAddressForm}
                closeModal={() =>
                    setShowAddressForm(false)
                }
                onSubmit={() =>
                    setShowAddressForm(false)
                }
            />


            <PaymentModal
                paymentModalOpen={showPaymentModal}
                closePaymentModal={() =>
                    setShowPaymentModal(false)
                }
                onPaymentError={() =>
                    setShowPaymentModal(false)
                }
            />


            <div className='addresses-and-payment-section__content'>


                {
                    activeSection === 'addresses' && (

                        <AccountAddressesSection

                            handleBackToMenuClick={
                                handleBackToMenuClick
                            }

                            editingFields={
                                editingFields
                            }

                            handleFieldChange={
                                handleFieldChange
                            }

                            handleEditClick={
                                handleEditClick
                            }

                            handleSaveClick={
                                handleSaveClick
                            }

                            handleCancelClick={
                                handleCancelClick
                            }

                            tempValues={
                                tempValues
                            }

                            setActiveAddressId={
                                setActiveAddressId
                            }

                        />

                    )
                }


                {
                    activeSection === 'payments' && (

                        <AccountPaymentSection

                            handleBackToMenuClick={
                                handleBackToMenuClick
                            }

                            setActivePaymentMethodId={
                                setActivePaymentMethodId
                            }

                        />

                    )
                }


            </div>

        </div>

    );

};