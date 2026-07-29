const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Clave secreta para JWT
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// ==============================
// Crear usuario
// ==============================
const createUser = async (req, res) => {

  const { firstName, lastName, email, password } = req.body;

  try {

    const existingUser = await userModel.getUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({
        message: 'El correo electrónico ya está registrado.'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

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

    console.error('🔥 ERROR COMPLETO:', error);

    return res.status(500).json({
      message: 'Error en el servidor.'
    });

  }

};


// ==============================
// Actualizar usuario
// ==============================
const updateUser = async (req, res) => {

  const {
    userId,
    firstName,
    lastName,
    email,
    password
  } = req.body;

  try {

    // Verificar si el email ya existe
    if (email) {

      const existingUser = await userModel.getUserByEmail(email);

      if (
        existingUser &&
        existingUser.id !== Number(userId)
      ) {
        return res.status(400).json({
          message: 'El correo electrónico ya está registrado.'
        });
      }

    }

    // Construir objeto de actualización
    const updatedData = {};

    if (firstName !== undefined) {
      updatedData.first_name = firstName;
    }

    if (lastName !== undefined) {
      updatedData.last_name = lastName;
    }

    if (email !== undefined) {
      updatedData.email = email;
    }

    if (password !== undefined) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    if (Object.keys(updatedData).length === 0) {
      return res.status(400).json({
        message: 'No se enviaron datos para actualizar.'
      });
    }

    // Actualizar usuario
    await userModel.updateUser(userId, updatedData);

    // Obtener usuario actualizado
    const updatedUser = await userModel.getUserById(userId);

    // Generar nuevo JWT
    const token = jwt.sign(
      {
        id: updatedUser.id,
        email: updatedUser.email,
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name
      },
      JWT_SECRET,
      {
        expiresIn: '1h'
      }
    );

    return res.status(200).json({
      message: 'Usuario actualizado correctamente.',
      token
    });

  } catch (error) {

    console.error('Error actualizando usuario:', error);

    return res.status(500).json({
      message: 'Error actualizando usuario.'
    });

  }

};


// ==============================
// Actualizar contraseña
// ==============================
const updatePassword = async (req, res) => {

  const { userId, password } = req.body;

  try {

    const hashedPassword = await bcrypt.hash(password, 10);

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


// ==============================
// Exportaciones
// ==============================
module.exports = {
  createUser,
  updatePassword,
  updateUser
};