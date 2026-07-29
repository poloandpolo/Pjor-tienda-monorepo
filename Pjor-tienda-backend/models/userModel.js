// Importamos la conexión a la base de datos (Knex)
const db = require('../db/db');


// ==============================
// Obtener usuario por email
// ==============================
const getUserByEmail = async (email) => {
  try {

    const user = await db('users')
      .where({ email })
      .first();

    return user;

  } catch (error) {

    throw error;

  }
};


// ==============================
// Obtener usuario por ID
// ==============================
const getUserById = async (userId) => {
  try {

    const user = await db('users')
      .where({ id: userId })
      .first();

    return user;

  } catch (error) {

    throw error;

  }
};


// ==============================
// Crear usuario
// ==============================
const createUser = async (userData) => {
  try {

    const [id] = await db('users')
      .insert(userData)
      .returning('id');

    return id;

  } catch (error) {

    throw error;

  }
};


// ==============================
// Actualizar usuario
// ==============================
const updateUser = async (userId, updatedData) => {
  try {

    await db('users')
      .where({ id: userId })
      .update(updatedData);

  } catch (error) {

    throw error;

  }
};


// ==============================
// Exportaciones
// ==============================
module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  updateUser
};