import React from 'react';
import './styles/AddressesAndPaymentsSection.scss';
import { AccountAddressesSection } from './AccountAddressesSection';
import thrash_can from '/thrash_can.png'

export const AddressesAndPaymentsSection = ({
    handleBackToMenuClick,

    editingFields,

    handleFieldChange,

    handleEditClick,

    handleSaveClick,

    handleCancelClick,

    tempValues
}) => {

    return (

        <div className='addresses-and-payment-section__container'>

            <div className='addresses-and-payment-section__header-buttons'>

                <div className='addresses-and-payment-section__header-buttons-wrapper'>

                    <button>
                        Direcciones
                    </button>

                    <button>
                        Pagos
                    </button>

                    <img src={thrash_can}/>

                </div>

            </div>

            <div className='addresses-and-payment-section__content'>

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

                />

            </div>

        </div>

    );

};