import React, { useEffect } from 'react';
import './styles/ConfirmationModal.scss'; // Actualiza el nombre del archivo CSS
import verificacion_image from '/verificacion-verde.png';

export const ConfirmationModal = ({ isOpen, onClose }) => {
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose();
            }, 800); // Cierra el modal automáticamente después de 0.8 segundos
            
            return () => clearTimeout(timer); // Limpia el timeout si el componente se desmonta o se cierra el modal antes
        }
    }, [isOpen, onClose]);

    return (
        <div className={`confirmation-modal__overlay ${isOpen ? 'confirmation-modal__overlay--open' : ''}`}>
            <div className="confirmation-modal__content">
                <img src={verificacion_image} alt="Verificación exitosa" className="confirmation-modal__image" />
                <p className="confirmation-modal__text">Añadido al carrito</p>
            </div>
        </div>
    );
};
