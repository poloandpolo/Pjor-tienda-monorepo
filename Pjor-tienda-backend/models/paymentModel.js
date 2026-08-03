const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const db = require('../db/db');


class PaymentModel {


  // ==================================================
  // 🔥 TRANSACTION
  // ==================================================

  static async startTransaction() {
    return await db.transaction();
  }




  // ==================================================
  // 🔥 USER
  // ==================================================

  static async getUserById(userId) {

    return await db('users')
      .where({
        id: userId
      })
      .first();

  }



  static async updateStripeCustomer(
    userId,
    stripeCustomerId
  ) {

    return await db('users')
      .where({
        id:userId
      })
      .update({

        stripe_customer_id:
          stripeCustomerId

      });

  }





  // ==================================================
  // 🔥 PAYMENT INTENT EXISTENTE
  // ==================================================

  static async createPaymentIntent(
    amount,
    currency
  ) {

    try {

      const paymentIntent =
        await stripe.paymentIntents.create({

          amount,
          currency,

        });



      const [payment] =
        await db('payments')
          .insert({

            payment_intent_id:
              paymentIntent.id,

            amount,

            currency,

            status:
              paymentIntent.status,

          })
          .returning('*');



      return {

        clientSecret:
          paymentIntent.client_secret,

        paymentId:
          payment.id,

      };


    } catch(error) {

      throw new Error(
        `Error al crear PaymentIntent: ${error.message}`
      );

    }

  }




  static async findPaymentById(id) {

    return await db('payments')
      .where({
        id
      })
      .first();

  }







  // ==================================================
  // 🔥 PAYMENT METHODS
  // ==================================================

  static async getPaymentMethods(userId) {

    return await db('payment_methods')
      .where({
        user_id:userId
      })
      .orderBy(
        'created_at',
        'desc'
      );

  }





  static async getUserPaymentMethod(
    userId,
    paymentMethodId
  ) {

    return await db('payment_methods')
      .where({

        id:
          paymentMethodId,

        user_id:
          userId,

      })
      .first();

  }





  static async savePaymentMethod(
    userId,
    paymentMethodId
  ) {

    try {


      const user =
        await this.getUserById(
          userId
        );



      if (
        !user ||
        !user.stripe_customer_id
      ) {

        throw new Error(
          'Usuario sin customer en Stripe'
        );

      }



      const customerId =
        user.stripe_customer_id;



      let paymentMethod =
        await stripe.paymentMethods.retrieve(
          paymentMethodId
        );



      if (!paymentMethod.card) {

        throw new Error(
          'El método de pago no es una tarjeta válida'
        );

      }




      if (!paymentMethod.customer) {

        paymentMethod =
          await stripe.paymentMethods.attach(
            paymentMethodId,
            {
              customer:
                customerId
            }
          );

      }




      if (
        paymentMethod.customer !== customerId
      ) {

        throw new Error(
          'El método de pago no pertenece al usuario'
        );

      }





      const fingerprint =
        paymentMethod.card.fingerprint;



      const existing =
        await db('payment_methods')
          .where({

            user_id:
              userId,

            fingerprint

          })
          .first();




      if(existing) {

        const error =
          new Error(
            'Payment method already exists'
          );

        error.code =
          'PAYMENT_METHOD_EXISTS';

        throw error;

      }




      const [
        newPaymentMethod
      ] =
      await db('payment_methods')
        .insert({

          user_id:
            userId,

          stripe_payment_method_id:
            paymentMethod.id,

          stripe_customer_id:
            customerId,

          fingerprint,

          brand:
            paymentMethod.card.brand,

          last4:
            paymentMethod.card.last4,

          exp_month:
            paymentMethod.card.exp_month,

          exp_year:
            paymentMethod.card.exp_year,

        })
        .returning('*');



      return newPaymentMethod;



    } catch(error) {


      if(error.code === '23505') {

        const err =
          new Error(
            'Payment method already exists'
          );

        err.code =
          'PAYMENT_METHOD_EXISTS';

        throw err;

      }


      throw error;

    }

  }








  // ==================================================
  // 🔥 ORDERS
  // ==================================================

  static async createOrder(
    trx,
    orderData
  ) {


    const [
      order
    ] =
    await trx('orders')
      .insert(orderData)
      .returning('*');



    return order;

  }





  static async createOrderItems(
    trx,
    items
  ) {


    return await trx('order_items')
      .insert(items)
      .returning('*');

  }






  static async createOrderPaymentMethod(
    trx,
    data
  ) {


    return await trx('order_payment_methods')
      .insert(data);

  }







  static async createOrderAddress(
    trx,
    orderId,
    addressId,
    userId
  ) {


    const address =
      await trx('addresses')
        .where({

          id:
            addressId,

          user_id:
            userId

        })
        .first();



    if(!address) {

      throw new Error(
        'Dirección no encontrada'
      );

    }





    return await trx('order_addresses')
      .insert({

        order_id:
          orderId,

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
          address.phone,

      });


  }







  static async createCheckoutPayment(
    trx,
    paymentData
  ) {


    const [
      payment
    ] =
    await trx('payments')
      .insert(paymentData)
      .returning('*');


    return payment;

  }







  static async updateOrderStatus(
    trx,
    orderId,
    status
  ) {


    return await trx('orders')
      .where({
        id:
          orderId
      })
      .update({

        status,

        updated_at:
          db.fn.now()

      });


  }







  static async getUserOrders(userId) {


    return await db('orders')
      .where({

        user_id:
          userId

      })
      .orderBy(
        'created_at',
        'desc'
      );


  }






  static async getOrderById(
    userId,
    orderId
  ) {


    const order =
      await db('orders')
        .where({

          id:
            orderId,

          user_id:
            userId

        })
        .first();




    if(!order) {
      return null;
    }




    const items =
      await db('order_items as oi')
        .leftJoin(
          'product_images as pi',
          'oi.product_id',
          'pi.product_id'
        )
        .select(
          'oi.*',
          'pi.image_url as image'
        )
        .where({

          'oi.order_id':
            orderId

        });





    const address =
      await db('order_addresses')
        .where({

          order_id:
            orderId

        })
        .first();





    const payment_method =
      await db('order_payment_methods')
        .where({

          order_id:
            orderId

        })
        .first();






    return {

      ...order,

      items,

      address,

      payment_method

    };


  }







  static async getProductsByIds(
    productIds
  ) {


    return await db('products')
      .whereIn(
        'id',
        productIds
      )
      .where({
        active:true
      });


  }








  // ==================================================
  // 🔥 DELETE PAYMENT METHOD
  // ==================================================

  static async deletePaymentMethod(
    userId,
    paymentMethodId
  ) {


    const paymentMethod =
      await db('payment_methods')
        .where({

          id:
            paymentMethodId,

          user_id:
            userId

        })
        .first();




    if(!paymentMethod) {

      const error =
        new Error(
          'Método de pago no encontrado'
        );

      error.code =
        'PAYMENT_METHOD_NOT_FOUND';

      throw error;

    }




    await stripe.paymentMethods.detach(
      paymentMethod.stripe_payment_method_id
    );




    await db('payment_methods')
      .where({

        id:
          paymentMethodId,

        user_id:
          userId

      })
      .del();



    return true;

  }


}



module.exports = PaymentModel;