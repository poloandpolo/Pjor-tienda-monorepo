const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');


// Función para crear un nuevo usuario
const createUser = async (req, res) => {

  // Extraemos los datos enviados desde el frontend
  const { firstName, lastName, email, password } = req.body;

  try {

    // Verificamos si el email ya está registrado
    const existingUser = await userModel.getUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({
        message: 'El correo electrónico ya está registrado.'
      });
    }

    // Encriptamos la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Llamamos al modelo para crear el usuario en la base de datos
    const userId = await userModel.createUser({
      first_name: firstName,
      last_name: lastName,
      email,
      password: hashedPassword
    });

    return res.status(201).json({
      message: 'Usuario creado exitosamente',
      userId
    });

  } catch (error) {

    console.error('Error al crear el usuario:', error.message);

    return res.status(500).json({
      message: 'Error en el servidor.'
    });

  }

};



// Actualizar contraseña
const updatePassword = async (req, res) => {

  // Datos enviados desde Postman o frontend
  const { userId, password } = req.body;

  try {

    // Encriptamos la nueva contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Llamamos al modelo para actualizar la contraseña
    await userModel.updatePassword(userId, hashedPassword);

    return res.json({
      message: 'Contraseña actualizada correctamente'
    });

  } catch (error) {

    console.error('Error actualizando contraseña:', error.message);

    return res.status(500).json({
      message: 'Error actualizando contraseña'
    });

  }

};


// Exportamos las funciones para que puedan usarse en las rutas
module.exports = {
  createUser,
  updatePassword
};