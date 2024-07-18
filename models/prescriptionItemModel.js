const pool = require('../config/db');

// Create Prescription Item
const createPrescriptionItem = async (prescription_id, medicine_id, dosage, quantity) => {
    const query = `
        INSERT INTO prescription_items (prescription_id, medicine_id, dosage, quantity)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;
    const values = [prescription_id, medicine_id, dosage, quantity];
    const result = await pool.query(query, values);
    return result.rows[0];
};

// Get all prescription items
const getPrescriptionItems = async () => {
    const query = 'SELECT * FROM prescription_items';
    const result = await pool.query(query);
    return result.rows;
};

// Get prescription item by ID
const getPrescriptionItemById = async (id) => {
    const query = 'SELECT * FROM prescription_items WHERE prescription_item_id = $1';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
};

// Update prescription item
const updatePrescriptionItem = async (id, prescription_id, medicine_id, dosage, quantity) => {
    const query = `
        UPDATE prescription_items
        SET prescription_id = $1, medicine_id = $2, dosage = $3, quantity = $4
        WHERE prescription_item_id = $5
        RETURNING *
    `;
    const values = [prescription_id, medicine_id, dosage, quantity, id];
    const result = await pool.query(query, values);
    return result.rows[0];
};

// Delete prescription item
const deletePrescriptionItem = async (id) => {
    const query = 'DELETE FROM prescription_items WHERE prescription_item_id = $1 RETURNING *';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
};

module.exports = {
    createPrescriptionItem,
    getPrescriptionItems,
    getPrescriptionItemById,
    updatePrescriptionItem,
    deletePrescriptionItem
};
