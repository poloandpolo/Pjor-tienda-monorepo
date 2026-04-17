const BASE_URL = import.meta.env.VITE_API_URL;

export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('jwt');

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    console.error('API ERROR:', data);
    throw new Error(data?.message || 'Error en la petición');
  }

  return data;
};