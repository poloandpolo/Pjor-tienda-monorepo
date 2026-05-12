import React, { useRef } from 'react';
import { updateAddress } from '../services/addressService';

export const AccountAddressItem = ({
    addressData,
    editingFields,
    handleFieldChange,
    handleEditClick,
    handleSaveClick,
    handleCancelClick,
    tempValues,
    fetchAddresses,
    handleFocus
}) => {

    const inputRefs = {
        firstName: useRef(null),
        lastName: useRef(null),
        address: useRef(null),
        city: useRef(null),
        state: useRef(null),
        postalCode: useRef(null),
    };

    const renderField = (key, label, dbKey) => {

        const isEditing = editingFields[key];

        return (
            <div className='account-addresses-section__label'>

                <label>{label}:</label>

                <input
                    type='text'
                    placeholder={addressData[dbKey] ?? ''}

                    disabled={!isEditing}
                    ref={inputRefs[key]}

                    // 🔴 FIX IMPORTANTE: input siempre sincronizado con data real o temp
                    value={
                        isEditing
                            ? (tempValues?.[key] ?? '')
                            : (addressData[dbKey] ?? '')
                    }

                    onChange={(e) =>
                        handleFieldChange(key, e.target.value)
                    }
                />

                {isEditing ? (

                    <div className='account-addresses-section__label-button-wrapper'>

                        <button
                            onClick={async () => {

                                try {

                                    const newValue = tempValues?.[key];

                                    await updateAddress(addressData.id, {
                                        [dbKey]: newValue
                                    });

                                    handleSaveClick(key);

                                    // 🔴 FIX: actualización inmediata local (evita depender del fetch)
                                    addressData[dbKey] = newValue;

                                    fetchAddresses();

                                } catch (err) {
                                    console.error(err);
                                }

                            }}
                        >
                            Guardar cambios
                        </button>

                        <button
                            onClick={() => handleCancelClick(key)}
                        >
                            Cancelar
                        </button>

                    </div>

                ) : (

                    <button
                        onClick={() => {

                            handleEditClick(key);
                            handleFocus?.(key);

                        }}
                    >
                        Editar
                    </button>

                )}

            </div>
        );
    };

    return (
        <div className='account-addresses-section__container'>

            {renderField('firstName', 'Nombre', 'first_name')}
            {renderField('lastName', 'Apellido', 'last_name')}
            {renderField('address', 'Dirección', 'address')}
            {renderField('city', 'Ciudad', 'city')}
            {renderField('state', 'Estado', 'state')}
            {renderField('postalCode', 'Código postal', 'postal_code')}

        </div>
    );
};