// services/orderService.js

import { apiFetch } from './api';

// =====================================
// 🔥 NORMALIZADORES
// =====================================

const normalizeAddress = (address) => {
  if (!address) return null;

  return {
    id: address.id,
    first_name: address.first_name || '',
    last_name: address.last_name || '',
    address: address.address || '',
    city: address.city || '',
    state: address.state || '',
    postal_code: address.postal_code || '',
    phone: address.phone || ''
  };
};

const normalizePaymentMethod = (pm) => {
  if (!pm) return null;

  return {
    id: pm.id,
    brand: pm.brand || '',
    last4: pm.last4 || '',
    exp_month: pm.exp_month || '',
    exp_year: pm.exp_year || '',
    fingerprint: pm.fingerprint || '',
    stripe_payment_method_id:
      pm.stripe_payment_method_id || ''
  };
};

const normalizeItems = (items = []) => {
  return items.map((item) => {
    let parsedColor = item.color;

    try {
      if (typeof item.color === 'string') {
        parsedColor = JSON.parse(item.color);
      }
    } catch (_) {}

    return {
      ...item,
      color: parsedColor
    };
  });
};

// =====================================
// 🔥 SERVICES
// =====================================

export const getUserOrders = async () => {
  const data = await apiFetch('/api/payments/orders');

  return data || [];
};

export const getOrderById = async (orderId) => {
  console.log('🔥 FRONTEND getOrderById', orderId);

  const data = await apiFetch(
    `/api/orders/${orderId}`
  );

  // 🔴 RAW RESPONSE
  console.log(
    '🔴 RAW BACKEND RESPONSE:',
    data
  );

  if (!data) return null;

  // 🟡 DEBUG ADDRESS
  console.log(
    '🟡 ADDRESS FROM BACKEND:',
    data.address
  );

  // 🟢 DEBUG PAYMENT METHOD
  console.log(
    '🟢 PAYMENT METHOD FROM BACKEND:',
    data.payment_method
  );

  // 🔵 NORMALIZED
  const normalized = {
    ...data,

    address: normalizeAddress(
      data.address
    ),

    payment_method:
      normalizePaymentMethod(
        data.payment_method
      ),

    items: normalizeItems(
      data.items
    )
  };

  console.log(
    '🔵 NORMALIZED ORDER:',
    normalized
  );

  return normalized;
};