import React, { useRef } from 'react';
import './styles/ProfileInfo.scss';

export const ProfileInfo = ({
    decodedToken,
    editingFields,
    handleFieldChange,
    handleEditClick,
    handleSaveClick,
    handleCancelClick,
    handleBackToMenuClick
}) => {
    const inputRefs = {
        firstName: useRef(null),
        lastName: useRef(null),
        email: useRef(null),
        password: useRef(null),
    };

    const handleFocus = (field) => {
        setTimeout(() => {
            if (inputRefs[field]?.current) {
                inputRefs[field].current.focus();
            } else {
                console.warn(`No se encontró la referencia para el campo: ${field}`);
            }
        }, 0); // Retraso de 0 ms para esperar al siguiente ciclo del event loop
    };

    return (
        <div className='profile-info'>
            <div className='profile-info__section'>
                <div className='profile-info__label'>
                    <label>Nombre:</label>
                    <input
                        type='text'
                        placeholder={decodedToken.first_name}
                        disabled={!editingFields.firstName}
                        ref={inputRefs.firstName}
                        onChange={(e) => handleFieldChange('firstName', e.target.value)}
                    />
                    {editingFields.firstName ? (
                        <div className="profile-info__label-button-wrapper">
                            <button onClick={() => handleSaveClick('firstName')}>Guardar cambios</button>
                            <button onClick={() => handleCancelClick('firstName')}>Cancelar</button>
                        </div>
                    ) : (
                        <button
                            onClick={() => {
                                handleEditClick('firstName');
                                handleFocus('firstName'); // Enfocar después de activar edición
                            }}
                        >
                            Editar
                        </button>
                    )}
                </div>
                <div className='profile-info__label'>
                    <label>Apellido:</label>
                    <input
                        type='text'
                        placeholder={decodedToken.last_name}
                        disabled={!editingFields.lastName}
                        ref={inputRefs.lastName}
                        onChange={(e) => handleFieldChange('lastName', e.target.value)}
                    />
                    {editingFields.lastName ? (
                        <div className="profile-info__label-button-wrapper">
                            <button onClick={() => handleSaveClick('lastName')}>Guardar cambios</button>
                            <button onClick={() => handleCancelClick('lastName')}>Cancelar</button>
                        </div>
                    ) : (
                        <button
                            onClick={() => {
                                handleEditClick('lastName');
                                handleFocus('lastName'); // Enfocar después de activar edición
                            }}
                        >
                            Editar
                        </button>
                    )}
                </div>
                <div className='profile-info__label'>
                    <label>Email:</label>
                    <input
                        type='email'
                        placeholder={decodedToken.email}
                        disabled={!editingFields.email}
                        ref={inputRefs.email}
                        onChange={(e) => handleFieldChange('email', e.target.value)}
                    />
                    {editingFields.email ? (
                        <div className="profile-info__label-button-wrapper">
                            <button onClick={() => handleSaveClick('email')}>Guardar cambios</button>
                            <button onClick={() => handleCancelClick('email')}>Cancelar</button>
                        </div>
                    ) : (
                        <button
                            onClick={() => {
                                handleEditClick('email');
                                handleFocus('email'); // Enfocar después de activar edición
                            }}
                        >
                            Editar
                        </button>
                    )}
                </div>
                <div className='profile-info__label'>
                    <label>Password:</label>
                    <input
                        type='text'
                        placeholder='********'
                        disabled={!editingFields.password}
                        ref={inputRefs.password}
                        onChange={(e) => handleFieldChange('password', e.target.value)}
                    />
                    {editingFields.password ? (
                        <div className="profile-info__label-button-wrapper">
                            <button onClick={() => handleSaveClick('password')}>Guardar cambios</button>
                            <button onClick={() => handleCancelClick('password')}>Cancelar</button>
                        </div>
                    ) : (
                        <button
                            onClick={() => {
                                handleEditClick('password');
                                handleFocus('password'); // Enfocar después de activar edición
                            }}
                        >
                            Editar
                        </button>
                    )}
                </div>
            </div>
            <button className='profile-info__back-button' onClick={handleBackToMenuClick}>
                Volver
            </button>
        </div>
    );
};
