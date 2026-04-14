const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig.development);
const OrderModel = require('../models/orderModel');

const OrderController = {

  async createOrder(req, res) {
    const userId = req.userId;
    const { items, address, shipping_cost = 0, taxes = 0 } = req.body;

    if (!items || !Array.isArray(items) || !items.length) {
      return res.status(400).json({ message: 'Cart vacío' });
    }

    if (!address) {
      return res.status(400).json({ message: 'Dirección requerida' });
    }

    try {
      const orderId = await knex.transaction(async (trx) => {

        const subtotal = items.reduce((acc, item) => {
          return acc + (item.price * item.quantity);
        }, 0);

        const total_amount = subtotal + shipping_cost + taxes;

        const orderData = {
          user_id: userId,
          status: 'pending',
          subtotal,
          shipping_cost,
          taxes,
          total_amount,
          currency: 'mxn'
        };

        const newOrderId = await OrderModel.createOrder(trx, orderData);

        const orderItems = items.map(item => ({
          order_id: newOrderId,
          product_id: item.product_id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size || null,
          color: item.color || null
        }));

        await OrderModel.createOrderItems(trx, orderItems);

        await OrderModel.createOrderAddress(trx, {
          order_id: newOrderId,
          first_name: address.first_name,
          last_name: address.last_name,
          address: address.address,
          city: address.city,
          state: address.state,
          postal_code: address.postal_code,
          phone: address.phone
        });

        return newOrderId;
      });

      return res.status(201).json({
        message: 'Orden creada correctamente',
        order_id: orderId
      });

    } catch (error) {
      console.error('CREATE ORDER ERROR:', error);

      return res.status(500).json({
        message: 'Error creando orden',
        error: error.message
      });
    }
  },

  async getUserOrders(req, res) {
    try {
      const orders = await OrderModel.getUserOrders(req.userId);
      return res.json(orders);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error obteniendo órdenes' });
    }
  },

  async getOrderById(req, res) {
    try {
      const order = await OrderModel.getOrderById(req.userId, req.params.id);

      if (!order) {
        return res.status(404).json({ message: 'Orden no encontrada' });
      }

      const items = await OrderModel.getOrderItems(req.params.id);
      const address = await OrderModel.getOrderAddress(req.params.id);

      return res.json({
        ...order,
        items,
        address
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error obteniendo orden' });
    }
  }

};

module.exports = OrderController;