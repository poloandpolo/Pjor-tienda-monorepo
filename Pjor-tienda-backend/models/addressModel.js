// models/addressModel.js
const db = require('../db/db');

const createAddress = async (userId, addressData) => {
  try {
    // Insertamos la nueva dirección en la base de datos
    const [id] = await db('addresses').insert({
      user_id: userId,  // Debe usarse el userId obtenido del token
      first_name: addressData.first_name,
      last_name: addressData.last_name,
      address: addressData.address,
      city: addressData.city,
      state: addressData.state,
      postal_code: addressData.postal_code,
      phone: addressData.phone,
    }).returning('id');

    return id; // Devuelve el ID de la nueva dirección
  } catch (error) {
    throw error; // Propagamos el error si ocurre un fallo en la inserción
  }
};

const getUserAddresses = async (userId) => {
  try {
    // Obtenemos las direcciones asociadas al userId desde la base de datos
    const addresses = await db('addresses')
      .select('id', 'first_name', 'last_name', 'address', 'city', 'state', 'postal_code', 'phone')
      .where({ user_id: userId });

    return addresses; // Devolvemos la lista de direcciones
  } catch (error) {
    throw error; // Propagamos el error si ocurre un fallo en la consulta
  }
};

module.exports = { 
  createAddress, 
  getUserAddresses 
};
