const express = require('express');
const router = express.Router();

const ProductsController = require('../controllers/productsController');

// Obtener todos los productos
router.get('/', ProductsController.getProducts);

// Obtener producto por id
router.get('/:id', ProductsController.getProductById);

module.exports = router;