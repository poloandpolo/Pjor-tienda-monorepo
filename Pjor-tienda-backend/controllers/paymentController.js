const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const PaymentModel = require('../models/paymentModel');


class PaymentController {

  // ==================================================
  // 🔥 HELPER LOGS
  // ==================================================
  static logError(scope, error, extra = {}) {

    console.error(
      `\n================ ${scope} ERROR ================`
    );

    console.error(
      'Message:',
      error?.message || 'Sin mensaje'
    );

    console.error(
      'Code:',
      error?.code || 'N/A'
    );

    console.error(
      'Type:',
      error?.type || 'N/A'
    );


    if (error?.raw) {
      console.error(
        'Stripe Raw:',
        error.raw
      );
    }


    if (Object.keys(extra).length) {
      console.error(
        'Context:',
        extra
      );
    }


    if (error?.stack) {
      console.error(
        error.stack
      );
    }


    console.error(
      '===============================================\n'
    );
  }



  // ==================================================
  // 🔥 CREATE PAYMENT INTENT
  // ==================================================
  static async createPaymentIntent(req, res) {

    const {
      amount,
      currency,
      paymentMethodId
    } = req.body;


    const userId = req.userId;


    if (!amount || !currency) {

      return res.status(400).json({
        error:
          'Faltan parámetros necesarios',
      });

    }


    try {


      if (!userId) {

        const {
          clientSecret,
          paymentId
        } =
          await PaymentModel.createPaymentIntent(
            amount,
            currency
          );


        return res.status(200).json({
          clientSecret,
          paymentId,
        });

      }



      const user =
        await PaymentModel.getUserById(
          userId
        );



      if (
        !user ||
        !user.stripe_customer_id
      ) {

        return res.status(400).json({
          error:
            'Usuario sin customer en Stripe',
        });

      }



      const paymentIntent =
        await stripe.paymentIntents.create({

          amount,

          currency,

          customer:
            user.stripe_customer_id,

          payment_method:
            paymentMethodId,

          off_session:
            true,

          confirm:
            true,

        });



      await PaymentModel.createCheckoutPayment(
        null,
        {
          payment_intent_id:
            paymentIntent.id,

          amount,

          currency,

          status:
            paymentIntent.status,

          user_id:
            userId,
        }
      );



      return res.status(200).json({
        paymentIntent,
      });



    } catch (error) {


      PaymentController.logError(
        'CREATE PAYMENT INTENT',
        error,
        {
          userId,
          amount,
          currency,
          paymentMethodId,
        }
      );


      return res.status(500).json({
        error:
          error.message,
      });

    }

  }




  // ==================================================
  // 🔥 GET PAYMENT STATUS
  // ==================================================
  static async getPaymentStatus(req, res) {

    const {
      id
    } = req.params;


    try {


      const payment =
        await PaymentModel.findPaymentById(
          id
        );



      if (!payment) {

        return res.status(404).json({
          error:
            'Pago no encontrado',
        });

      }



      return res.status(200).json(
        payment
      );



    } catch (error) {


      PaymentController.logError(
        'GET PAYMENT STATUS',
        error,
        {
          id
        }
      );


      return res.status(500).json({
        error:
          error.message,
      });

    }

  }




  // ==================================================
  // 🔥 CREATE SETUP INTENT
  // ==================================================
  static async createSetupIntent(req, res) {

    const userId =
      req.userId;


    try {


      const user =
        await PaymentModel.getUserById(
          userId
        );



      if (!user) {

        return res.status(404).json({
          error:
            'Usuario no encontrado',
        });

      }



      let stripeCustomerId =
        user.stripe_customer_id;



      if (!stripeCustomerId) {


        const customer =
          await stripe.customers.create({

            email:
              user.email,

          });



        stripeCustomerId =
          customer.id;



        await PaymentModel.updateStripeCustomer(
          userId,
          stripeCustomerId
        );

      }



      const setupIntent =
        await stripe.setupIntents.create({

          customer:
            stripeCustomerId,

        });



      return res.json({

        clientSecret:
          setupIntent.client_secret,

      });



    } catch (error) {


      PaymentController.logError(
        'CREATE SETUP INTENT',
        error,
        {
          userId
        }
      );



      return res.status(500).json({
        error:
          error.message,
      });

    }

  }




