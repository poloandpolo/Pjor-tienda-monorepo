const db = require('../db/db');
const OrderModel = require('../models/orderModel');

const OrderController = {

  async createOrder(req, res) {
    const userId = req.userId;
    const { items, shipping_address_id, payment_method_id } = req.body;

    if (!items?.length) {
      return res.status(400).json({ message: 'Cart vacío' });
    }

    if (!shipping_address_id || !payment_method_id) {
      return res.status(400).json({
        message: 'Faltan datos de dirección o pago'
      });
    }

    try {
      const order = await knex.transaction(async (trx) => {

        let subtotal = 0;

        const itemsPrepared = items.map(item => {
          const price = Number(item.price);
          const quantity = Number(item.quantity);

          subtotal += price * quantity;

          return {
            product_id: item.product_id,
            name: item.name,
            price,
            quantity,
            size: item.size || null,
            color: item.color || null
          };
        });

        const total = subtotal;

        const newOrder = await OrderModel.createOrder(trx, {
          user_id: userId,
          shipping_address_id,
          payment_method_id,
          status: 'pending',
          subtotal,
          shipping_cost: 0,
          taxes: 0,
          total_amount: total,
          currency: 'mxn'
        });

        const orderItems = itemsPrepared.map(item => ({
          order_id: newOrder.id,
          ...item
        }));

        await OrderModel.createOrderItems(trx, orderItems);

        return newOrder;
      });

      return res.status(201).json({
        message: 'Orden creada correctamente',
        order_id: order.id
      });

    } catch (error) {
      console.error(error);

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
      return res.status(500).json({
        message: 'Error obteniendo órdenes'
      });
    }
  },

  async getOrderById(req, res) {
    try {
      const order = await OrderModel.getOrderById(
        req.userId,
        req.params.id
      );

      if (!order) {
        return res.status(404).json({
          message: 'Orden no encontrada'
        });
      }

      const rawItems = await OrderModel.getOrderItems(order.id);

      const items = rawItems.map(item => {
        let parsedColor = null;

        try {
          parsedColor = item.color
            ? JSON.parse(item.color)
            : null;
        } catch (e) {
          parsedColor = item.color; // fallback
        }

        return {
          ...item,
          color: parsedColor
        };
      });

      const address = await OrderModel.getAddressById(
        order.shipping_address_id
      );

      const payment_method = await OrderModel.getPaymentMethodById(
        order.payment_method_id
      );

      return res.json({
        ...order,
        items,
        address,
        payment_method
      });

    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: 'Error obteniendo orden'
      });
    }
  }

};

module.exports = OrderController;