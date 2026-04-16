const BASE_URL = '/api'; // 🔥 esto activa el proxy de Vercel

export const apiFetch = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      ...options,
    });

    // 🔥 manejar errores correctamente
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error en la petición');
    }

    return await response.json();

  } catch (error) {
    console.error('API ERROR:', error.message);
    throw error;
  }
};