const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const db = require('../db/db');

class PaymentModel {

  // 🔥 EXISTENTE (NO tocar)
  static async createPaymentIntent(amount, currency) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
      });

      const [payment] = await db('payments')
        .insert({
          payment_intent_id: paymentIntent.id,
          amount,
          currency,
          status: paymentIntent.status,
        })
        .returning('*');

      return {
        clientSecret: paymentIntent.client_secret,
        paymentId: payment.id,
      };

    } catch (error) {
      throw new Error(`Error al crear PaymentIntent: ${error.message}`);
    }
  }

  // 🔥 EXISTENTE
  static async findPaymentById(id) {
    try {
      return await db('payments')
        .where('id', id)
        .first();
    } catch (error) {
      throw new Error(`Error al obtener pago por ID: ${error.message}`);
    }
  }

  // 🔥 EXISTENTE
  static async savePaymentRecord({
    paymentIntentId,
    amount,
    currency,
    status,
    userId,
  }) {
    try {
      const [payment] = await db('payments')
        .insert({
          payment_intent_id: paymentIntentId,
          amount,
          currency,
          status,
          user_id: userId || null,
        })
        .returning('*');

      return payment;

    } catch (error) {
      throw new Error(`Error guardando pago: ${error.message}`);
    }
  }

  // 🔥 EXISTENTE
  static async savePaymentMethod(userId, paymentMethodId) {
    try {
      const user = await db('users')
        .where({ id: userId })
        .first();

      if (!user || !user.stripe_customer_id) {
        throw new Error('Usuario sin customer en Stripe');
      }

      const customerId = user.stripe_customer_id;

      let paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);

      if (!paymentMethod.card) {
        throw new Error('El método de pago no es una tarjeta válida');
      }

      if (!paymentMethod.customer) {
        paymentMethod = await stripe.paymentMethods.attach(paymentMethodId, {
          customer: customerId,
        });
      }

      if (paymentMethod.customer !== customerId) {
        throw new Error('El método de pago no pertenece al usuario');
      }

      const fingerprint = paymentMethod.card.fingerprint;

      const existing = await db('payment_methods')
        .where({
          user_id: userId,
          fingerprint,
        })
        .first();

      if (existing) {
        const error = new Error('Payment method already exists');
        error.code = 'PAYMENT_METHOD_EXISTS';
        throw error;
      }

      const [newPaymentMethod] = await db('payment_methods')
        .insert({
          user_id: userId,
          stripe_payment_method_id: paymentMethod.id,
          stripe_customer_id: customerId,
          fingerprint,
          brand: paymentMethod.card.brand,
          last4: paymentMethod.card.last4,
          exp_month: paymentMethod.card.exp_month,
          exp_year: paymentMethod.card.exp_year,
        })
        .returning('*');

      return newPaymentMethod;

    } catch (error) {

      if (error.code === '23505') {
        const err = new Error('Payment method already exists');
        err.code = 'PAYMENT_METHOD_EXISTS';
        throw err;
      }

      throw error;
    }
  }

  // ==================================================
  // 🔥 NUEVO CHECKOUT HELPERS
  // ==================================================

  static async createOrder(trx, orderData) {
    try {
      const [order] = await trx('orders')
        .insert(orderData)
        .returning('*');

      return order;

    } catch (error) {
      throw new Error(`Error creando orden: ${error.message}`);
    }
  }

  static async createOrderItems(trx, items) {
    try {
      return await trx('order_items')
        .insert(items)
        .returning('*');

    } catch (error) {
      throw new Error(`Error creando order items: ${error.message}`);
    }
  }

  static async createCheckoutPayment(trx, paymentData) {
    try {
      const [payment] = await trx('payments')
        .insert(paymentData)
        .returning('*');

      return payment;

    } catch (error) {
      throw new Error(`Error creando pago checkout: ${error.message}`);
    }
  }

  static async updateOrderStatus(trx, orderId, status) {
    try {
      await trx('orders')
        .where({ id: orderId })
        .update({
          status,
          updated_at: db.fn.now()
        });

    } catch (error) {
      throw new Error(`Error actualizando orden: ${error.message}`);
    }
  }

  static async getUserOrders(userId) {
    try {
      return await db('orders')
        .where({ user_id: userId })
        .orderBy('created_at', 'desc');

    } catch (error) {
      throw new Error(`Error obteniendo órdenes: ${error.message}`);
    }
  }

  static async getOrderById(userId, orderId) {
    try {
      const order = await db('orders')
        .where({
          id: orderId,
          user_id: userId
        })
        .first();

      if (!order) return null;

      const items = await db('order_items')
        .where({ order_id: orderId });

      return {
        ...order,
        items
      };

    } catch (error) {
      throw new Error(`Error obteniendo orden: ${error.message}`);
    }
  }

  static async getProductsByIds(productIds) {
    try {
      return await db('products')
        .whereIn('id', productIds)
        .where({ active: true });

    } catch (error) {
      throw new Error(`Error obteniendo productos: ${error.message}`);
    }
  }

  static async deletePaymentMethod(userId, paymentMethodId) {
  const paymentMethod = await db('payment_methods')
    .where({
      id: paymentMethodId,
      user_id: userId,
    })
    .first();

  if (!paymentMethod) {
    const error = new Error(
      'Método de pago no encontrado'
    );
    error.code = 'PAYMENT_METHOD_NOT_FOUND';
    throw error;
  }

  await stripe.paymentMethods.detach(
    paymentMethod.stripe_payment_method_id
  );

  await db('payment_methods')
    .where({
      id: paymentMethodId,
      user_id: userId,
    })
    .del();

  return true;
}
}

module.exports = PaymentModel;