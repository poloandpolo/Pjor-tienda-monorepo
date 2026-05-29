// controllers/addressController.js

const addressModel = require('../models/addressModel');

// ==========================
// CREATE ADDRESS
// ==========================
const createAddress = async (req, res) => {

    const {
        first_name,
        last_name,
        address,
        city,
        state,
        postal_code,
        phone
    } = req.body;

    if (
        !first_name ||
        !last_name ||
        !address ||
        !city ||
        !state ||
        !postal_code
    ) {
        return res.status(400).json({
            message: 'Todos los campos son requeridos'
        });
    }

    try {

        if (!req.userId) {
            return res.status(400).json({
                message: 'El userId no fue proporcionado correctamente'
            });
        }

        const addressData = {
            first_name,
            last_name,
            address,
            city,
            state,
            postal_code,
            phone
        };

        const newAddressId =
            await addressModel.createAddress(
                req.userId,
                addressData
            );

        return res.status(201).json({
            message: 'Dirección creada exitosamente',
            addressId: newAddressId,
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

};

// ==========================
// GET USER ADDRESSES
// ==========================
const getUserAddresses = async (req, res) => {

    try {

        const addresses =
            await addressModel.getUserAddresses(
                req.userId
            );

        return res.status(200).json({
            addresses
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

};

// ==========================
// UPDATE ADDRESS
// ==========================
const updateAddress = async (req, res) => {

    try {

        const { id } = req.params;

        const updates = req.body;

        // Validar que haya campos
        if (
            !updates ||
            Object.keys(updates).length === 0
        ) {
            return res.status(400).json({
                message: 'No hay campos para actualizar'
            });
        }

        const updatedAddress =
            await addressModel.updateAddress(
                id,
                req.userId,
                updates
            );

        if (!updatedAddress) {
            return res.status(404).json({
                message: 'Dirección no encontrada'
            });
        }

        return res.status(200).json({
            message: 'Dirección actualizada',
            address: updatedAddress
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: error.message
        });

    }

};

const deleteAddress = async (req, res) => {

    try {

        const { id } = req.params;

        const deleted =
            await addressModel.softDeleteAddress(
                id,
                req.userId
            );

        if (!deleted) {

            return res.status(404).json({
                message: 'Dirección no encontrada'
            });

        }

        return res.status(200).json({
            message: 'Dirección eliminada'
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    createAddress,
    getUserAddresses,
    updateAddress,
    deleteAddress
};