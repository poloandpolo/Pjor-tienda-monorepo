const BASE_URL = import.meta.env.VITE_API_URL;

export const apiFetch = async (endpoint, options = {}) => {

  const token = localStorage.getItem('jwt');

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  // 🔥 SOLO agregar token si existe
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'API error');
  }

  return data;
};