const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig.development);

const OrderModel = {

  async createOrder(trx, orderData) {
    const result = await trx('orders')
      .insert(orderData)
      .returning('id');

    return result[0].id;
  },

  async createOrderItems(trx, items) {
    return trx('order_items').insert(items);
  },

  async getUserOrders(userId) {
    return knex('orders')
      .where({ user_id: userId })
      .orderBy('created_at', 'desc');
  },

  async getOrderById(userId, orderId) {
    return knex('orders')
      .where({
        id: orderId,
        user_id: userId
      })
      .first();
  },

  async getOrderItems(orderId) {
    return knex('order_items as oi')
      .leftJoin(
        'product_images as pi',
        'oi.product_id',
        'pi.product_id'
      )
      .select(
        'oi.*',
        knex.raw(`
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
    return knex('addresses')
      .where({ id: addressId })
      .first();
  },

  async getPaymentMethodById(paymentMethodId) {
    return knex('payment_methods')
      .where({ id: paymentMethodId })
      .first();
  }

};

module.exports = OrderModel;