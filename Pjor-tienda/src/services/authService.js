import { apiFetch } from './api';

export const loginUser = (data) => {
  return apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const registerUser = (data) => {
  return apiFetch('/users', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const updateUser = (data) => {
  return apiFetch('/users', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};