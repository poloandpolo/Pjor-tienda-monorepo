// models/addressModel.js

const db = require('../db/db');

// ==========================
// CREATE ADDRESS
// ==========================
const createAddress = async (
    userId,
    addressData
) => {

    try {

        const [id] = await db('addresses')
            .insert({
                user_id: userId,
                first_name: addressData.first_name,
                last_name: addressData.last_name,
                address: addressData.address,
                city: addressData.city,
                state: addressData.state,
                postal_code: addressData.postal_code,
                phone: addressData.phone,
            })
            .returning('id');

        return id;

    } catch (error) {

        throw error;

    }

};

// ==========================
// GET USER ADDRESSES
// ==========================
const getUserAddresses = async (
    userId
) => {

    try {

        const addresses = await db('addresses')
            .select(
                'id',
                'first_name',
                'last_name',
                'address',
                'city',
                'state',
                'postal_code',
                'phone'
            )
            .where({
                user_id: userId
            });

        return addresses;

    } catch (error) {

        throw error;

    }

};

// ==========================
// UPDATE ADDRESS
// ==========================
const updateAddress = async (
    addressId,
    userId,
    updates
) => {

    try {

        // Seguridad:
        // solo actualiza addresses
        // pertenecientes al usuario

        const updatedRows = await db('addresses')
            .where({
                id: addressId,
                user_id: userId
            })
            .update(updates)
            .returning([
                'id',
                'first_name',
                'last_name',
                'address',
                'city',
                'state',
                'postal_code',
                'phone'
            ]);

        return updatedRows[0];

    } catch (error) {

        throw error;

    }

};

module.exports = {
    createAddress,
    getUserAddresses,
    updateAddress
};