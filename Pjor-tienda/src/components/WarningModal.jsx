import React, { useEffect } from 'react';
import './styles/WarningModal.scss'; // Importa el archivo SCSS correspondiente

export const WarningModal = ({ isOpen, onClose }) => {
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose();
            }, 2300); // 2300 milisegundos = 2.3 segundos

            return () => clearTimeout(timer); // Limpia el timeout si el componente se desmonta o se cierra el modal antes de los 2.3 segundos
        }
    }, [isOpen, onClose]);

    return (
        <div className={`warning-modal__overlay ${isOpen ? 'warning-modal__overlay--open' : ''}`}>
            <div className="warning-modal__content">
                <p>Selecciona talla y color</p>
            </div>
        </div>
    );
};
