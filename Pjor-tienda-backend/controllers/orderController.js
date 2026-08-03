const OrderModel = require('../models/orderModel');


const OrderController = {


  // ==================================================
  // 🔥 CREATE ORDER
  // ==================================================

  async createOrder(req, res) {

    const userId = req.userId;

    const {
      items,
      shipping_address_id,
      payment_method_id
    } = req.body;


    if (!items?.length) {

      return res.status(400).json({
        message: 'Cart vacío'
      });

    }


    if (
      !shipping_address_id ||
      !payment_method_id
    ) {

      return res.status(400).json({
        message:
          'Faltan datos de dirección o pago'
      });

    }


    try {

      const order =
        await OrderModel.createOrderWithSnapshots({
          userId,
          items,
          shipping_address_id,
          payment_method_id
        });



      return res.status(201).json({

        message:
          'Orden creada correctamente',

        order_id:
          order.id

      });



    } catch (error) {

      console.error(
        'CREATE ORDER ERROR:',
        error
      );


      return res.status(500).json({

        message:
          'Error creando orden',

        error:
          error.message

      });

    }

  },



  // ==================================================
  // 🔥 GET USER ORDERS
  // ==================================================

  async getUserOrders(req, res) {

    try {

      const orders =
        await OrderModel.getUserOrders(
          req.userId
        );


      return res.json(orders);



    } catch (error) {

      console.error(
        'GET USER ORDERS ERROR:',
        error
      );


      return res.status(500).json({

        message:
          'Error obteniendo órdenes'

      });

    }

  },



  // ==================================================
  // 🔥 GET ORDER BY ID
  // ==================================================

  async getOrderById(req, res) {

    try {


      const order =
        await OrderModel.getOrderById(
          req.userId,
          req.params.id
        );



      if (!order) {

        return res.status(404).json({

          message:
            'Orden no encontrada'

        });

      }



      const rawItems =
        await OrderModel.getOrderItems(
          order.id
        );



      const items =
        rawItems.map(item => {

          let parsedColor = null;


          try {

            parsedColor =
              item.color
                ? JSON.parse(item.color)
                : null;


          } catch {

            parsedColor =
              item.color;

          }



          return {

            ...item,

            color:
              parsedColor

          };


        });



      const address =
        await OrderModel.getOrderAddress(
          order.id
        );



      const payment_method =
        await OrderModel.getOrderPaymentMethod(
          order.id
        );



      return res.json({

        ...order,

        items,

        address,

        payment_method

      });



    } catch (error) {


      console.error(
        'GET ORDER BY ID ERROR:',
        error
      );



      return res.status(500).json({

        message:
          'Error obteniendo orden',

        error:
          error.message

      });


    }

  }

};


module.exports = OrderController;