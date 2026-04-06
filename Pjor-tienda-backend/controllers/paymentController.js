const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const PaymentModel = require('../models/paymentModel');
const db = require('../db/db.js');

class PaymentController {

  // 🔥 EXISTENTE (mantenido, solo extendido opcionalmente)
  static async createPaymentIntent(req, res) {
    const { amount, currency, userId, paymentMethodId } = req.body;

    if (!amount || !currency) {
      return res.status(400).json({ error: "Faltan parámetros necesarios" });
    }

    try {
      // 👉 Si NO mandas userId → usa flujo viejo (compatible)
      if (!userId) {
        const { clientSecret, paymentId } =
          await PaymentModel.createPaymentIntent(amount, currency);

        return res.status(200).json({ clientSecret, paymentId });
      }

      // 👉 Si mandas userId → usa tarjetas guardadas (flujo nuevo)
      const user = await db('users').where({ id: userId }).first();

      if (!user || !user.stripe_customer_id) {
        return res.status(400).json({ error: "Usuario sin customer en Stripe" });
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        customer: user.stripe_customer_id,
        payment_method: paymentMethodId,
        off_session: true,
        confirm: true,
      });

      await db('payments').insert({
        payment_intent_id: paymentIntent.id,
        amount,
        currency,
        status: paymentIntent.status,
        user_id: userId,
      });

      return res.status(200).json({ paymentIntent });

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // 🔥 EXISTENTE (sin cambios)
  static async getPaymentStatus(req, res) {
    const { id } = req.params;

    try {
      const payment = await PaymentModel.findPaymentById(id);

      if (!payment) {
        return res.status(404).json({ error: "Pago no encontrado" });
      }

      return res.status(200).json(payment);

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // 🔥 NUEVO → crear SetupIntent (guardar tarjeta)
  static async createSetupIntent(req, res) {
    const { userId } = req.body;

    try {
      const user = await db('users').where({ id: userId }).first();

      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      let stripeCustomerId = user.stripe_customer_id;

      // crear customer si no existe
      if (!stripeCustomerId) {
        const customer = await stripe.customers.create({
          email: user.email,
        });

        stripeCustomerId = customer.id;

        await db('users')
          .where({ id: userId })
          .update({ stripe_customer_id: stripeCustomerId });
      }

      const setupIntent = await stripe.setupIntents.create({
        customer: stripeCustomerId,
      });

      return res.json({ clientSecret: setupIntent.client_secret });

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // 🔥 NUEVO → guardar método de pago
  static async savePaymentMethod(req, res) {

  const { userId, paymentMethodId } = req.body;

  try {
    const result = await PaymentModel.savePaymentMethod(userId, paymentMethodId);

    return res.json(result);

  } catch (error) {

    if (error.code === 'PAYMENT_METHOD_EXISTS') {
      console.log('xD Tarjeta ya registrada');

      return res.status(409).json({ error: error.code });
    }

    return res.status(500).json({ error: error.message });
  }
}
}

module.exports = PaymentController;