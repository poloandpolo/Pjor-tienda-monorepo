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

  async createOrderAddress(trx, address) {
    return trx('order_addresses').insert(address);
  },

  async getUserOrders(userId) {
    return knex('orders')
      .where({ user_id: userId })
      .orderBy('created_at', 'desc');
  },

  async getOrderById(userId, orderId) {
    return knex('orders')
      .where({ id: orderId, user_id: userId })
      .first();
  },

  async getOrderItems(orderId) {
    return knex('order_items')
      .where({ order_id: orderId });
  },

  async getOrderAddress(orderId) {
    return knex('order_addresses')
      .where({ order_id: orderId })
      .first();
  }

};

module.exports = OrderModel;