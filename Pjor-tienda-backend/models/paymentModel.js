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

  // 🔥 AJUSTADO → robusto + limpio
 static async savePaymentMethod(userId, paymentMethodId) {
  try {
    // 🔥 1. Obtener usuario
    const user = await db('users')
      .where({ id: userId })
      .first();

    if (!user || !user.stripe_customer_id) {
      throw new Error('Usuario sin customer en Stripe');
    }

    const customerId = user.stripe_customer_id;

    // 🔥 2. Obtener PaymentMethod
    let paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);

    if (!paymentMethod.card) {
      throw new Error('El método de pago no es una tarjeta válida');
    }

    // 🔥 3. Si no está adjunto → attach
    if (!paymentMethod.customer) {
      paymentMethod = await stripe.paymentMethods.attach(paymentMethodId, {
        customer: customerId,
      });
    }

    // 🔥 4. Validar ownership (crítico)
    if (paymentMethod.customer !== customerId) {
      throw new Error('El método de pago no pertenece al usuario');
    }

    const fingerprint = paymentMethod.card.fingerprint;

    // 🔥 5. Validar duplicado lógico
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

    // 🔥 6. Guardar en DB
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

    // 🔥 Duplicado por constraint DB
    if (error.code === '23505') {
      const err = new Error('Payment method already exists');
      err.code = 'PAYMENT_METHOD_EXISTS';
      throw err;
    }

    throw error;
  }
}

}

module.exports = PaymentModel;