  // ==================================================
  // 🔥 SAVE PAYMENT METHOD
  // ==================================================
  static async savePaymentMethod(req, res) {


    const userId =
      req.userId;


    const {
      paymentMethodId
    } = req.body;



    if (!paymentMethodId) {

      return res.status(400).json({
        error:
          'paymentMethodId requerido',
      });

    }



    try {


      const paymentMethod =
        await PaymentModel.savePaymentMethod(
          userId,
          paymentMethodId
        );



      return res.json(
        paymentMethod
      );



    } catch (error) {


      if (
        error.code ===
        'PAYMENT_METHOD_EXISTS'
      ) {

        return res.status(409).json({
          error:
            error.code,
        });

      }



      PaymentController.logError(
        'SAVE PAYMENT METHOD',
        error,
        {
          userId,
          paymentMethodId,
        }
      );



      return res.status(500).json({
        error:
          error.message,
      });

    }

  }

  // ==================================================
  // 🔥 GET PAYMENT METHODS
  // ==================================================
  static async getPaymentMethods(req, res) {

    const userId =
      req.userId;


    try {

      const paymentMethods =
        await PaymentModel.getPaymentMethods(
          userId
        );


      return res.json(
        paymentMethods
      );


    } catch (error) {


      PaymentController.logError(
        'GET PAYMENT METHODS',
        error,
        {
          userId
        }
      );


      return res.status(500).json({
        error:
          error.message,
      });

    }

  }




  // ==================================================
  // 🔥 CHECKOUT
  // ==================================================
  static async checkout(req, res) {


    const userId =
      req.userId;



    const {
      shippingAddressId,
      paymentMethodId,
      cartItems,
    } = req.body;




    if (
      !shippingAddressId ||
      !paymentMethodId ||
      !cartItems?.length
    ) {

      return res.status(400).json({

        error:
          'Datos incompletos para checkout',

      });

    }



    let trx = null;



    try {


      trx =
        await PaymentModel.startTransaction();



      const user =
        await PaymentModel.getUserById(
          userId
        );



      if (
        !user ||
        !user.stripe_customer_id
      ) {


        await trx.rollback();


        return res.status(400).json({

          error:
            'Usuario sin customer en Stripe',

        });

      }




      const savedMethod =
        await PaymentModel.getUserPaymentMethod(
          userId,
          paymentMethodId
        );



      if (!savedMethod) {


        await trx.rollback();


        return res.status(404).json({

          error:
            'Método de pago no encontrado',

        });

      }




      const productIds =
        cartItems.map(
          item => item.id
        );



      const products =
        await PaymentModel.getProductsByIds(
          productIds
        );



      if (!products.length) {


        await trx.rollback();


        return res.status(400).json({

          error:
            'Productos inválidos',

        });

      }




      let subtotal = 0;



      const itemsPrepared =
        cartItems.map(item => {


          const product =
            products.find(
              p =>
                p.id === item.id
            );



          if (!product) {

            throw new Error(
              `Producto ${item.id} no encontrado`
            );

          }



          const unitPrice =
            Number(
              product.price
            );


          const quantity =
            Number(
              item.quantity
            );



          subtotal +=
            unitPrice * quantity;



          return {

            product_id:
              product.id,

            name:
              product.name,

            price:
              unitPrice,

            quantity,

            size:
              item.size || null,

            color:
              item.color || null,

          };


        });



      const shippingCost = 0;
      const taxes = 0;


      const total =
        subtotal +
        shippingCost +
        taxes;




      const order =
        await PaymentModel.createOrder(
          trx,
          {

            user_id:
              userId,

            shipping_address_id:
              shippingAddressId,

            payment_method_id:
              paymentMethodId,

            status:
              'pending',

            subtotal,

            shipping_cost:
              shippingCost,

            taxes,

            total_amount:
              total,

            currency:
              'mxn',

          }
        );





      const orderItems =
        itemsPrepared.map(
          item => ({

            order_id:
              order.id,

            ...item,

          })
        );



      await PaymentModel.createOrderItems(
        trx,
        orderItems
      );





      await PaymentModel.createOrderPaymentMethod(
        trx,
        {

          order_id:
            order.id,

          brand:
            savedMethod.brand,

          last4:
            savedMethod.last4,

          exp_month:
            savedMethod.exp_month,

          exp_year:
            savedMethod.exp_year,

        }
      );





      await PaymentModel.createOrderAddress(
        trx,
        order.id,
        shippingAddressId,
        userId
      );






      const paymentIntent =
        await stripe.paymentIntents.create({

          amount:
            Math.round(
              total * 100
            ),

          currency:
            'mxn',

          customer:
            user.stripe_customer_id,

          payment_method:
            savedMethod.stripe_payment_method_id,

          off_session:
            true,

          confirm:
            true,

        });






      await PaymentModel.createCheckoutPayment(
        trx,
        {

          payment_intent_id:
            paymentIntent.id,

          amount:
            total,

          currency:
            'mxn',

          user_id:
            userId,

          order_id:
            order.id,

          payment_method_id:
            paymentMethodId,

          status:
            paymentIntent.status,

        }
      );





      if (
        paymentIntent.status ===
        'succeeded'
      ) {


        await PaymentModel.updateOrderStatus(
          trx,
          order.id,
          'paid'
        );


      }





      await trx.commit();





      return res.status(200).json({

        success:
          true,

        orderId:
          order.id,

        paymentIntentId:
          paymentIntent.id,

        status:
          paymentIntent.status,

      });





    } catch (error) {


      if (trx) {

        try {

          await trx.rollback();

        } catch (_) { }

      }




      PaymentController.logError(
        'CHECKOUT',
        error,
        {

          userId,

          shippingAddressId,

          paymentMethodId,

          cartItems,

        }
      );




      return res.status(500).json({

        error:
          error.message,

      });


    }

  }





