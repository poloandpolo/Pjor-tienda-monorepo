const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const PaymentModel = require('../models/paymentModel');
const db = require('../db/db.js');

class PaymentController {

  // 🔥 EXISTENTE (ajustado a JWT opcional)
  static async createPaymentIntent(req, res) {
    const { amount, currency, paymentMethodId } = req.body;
    const userId = req.userId;

    if (!amount || !currency) {
      return res.status(400).json({ error: "Faltan parámetros necesarios" });
    }

    try {
      if (!userId) {
        const { clientSecret, paymentId } =
          await PaymentModel.createPaymentIntent(amount, currency);

        return res.status(200).json({ clientSecret, paymentId });
      }

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

  static async createSetupIntent(req, res) {
    const userId = req.userId;

    try {
      const user = await db('users').where({ id: userId }).first();

      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      let stripeCustomerId = user.stripe_customer_id;

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

  static async savePaymentMethod(req, res) {
    const userId = req.userId;
    const { paymentMethodId } = req.body;

    if (!paymentMethodId) {
      return res.status(400).json({ error: "paymentMethodId requerido" });
    }

    try {
      const paymentMethod = await PaymentModel.savePaymentMethod(
        userId,
        paymentMethodId
      );

      return res.json(paymentMethod);

    } catch (error) {

      if (error.code === 'PAYMENT_METHOD_EXISTS') {
        return res.status(409).json({ error: error.code });
      }

      return res.status(500).json({ error: error.message });
    }
  }

  static async getPaymentMethods(req, res) {
    const userId = req.userId;

    try {
      const paymentMethods = await db('payment_methods')
        .where({ user_id: userId })
        .orderBy('created_at', 'desc');

      return res.json(paymentMethods);

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // ==================================================
  // 🔥 NUEVO CHECKOUT REAL
  // POST /api/payments/checkout
  // ==================================================
  static async checkout(req, res) {
    const userId = req.userId;

    const {
      shippingAddressId,
      paymentMethodId,
      cartItems
    } = req.body;

    if (!shippingAddressId || !paymentMethodId || !cartItems?.length) {
      return res.status(400).json({
        error: 'Datos incompletos para checkout'
      });
    }

    const trx = await db.transaction();

    try {
      const user = await trx('users')
        .where({ id: userId })
        .first();

      if (!user || !user.stripe_customer_id) {
        await trx.rollback();
        return res.status(400).json({
          error: 'Usuario sin customer en Stripe'
        });
      }

      // 🔥 Obtener productos reales desde DB
      const productIds = cartItems.map(item => item.id);

      const products = await trx('products')
        .whereIn('id', productIds)
        .where({ active: true });

      if (!products.length) {
        await trx.rollback();
        return res.status(400).json({
          error: 'Productos inválidos'
        });
      }

      // 🔥 calcular subtotal
      let subtotal = 0;

      const itemsPrepared = cartItems.map(item => {
        const product = products.find(p => p.id === item.id);

        if (!product) {
          throw new Error(`Producto ${item.id} no encontrado`);
        }

        const unitPrice = Number(product.price);
        const quantity = Number(item.quantity);

        subtotal += unitPrice * quantity;

        return {
          product_id: product.id,
          name: product.name,
          price: unitPrice,
          quantity,
          size: item.size || null,
          color: item.color || null
        };
      });

      const shippingCost = 0;
      const taxes = 0;
      const total = subtotal + shippingCost + taxes;

      // 🔥 Crear order
      const [order] = await trx('orders')
        .insert({
          user_id: userId,
          shipping_address_id: shippingAddressId,
          payment_method_id: paymentMethodId,
          status: 'pending',
          subtotal,
          shipping_cost: shippingCost,
          taxes,
          total_amount: total,
          currency: 'mxn'
        })
        .returning('*');

      // 🔥 Insertar items
      const orderItems = itemsPrepared.map(item => ({
        order_id: order.id,
        ...item
      }));

      await trx('order_items').insert(orderItems);

      // 🔥 Cobro Stripe
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total * 100, // pesos a centavos
        currency: 'mxn',
        customer: user.stripe_customer_id,
        payment_method: paymentMethodId,
        off_session: true,
        confirm: true
      });

      // 🔥 Registrar pago
      await trx('payments').insert({
        payment_intent_id: paymentIntent.id,
        amount: total,
        currency: 'mxn',
        user_id: userId,
        order_id: order.id,
        payment_method_id: paymentMethodId,
        status: paymentIntent.status
      });

      // 🔥 Si cobrado
      if (paymentIntent.status === 'succeeded') {
        await trx('orders')
          .where({ id: order.id })
          .update({
            status: 'paid'
          });
      }

      await trx.commit();

      return res.status(200).json({
        success: true,
        orderId: order.id,
        paymentIntentId: paymentIntent.id,
        status: paymentIntent.status
      });

    } catch (error) {
      await trx.rollback();

      return res.status(500).json({
        error: error.message
      });
    }
  }

  // ==================================================
  // 🔥 HISTORIAL DE ÓRDENES
  // ==================================================
  static async getUserOrders(req, res) {
    const userId = req.userId;

    try {
      const orders = await db('orders')
        .where({ user_id: userId })
        .orderBy('created_at', 'desc');

      return res.json(orders);

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getOrderById(req, res) {
    const userId = req.userId;
    const { id } = req.params;

    try {
      const order = await db('orders')
        .where({
          id,
          user_id: userId
        })
        .first();

      if (!order) {
        return res.status(404).json({
          error: 'Orden no encontrada'
        });
      }

      const items = await db('order_items')
        .where({ order_id: id });

      return res.json({
        ...order,
        items
      });

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = PaymentController;