const db = require('../db/db');


const OrderModel = {


  // ==================================================
  // 🔥 CREATE ORDER WITH SNAPSHOTS
  // ==================================================

  async createOrderWithSnapshots({
    userId,
    items,
    shipping_address_id,
    payment_method_id
  }) {


    return db.transaction(async (trx) => {


      let subtotal = 0;


      const itemsPrepared =
        items.map(item => {


          const price =
            Number(item.price);


          const quantity =
            Number(item.quantity);


          subtotal +=
            price * quantity;



          return {

            product_id:
              item.product_id,

            name:
              item.name,

            price,

            quantity,

            size:
              item.size || null,

            color:
              item.color || null

          };


        });



      const total =
        subtotal;



      // ==========================
      // CREATE ORDER
      // ==========================


      const order =
        await this.createOrder(
          trx,
          {

            user_id:
              userId,

            shipping_address_id,

            payment_method_id,

            status:
              'pending',

            subtotal,

            shipping_cost:
              0,

            taxes:
              0,

            total_amount:
              total,

            currency:
              'mxn'

          }
        );




      // ==========================
      // CREATE ITEMS
      // ==========================


      const orderItems =
        itemsPrepared.map(item => ({

          order_id:
            order.id,

          ...item

        }));


      await this.createOrderItems(
        trx,
        orderItems
      );




      // ==========================
      // SNAPSHOT PAYMENT METHOD
      // ==========================


      const paymentMethod =
        await this.getPaymentMethodById(
          payment_method_id,
          trx
        );



      if (!paymentMethod) {

        throw new Error(
          'Método de pago no encontrado'
        );

      }



      await this.createOrderPaymentMethod(
        trx,
        {

          order_id:
            order.id,

          brand:
            paymentMethod.brand,

          last4:
            paymentMethod.last4,

          exp_month:
            paymentMethod.exp_month,

          exp_year:
            paymentMethod.exp_year

        }
      );





      // ==========================
      // SNAPSHOT ADDRESS
      // ==========================


      const address =
        await trx('addresses')
          .where({

            id:
              shipping_address_id,

            user_id:
              userId

          })
          .first();




      if (!address) {

        throw new Error(
          'Dirección no encontrada'
        );

      }




      await trx('order_addresses')
        .insert({

          order_id:
            order.id,

          first_name:
            address.first_name,

          last_name:
            address.last_name,

          address:
            address.address,

          city:
            address.city,

          state:
            address.state,

          postal_code:
            address.postal_code,

          phone:
            address.phone

        });




      return order;


    });


  },




  // ==================================================
  // 🔥 CREATE ORDER
  // ==================================================

  async createOrder(trx, orderData) {

    const result =
      await trx('orders')
        .insert(orderData)
        .returning('*');


    return result[0];

  },




  // ==================================================
  // 🔥 CREATE ORDER ITEMS
  // ==================================================

  async createOrderItems(trx, items) {

    return trx('order_items')
      .insert(items);

  },




  // ==================================================
  // 🔥 CREATE PAYMENT SNAPSHOT
  // ==================================================

  async createOrderPaymentMethod(
    trx,
    paymentMethodData
  ) {

    const result =
      await trx('order_payment_methods')
        .insert(paymentMethodData)
        .returning('*');


    return result[0];

  },




  // ==================================================
  // 🔥 ORDERS
  // ==================================================

  async getUserOrders(userId) {

    return db('orders')
      .where({
        user_id: userId
      })
      .orderBy(
        'created_at',
        'desc'
      );

  },



  async getOrderById(
    userId,
    orderId
  ) {

    return db('orders')
      .where({

        id:
          orderId,

        user_id:
          userId

      })
      .first();

  },




  // ==================================================
  // 🔥 ORDER ITEMS
  // ==================================================

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
            FILTER (
              WHERE pi.image_url IS NOT NULL
            ),
            '[]'
          ) as images
        `)

      )

      .where({
        'oi.order_id':
          orderId
      })

      .groupBy(
        'oi.id'
      );

  },




  // ==================================================
  // 🔥 ADDRESS SNAPSHOT
  // ==================================================

  async getOrderAddress(orderId) {

    return db('order_addresses')
      .where({
        order_id:
          orderId
      })
      .first();

  },




  // ==================================================
  // 🔥 PAYMENT SNAPSHOT
  // ==================================================

  async getOrderPaymentMethod(orderId) {

    return db('order_payment_methods')
      .where({
        order_id:
          orderId
      })
      .first();

  },




  async getAddressById(addressId) {

    return db('addresses')
      .where({
        id:
          addressId
      })
      .first();

  },




  async getPaymentMethodById(
    paymentMethodId,
    trx = db
  ) {

    return trx('payment_methods')
      .where({
        id:
          paymentMethodId
      })
      .first();

  }


};


module.exports = OrderModel;