import { apiFetch } from './api';

// Todos los productos
export const getProducts = async () => {
  return await apiFetch('/api/products');
};

// Productos por departamento
export const getProductsByDepartment = async (department) => {
  return await apiFetch(`/api/products?department=${department}`);
};

// Producto individual
export const getProductById = async (id) => {
  return await apiFetch(`/api/products/${id}`);
};