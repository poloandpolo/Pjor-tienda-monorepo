import React from 'react';
import './styles/ClothingBarButton.scss';

export const ClothingBarButton = ({ text, onClick }) => {
    return (
        <div className='clothing-bar__checkbox-wrapper' onClick={onClick}>
            <input 
                type='checkbox' 
                id={text} 
                value={text} 
                className='clothing-bar__checkbox' 
            />
            <label htmlFor={text} className='clothing-bar__label'>
                {text}
            </label>
        </div>
    );
};
