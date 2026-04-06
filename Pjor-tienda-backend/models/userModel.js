// Importamos la conexión a la base de datos (Knex)
const db = require('../db/db');


// Función para verificar si el correo ya está registrado
const getUserByEmail = async (email) => {
  try {

    // Buscamos un usuario con ese email
    const user = await db('users')
      .where({ email })
      .first();

    // Devuelve el usuario si existe o undefined si no existe
    return user;

  } catch (error) {

    throw error;

  }
};


// Función para crear un nuevo usuario
const createUser = async (userData) => {
  try {

    // Insertamos el nuevo usuario
    const [id] = await db('users')
      .insert(userData)
      .returning('id');

    // Devolvemos el ID generado
    return id;

  } catch (error) {

    throw error;

  }
};


// NUEVA FUNCIÓN: actualizar contraseña
const updatePassword = async (userId, hashedPassword) => {
  try {

    // Actualizamos la contraseña del usuario
    await db('users')
      .where({ id: userId })
      .update({
        password: hashedPassword
      });

  } catch (error) {

    throw error;

  }
};


// Exportamos todas las funciones del modelo
module.exports = {
  createUser,
  getUserByEmail,
  updatePassword
};