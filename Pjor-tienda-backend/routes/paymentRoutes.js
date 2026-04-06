const express = require('express');
const PaymentController = require('../controllers/paymentController');

const router = express.Router();

// Ruta para crear PaymentIntent
router.post('/create-payment-intent', PaymentController.createPaymentIntent);

// Ruta para consultar el estado de un pago
router.get('/payment-status/:id', PaymentController.getPaymentStatus);

router.post('/create-setup-intent', PaymentController.createSetupIntent);

router.post('/save-payment-method', PaymentController.savePaymentMethod);

module.exports = router;
