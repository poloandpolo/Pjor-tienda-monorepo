const db = require('../db/db');

const OrderModel = {

  async createOrder(trx, orderData) {
    const result = await trx('orders')
      .insert(orderData)
      .returning('*');

    return result[0];
  },

  async createOrderItems(trx, items) {
    return trx('order_items').insert(items);
  },

  async createOrderPaymentMethod(trx, paymentMethodData) {
    const result = await trx('order_payment_methods')
      .insert(paymentMethodData)
      .returning('*');

    return result[0];
  },

  async getUserOrders(userId) {
    return db('orders')
      .where({ user_id: userId })
      .orderBy('created_at', 'desc');
  },

  async getOrderById(userId, orderId) {
    return db('orders')
      .where({
        id: orderId,
        user_id: userId
      })
      .first();
  },

  async getOrderItems(orderId) {
    return db('order_items as oi')
      .leftJoin(
        'product_images as pi',
        'oi.product_id',
        'pi.product_id'
      )
      .select(
        'oi.*',
        db.raw(`
          COALESCE(
            json_agg(pi.image_url)
            FILTER (WHERE pi.image_url IS NOT NULL),
            '[]'
          ) as images
        `)
      )
      .where({
        'oi.order_id': orderId
      })
      .groupBy('oi.id');
  },

  async getAddressById(addressId) {
    return db('addresses')
      .where({ id: addressId })
      .first();
  },

  async getPaymentMethodById(paymentMethodId, trx = db) {
    return trx('payment_methods')
      .where({ id: paymentMethodId })
      .first();
  },

  async getOrderPaymentMethod(orderId) {
    return db('order_payment_methods')
      .where({ order_id: orderId })
      .first();
  }

};

module.exports = OrderModel;