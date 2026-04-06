// routes/addressRoutes.js
const express = require('express');
const addressController = require('../controllers/addressController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

// Ruta para crear una dirección
router.post('/addresses', verifyToken, addressController.createAddress);

// Ruta para obtener las direcciones de un usuario
router.get('/addresses', verifyToken, addressController.getUserAddresses);  // Asegúrate que la función `getUserAddresses` esté exportada correctamente

module.exports = router;
