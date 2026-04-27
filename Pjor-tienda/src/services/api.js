const BASE_URL = import.meta.env.VITE_API_URL;

export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('jwt');

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  // 🔥 Agregar token si existe
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response;
  let data = {};

  try {
    response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    data = await response.json().catch(() => ({}));

  } catch (networkError) {
    console.error('🌐 Network Error:', networkError);

    throw new Error('No se pudo conectar con el servidor');
  }

  if (!response.ok) {
    console.error('❌ API ERROR');
    console.error('URL:', `${BASE_URL}${endpoint}`);
    console.error('METHOD:', options.method || 'GET');
    console.error('STATUS:', response.status);
    console.error('RESPONSE:', data);

    throw new Error(
      data.error ||
      data.message ||
      `HTTP ${response.status}`
    );
  }

  return data;
};