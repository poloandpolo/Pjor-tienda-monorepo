const BASE_URL = import.meta.env.VITE_API_URL;

export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('jwt');

  console.log('🔑 TOKEN EN apiFetch:', token); // 👈 AQUÍ

  if (!token) {
    console.error('❌ TOKEN MISSING');
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // 🔥 SIEMPRE ENVÍA
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('API ERROR:', errorData);
    throw new Error(errorData.message || 'Error en la petición');
  }

  return response.json();
};