const express = require('express');
const PaymentController = require('../controllers/paymentController');
const verifyToken = require('../middlewares/verifyToken'); // 🔥 IMPORTANTE

const router = express.Router();

// Crear PaymentIntent
router.post('/create-payment-intent', PaymentController.createPaymentIntent);

// Estado de pago
router.get('/payment-status/:id', PaymentController.getPaymentStatus);

// SetupIntent
router.post('/create-setup-intent', verifyToken, PaymentController.createSetupIntent);

// Guardar método de pago
router.post('/save-payment-method', verifyToken, PaymentController.savePaymentMethod);

router.get('/payment-methods', verifyToken, PaymentController.getPaymentMethods);

module.exports = router;