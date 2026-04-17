const BASE_URL = import.meta.env.VITE_API_URL;

export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('jwt');

  console.log('🔑 TOKEN EN apiFetch:', token);

  // 👇 AQUÍ VA
  if (!token) {
    console.warn('No token, request not sent');
    return null; // o throw new Error('No authenticated user');
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Error en la petición');
  }

  return response.json();
};