const BASE_URL = import.meta.env.VITE_API_URL;

export const apiFetch = async (endpoint, options = {}) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw {
      status: response.status,
      statusText: response.statusText,
      data,
    };
  }

  return data;
};