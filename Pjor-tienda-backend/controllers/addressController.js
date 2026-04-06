// controllers/addressController.js
const addressModel = require('../models/addressModel');

const createAddress = async (req, res) => {
  const { first_name, last_name, address, city, state, postal_code, phone } = req.body;

  if (!first_name || !last_name || !address || !city || !state || !postal_code) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  try {
    if (!req.userId) {
      return res.status(400).json({ message: 'El userId no fue proporcionado correctamente' });
    }

    const addressData = { first_name, last_name, address, city, state, postal_code, phone };
    const newAddressId = await addressModel.createAddress(req.userId, addressData);

    return res.status(201).json({
      message: 'Dirección creada exitosamente',
      addressId: newAddressId,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUserAddresses = async (req, res) => {
  try {
    const addresses = await addressModel.getUserAddresses(req.userId);
    return res.status(200).json({ addresses });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAddress,
  getUserAddresses, // Asegúrate de exportar correctamente las funciones
};
