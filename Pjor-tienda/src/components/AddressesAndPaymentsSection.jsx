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
    deleteAddress
} from '../services/addressService';

import {
    useMenPageContext
} from '../context/MenPageContext';

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

    const [activeAddressId, setActiveAddressId] =
        useState(null);

    const [activeSection, setActiveSection] =
        useState('addresses');

    // ✅ NUEVO ESTADO DEL MODAL
    const [showAddressForm, setShowAddressForm] =
        useState(false);

    const {
        fetchAddresses
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

    return (

        <div className='addresses-and-payment-section__container'>

            <div className='addresses-and-payment-section__header-buttons'>

                <div className='addresses-and-payment-section__header-buttons-wrapper'>

                    <button
                        className='addresses-and-payment-section__add_address_button'
                        onClick={() =>
                            setShowAddressForm(true)
                        }
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
                        onClick={handleDeleteAddress}
                    />

                </div>

            </div>

            {/* ✅ ADDRESS FORM */}
            <AddressForm
                modalOpen={showAddressForm}
                closeModal={() =>
                    setShowAddressForm(false)
                }
                onSubmit={() =>
                    setShowAddressForm(false)
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

                        <AccountPaymentSection />

                    )
                }

            </div>

        </div>

    );

};