import { apiFetch } from './api';

// ==========================
// CREATE ADDRESS
// ==========================
export const createAddress = (data) => {

    return apiFetch('/api/addresses', {
        method: 'POST',
        body: JSON.stringify(data),
    });

};

// ==========================
// GET ADDRESSES
// ==========================
export const getAddresses = () => {

    return apiFetch('/api/addresses', {
        method: 'GET',
    });

};

// ==========================
// UPDATE ADDRESS
// ==========================
export const updateAddress = (
    addressId,
    updatedData
) => {

    return apiFetch(
        `/api/addresses/${addressId}`,
        {
            method: 'PUT',
            body: JSON.stringify(updatedData),
        }
    );

};