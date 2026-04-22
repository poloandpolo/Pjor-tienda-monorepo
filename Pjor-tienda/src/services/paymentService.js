import { apiFetch } from './api';

// ========================
// 💳 CREATE PAYMENT INTENT
// ========================
export const createPaymentIntent = async (payload) => {
  return apiFetch('/api/payments/create-payment-intent', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};

// ========================
// 🔍 PAYMENT STATUS
// ========================
export const getPaymentStatus = async (id) => {
  return apiFetch(`/api/payments/payment-status/${id}`, {
    method: 'GET',
  });
};

// ========================
// 🧾 SETUP INTENT (requiere JWT)
// ========================
export const createSetupIntent = async () => {
  return apiFetch('/api/payments/create-setup-intent', {
    method: 'POST',
  });
};

// ========================
// 💾 SAVE PAYMENT METHOD (requiere JWT)
// ========================
export const savePaymentMethod = async (paymentMethodId) => {
  return apiFetch('/api/payments/save-payment-method', {
    method: 'POST',
    body: JSON.stringify({ paymentMethodId }),
  });
};

// ========================
// 📄 GET PAYMENT METHODS (requiere JWT)
// ========================
export const getPaymentMethods = async () => {
  return apiFetch('/api/payments/payment-methods', {
    method: 'GET',
  });
};