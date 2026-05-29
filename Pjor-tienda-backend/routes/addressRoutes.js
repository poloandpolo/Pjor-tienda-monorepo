// routes/addressRoutes.js

const express = require('express');
const addressController = require('../controllers/addressController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

// Crear dirección
router.post(
    '/addresses',
    verifyToken,
    addressController.createAddress
);

// Obtener direcciones del usuario
router.get(
    '/addresses',
    verifyToken,
    addressController.getUserAddresses
);

// Actualizar dirección
router.put(
    '/addresses/:id',
    verifyToken,
    addressController.updateAddress
);

router.delete(
    '/addresses/:id',
    verifyToken,
    addressController.deleteAddress
);

module.exports = router;