const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// Ruta para crear un nuevo usuario
// Método HTTP: POST
// Endpoint final: /users
// Esta ruta llama a la función createUser del controlador
router.post('/', userController.createUser);


// Ruta para actualizar la contraseña del usuario
// Método HTTP: PUT (se usa para actualizar recursos existentes)
// Endpoint final: /users/password
// Esta ruta ejecuta la función updatePassword del controlador
router.put('/password', userController.updatePassword);


// Exportamos el router para poder usarlo en el archivo principal del servidor
// (normalmente server.js o app.js)
module.exports = router;