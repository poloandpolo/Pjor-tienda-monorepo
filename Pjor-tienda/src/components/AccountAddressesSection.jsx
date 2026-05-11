import React, { useEffect, useRef } from 'react';
import { useMenPageContext } from '../context/MenPageContext';
import { updateAddress } from '../services/addressService';
import './styles/AccountAddressesSection.scss';

export const AccountAddressesSection = ({
    editingFields,
    handleFieldChange,
    handleEditClick,
    handleSaveClick,
    handleCancelClick,
    tempValues,
    handleBackToMenuClick
}) => {

    const {
        addresses,
        fetchAddresses,
        error
    } = useMenPageContext();

    useEffect(() => {

        fetchAddresses();

    }, []);

    const inputRefs = {
        firstName: useRef(null),
        lastName: useRef(null),
        address: useRef(null),
        city: useRef(null),
        state: useRef(null),
        postalCode: useRef(null),
    };

    const handleFocus = (field) => {

        setTimeout(() => {

            if (inputRefs[field]?.current) {

                inputRefs[field].current.focus();

            } else {

                console.warn(
                    `No se encontró la referencia para el campo: ${field}`
                );

            }

        }, 0);

    };

    if (error) {

        return (
            <div>
                {error}
            </div>
        );

    }

    return (

        <div className='account-addresses-section'>

            {addresses.length > 0 ? (

                addresses.map((addressData) => (

                    <div
                        className='account-addresses-section__container'
                        key={addressData.id}
                    >

                        {/* Nombre */}
                        <div className='account-addresses-section__label'>

                            <label>
                                Nombre:
                            </label>

                            <input
                                type='text'
                                placeholder={addressData.first_name}
                                disabled={!editingFields.firstName}
                                ref={inputRefs.firstName}
                                onChange={(e) =>
                                    handleFieldChange(
                                        'firstName',
                                        e.target.value
                                    )
                                }
                            />

                            {editingFields.firstName ? (

                                <div className='account-addresses-section__label-button-wrapper'>

                                    <button
                                        onClick={async () => {

                                            try {

                                                await updateAddress(
                                                    addressData.id,
                                                    {
                                                        first_name:
                                                            tempValues?.firstName
                                                    }
                                                );

                                                handleSaveClick(
                                                    'firstName'
                                                );

                                                fetchAddresses();

                                            } catch (error) {

                                                console.error(error);

                                            }

                                        }}
                                    >
                                        Guardar cambios
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleCancelClick(
                                                'firstName'
                                            )
                                        }
                                    >
                                        Cancelar
                                    </button>

                                </div>

                            ) : (

                                <button
                                    onClick={() => {

                                        handleEditClick(
                                            'firstName'
                                        );

                                        handleFocus(
                                            'firstName'
                                        );

                                    }}
                                >
                                    Editar
                                </button>

                            )}

                        </div>

                        {/* Apellido */}
                        <div className='account-addresses-section__label'>

                            <label>
                                Apellido:
                            </label>

                            <input
                                type='text'
                                placeholder={addressData.last_name}
                                disabled={!editingFields.lastName}
                                ref={inputRefs.lastName}
                                onChange={(e) =>
                                    handleFieldChange(
                                        'lastName',
                                        e.target.value
                                    )
                                }
                            />

                            {editingFields.lastName ? (

                                <div className='account-addresses-section__label-button-wrapper'>

                                    <button
                                        onClick={async () => {

                                            try {

                                                await updateAddress(
                                                    addressData.id,
                                                    {
                                                        last_name:
                                                            tempValues?.lastName
                                                    }
                                                );

                                                handleSaveClick(
                                                    'lastName'
                                                );

                                                fetchAddresses();

                                            } catch (error) {

                                                console.error(error);

                                            }

                                        }}
                                    >
                                        Guardar cambios
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleCancelClick(
                                                'lastName'
                                            )
                                        }
                                    >
                                        Cancelar
                                    </button>

                                </div>

                            ) : (

                                <button
                                    onClick={() => {

                                        handleEditClick(
                                            'lastName'
                                        );

                                        handleFocus(
                                            'lastName'
                                        );

                                    }}
                                >
                                    Editar
                                </button>

                            )}

                        </div>

                        {/* Dirección */}
                        <div className='account-addresses-section__label'>

                            <label>
                                Dirección:
                            </label>

                            <input
                                type='text'
                                placeholder={addressData.address}
                                disabled={!editingFields.address}
                                ref={inputRefs.address}
                                onChange={(e) =>
                                    handleFieldChange(
                                        'address',
                                        e.target.value
                                    )
                                }
                            />

                            {editingFields.address ? (

                                <div className='account-addresses-section__label-button-wrapper'>

                                    <button
                                        onClick={async () => {

                                            try {

                                                await updateAddress(
                                                    addressData.id,
                                                    {
                                                        address:
                                                            tempValues?.address
                                                    }
                                                );

                                                handleSaveClick(
                                                    'address'
                                                );

                                                fetchAddresses();

                                            } catch (error) {

                                                console.error(error);

                                            }

                                        }}
                                    >
                                        Guardar cambios
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleCancelClick(
                                                'address'
                                            )
                                        }
                                    >
                                        Cancelar
                                    </button>

                                </div>

                            ) : (

                                <button
                                    onClick={() => {

                                        handleEditClick(
                                            'address'
                                        );

                                        handleFocus(
                                            'address'
                                        );

                                    }}
                                >
                                    Editar
                                </button>

                            )}

                        </div>

                        {/* Ciudad */}
                        <div className='account-addresses-section__label'>

                            <label>
                                Ciudad:
                            </label>

                            <input
                                type='text'
                                placeholder={addressData.city}
                                disabled={!editingFields.city}
                                ref={inputRefs.city}
                                onChange={(e) =>
                                    handleFieldChange(
                                        'city',
                                        e.target.value
                                    )
                                }
                            />

                            {editingFields.city ? (

                                <div className='account-addresses-section__label-button-wrapper'>

                                    <button
                                        onClick={async () => {

                                            try {

                                                await updateAddress(
                                                    addressData.id,
                                                    {
                                                        city:
                                                            tempValues?.city
                                                    }
                                                );

                                                handleSaveClick(
                                                    'city'
                                                );

                                                fetchAddresses();

                                            } catch (error) {

                                                console.error(error);

                                            }

                                        }}
                                    >
                                        Guardar cambios
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleCancelClick(
                                                'city'
                                            )
                                        }
                                    >
                                        Cancelar
                                    </button>

                                </div>

                            ) : (

                                <button
                                    onClick={() => {

                                        handleEditClick(
                                            'city'
                                        );

                                        handleFocus(
                                            'city'
                                        );

                                    }}
                                >
                                    Editar
                                </button>

                            )}

                        </div>

                        {/* Estado */}
                        <div className='account-addresses-section__label'>

                            <label>
                                Estado:
                            </label>

                            <input
                                type='text'
                                placeholder={addressData.state}
                                disabled={!editingFields.state}
                                ref={inputRefs.state}
                                onChange={(e) =>
                                    handleFieldChange(
                                        'state',
                                        e.target.value
                                    )
                                }
                            />

                            {editingFields.state ? (

                                <div className='account-addresses-section__label-button-wrapper'>

                                    <button
                                        onClick={async () => {

                                            try {

                                                await updateAddress(
                                                    addressData.id,
                                                    {
                                                        state:
                                                            tempValues?.state
                                                    }
                                                );

                                                handleSaveClick(
                                                    'state'
                                                );

                                                fetchAddresses();

                                            } catch (error) {

                                                console.error(error);

                                            }

                                        }}
                                    >
                                        Guardar cambios
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleCancelClick(
                                                'state'
                                            )
                                        }
                                    >
                                        Cancelar
                                    </button>

                                </div>

                            ) : (

                                <button
                                    onClick={() => {

                                        handleEditClick(
                                            'state'
                                        );

                                        handleFocus(
                                            'state'
                                        );

                                    }}
                                >
                                    Editar
                                </button>

                            )}

                        </div>

                        {/* Código postal */}
                        <div className='account-addresses-section__label'>

                            <label>
                                Código postal:
                            </label>

                            <input
                                type='text'
                                placeholder={addressData.postal_code}
                                disabled={!editingFields.postalCode}
                                ref={inputRefs.postalCode}
                                onChange={(e) =>
                                    handleFieldChange(
                                        'postalCode',
                                        e.target.value
                                    )
                                }
                            />

                            {editingFields.postalCode ? (

                                <div className='account-addresses-section__label-button-wrapper'>

                                    <button
                                        onClick={async () => {

                                            try {

                                                await updateAddress(
                                                    addressData.id,
                                                    {
                                                        postal_code:
                                                            tempValues?.postalCode
                                                    }
                                                );

                                                handleSaveClick(
                                                    'postalCode'
                                                );

                                                fetchAddresses();

                                            } catch (error) {

                                                console.error(error);

                                            }

                                        }}
                                    >
                                        Guardar cambios
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleCancelClick(
                                                'postalCode'
                                            )
                                        }
                                    >
                                        Cancelar
                                    </button>

                                </div>

                            ) : (

                                <button
                                    onClick={() => {

                                        handleEditClick(
                                            'postalCode'
                                        );

                                        handleFocus(
                                            'postalCode'
                                        );

                                    }}
                                >
                                    Editar
                                </button>

                            )}

                        </div>

                    </div>

                ))

            ) : (

                <p>
                    No hay direcciones guardadas
                </p>

            )}

            <button
                className='account-addresses-section__back-button'
                onClick={handleBackToMenuClick}
            >
                Volver
            </button>

        </div>

    );

};