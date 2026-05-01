import { apiFetch } from './api';

export const getUserOrders = async () => {
  return apiFetch('/api/payments/orders');
};

export const getOrderById = async (orderId) => {
  console.log('🔥 FRONTEND getOrderById', orderId);

  return apiFetch(`/api/payments/orders/${orderId}`);
};