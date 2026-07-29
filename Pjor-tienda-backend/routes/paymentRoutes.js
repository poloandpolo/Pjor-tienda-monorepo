const express = require('express');
const PaymentController = require('../controllers/paymentController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

// LEGACY
router.post('/create-payment-intent', PaymentController.createPaymentIntent);
router.get('/payment-status/:id', PaymentController.getPaymentStatus);

// Tarjetas guardadas
router.post('/create-setup-intent', verifyToken, PaymentController.createSetupIntent);
router.post('/save-payment-method', verifyToken, PaymentController.savePaymentMethod);
router.get('/payment-methods', verifyToken, PaymentController.getPaymentMethods);

// NUEVO CHECKOUT REAL
router.post('/checkout', verifyToken, PaymentController.checkout);

// Historial
router.get('/orders', verifyToken, PaymentController.getUserOrders);
router.get('/orders/:id', verifyToken, PaymentController.getOrderById);

router.delete('/payment-methods/:id', verifyToken, PaymentController.deletePaymentMethod);

module.exports = router;