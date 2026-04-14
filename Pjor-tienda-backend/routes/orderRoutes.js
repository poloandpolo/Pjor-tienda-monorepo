const express = require('express');
const router = express.Router();

const OrderController = require('../controllers/orderController');
const verifyToken = require('../middlewares/verifyToken');

// 🔥 Crear orden completa (checkout)
router.post('/', verifyToken, OrderController.createOrder);

// 🔥 Obtener órdenes del usuario
router.get('/', verifyToken, OrderController.getUserOrders);

// 🔥 Obtener detalle de una orden
router.get('/:id', verifyToken, OrderController.getOrderById);

module.exports = router;