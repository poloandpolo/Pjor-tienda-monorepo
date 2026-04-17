import React, { useState } from 'react';
import './styles/AddressItem.scss';

// Componente para representar una dirección individual
export const AddressItem = ({ address, isSelected, onSelect }) => {

  useEffect(() => {
  console.log('📦 ADDRESSES STATE:', addresses);
}, [addresses]);

  return (
    <div className='address-item__content'>
      <label>
        <input
          type='radio'
          name='address'
          value={address.id}
          checked={isSelected}
          onChange={() => onSelect(address)}
        />
        <span>
          {address.first_name} {address.last_name} <br />
          {address.address}, {address.city}, {address.state} <br />
          {address.postal_code} <br />
          Tel: {address.phone}
        </span>
      </label>
    </div>
  );
};