  // ==================================================
  // 🔥 ÓRDENES
  // ==================================================
  static async getUserOrders(req, res) {

    const userId =
      req.userId;


    try {


      const orders =
        await PaymentModel.getUserOrders(
          userId
        );



      return res.json(
        orders
      );



    } catch (error) {


      PaymentController.logError(
        'GET USER ORDERS',
        error,
        {
          userId
        }
      );



      return res.status(500).json({

        error:
          error.message,

      });

    }

  }





  static async getOrderById(req, res) {


    const userId =
      req.userId;


    const {
      id
    } = req.params;



    try {


      const order =
        await PaymentModel.getOrderById(
          userId,
          id
        );



      if (!order) {

        return res.status(404).json({

          error:
            'Orden no encontrada',

        });

      }



      return res.json(
        order
      );



    } catch (error) {


      PaymentController.logError(
        'GET ORDER BY ID',
        error,
        {
          userId,
          id
        }
      );



      return res.status(500).json({

        error:
          error.message,

      });

    }

  }





  // ==================================================
  // 🔥 DELETE PAYMENT METHOD
  // ==================================================
  static async deletePaymentMethod(req, res) {


    const userId =
      req.userId;


    const {
      id
    } = req.params;



    try {


      await PaymentModel.deletePaymentMethod(
        userId,
        id
      );



      return res.status(200).json({

        success:
          true,

      });



    } catch (error) {



      if (
        error.code ===
        'PAYMENT_METHOD_NOT_FOUND'
      ) {

        return res.status(404).json({

          error:
            error.message,

        });

      }



      PaymentController.logError(
        'DELETE PAYMENT METHOD',
        error,
        {
          userId,
          paymentMethodId: id
        }
      );



      return res.status(500).json({

        error:
          error.message,

      });


    }

  }

}



module.exports = PaymentController;