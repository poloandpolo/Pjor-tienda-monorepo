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

  // 🔥 NUEVO → guardar método de pago con fingerprint
  static async savePaymentMethod(userId, paymentMethodId) {

    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);

    const fingerprint = paymentMethod.card.fingerprint;

    // 🔥 validar duplicado real
    const existing = await db('payment_methods')
      .where({
        user_id: userId,
        fingerprint,
      })
      .first();

    if (existing) {
      console.log('⚠️ Tarjeta ya registrada');
      throw { code: 'PAYMENT_METHOD_EXISTS' };
    }

    try {
      await db('payment_methods').insert({
        user_id: userId,
        stripe_payment_method_id: paymentMethod.id,
        stripe_customer_id: paymentMethod.customer,
        fingerprint,
        brand: paymentMethod.card.brand,
        last4: paymentMethod.card.last4,
        exp_month: paymentMethod.card.exp_month,
        exp_year: paymentMethod.card.exp_year,
      });

      return { message: "Método de pago guardado" };

    } catch (error) {

      if (error.code === 'ER_DUP_ENTRY') {
        console.log('⚠️ Duplicado detectado por DB');
        throw { code: 'PAYMENT_METHOD_EXISTS' };
      }

      throw error;
    }
  }

}

module.exports = PaymentModel;