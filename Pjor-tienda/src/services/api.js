const BASE_URL = import.meta.env.VITE_API_URL;

export const apiFetch = async (endpoint, options = {}) => {

  const token = localStorage.getItem('jwt'); // temporalmente válido

  if (!token) {
    console.error('No token, request not sent');
    throw new Error('Token missing');
  }

  return fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  }).then(r => r.json());
};