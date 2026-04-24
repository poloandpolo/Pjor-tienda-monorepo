import { apiFetch } from './api';

// 🔥 Obtener todos los productos
export const getProducts = async () => {
  return await apiFetch('/api/products');
};

// 🔥 Obtener productos por categoría
export const getProductsByCategory = async (category) => {
  return await apiFetch(`/api/products?category=${category}`);
};

// 🔥 Obtener producto individual
export const getProductById = async (id) => {
  return await apiFetch(`/api/products/${id}`);
};