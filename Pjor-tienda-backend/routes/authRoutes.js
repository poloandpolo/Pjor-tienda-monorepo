const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Ruta para autenticar usuarios
router.post('/login', authController.loginUser);

module.exports = router;
