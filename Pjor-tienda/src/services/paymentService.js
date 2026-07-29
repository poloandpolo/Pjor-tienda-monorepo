import { apiFetch } from './api';

export const createPaymentIntent = async (payload) => {
  return apiFetch('/api/payments/create-payment-intent', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};


export const getPaymentStatus = async (id) => {
  return apiFetch(`/api/payments/payment-status/${id}`, {
    method: 'GET',
  });
};


export const createSetupIntent = async () => {
  return apiFetch('/api/payments/create-setup-intent', {
    method: 'POST',
  });
};


export const savePaymentMethod = async (paymentMethodId) => {
  return apiFetch('/api/payments/save-payment-method', {
    method: 'POST',
    body: JSON.stringify({ paymentMethodId }),
  });
};


export const getPaymentMethods = async () => {
  return apiFetch('/api/payments/payment-methods', {
    method: 'GET',
  });
};

export const deletePaymentMethod = async (id) => {
  return apiFetch(`/api/payments/payment-methods/${id}`, {
    method: 'DELETE',
  });
};


export const checkout = async ({
  shippingAddressId,
  paymentMethodId,
  cartItems,
}) => {
  // 🔥 Debug payload antes de enviar
  console.log('🛒 CHECKOUT PAYLOAD');
  console.log('shippingAddressId:', shippingAddressId);
  console.log('paymentMethodId:', paymentMethodId);
  console.log('cartItems:', cartItems);
  console.table(cartItems);

  return apiFetch('/api/payments/checkout', {
    method: 'POST',
    body: JSON.stringify({
      shippingAddressId,
      paymentMethodId,
      cartItems,
    }),
  });
};


export const getOrders = async () => {
  return apiFetch('/api/payments/orders', {
    method: 'GET',
  });
};


export const getOrderById = async (id) => {
  return apiFetch(`/api/payments/orders/${id}`, {
    method: 'GET',
  });
};