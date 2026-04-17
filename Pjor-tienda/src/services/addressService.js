import { apiFetch } from './api';

export const createAddress = (data) => {
  return apiFetch('/api/addresses', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const getAddresses = () => {
  return apiFetch('/api/addresses', {
    method: 'GET',
  });
};