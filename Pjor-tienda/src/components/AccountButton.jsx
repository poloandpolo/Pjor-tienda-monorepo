import React from 'react';
import account from '/account.png';
import './styles/AccountButton.scss';

export const AccountButton = ({ onClick, isOpen }) => {
  return (
    <div className={`account-button__container ${isOpen ? 'account-button__container--hide' : ''}`}>
      <img 
        className='account-button__icon'
        src={account} 
        alt="account-button" 
        onClick={onClick}
      />
    </div>
  );
};
