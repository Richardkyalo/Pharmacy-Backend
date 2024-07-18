const pool = require('../config/db');

// Create Prescription
const createPrescription = async (customer_id, doctor_name, date_issued) => {
    const query = `
        INSERT INTO prescriptions (customer_id, doctor_name, date_issued)
        VALUES ($1, $2, $3)
        RETURNING *
    `;
    const values = [customer_id, doctor_name, date_issued];
    const result = await pool.query(query, values);
    return result.rows[0];
};

// Get all prescriptions
const getPrescriptions = async () => {
    const query = 'SELECT * FROM prescriptions';
    const result = await pool.query(query);
    return result.rows;
};

// Get prescription by ID
const getPrescriptionById = async (id) => {
    const query = 'SELECT * FROM prescriptions WHERE prescription_id = $1';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
};

// Update prescription
const updatePrescription = async (id, customer_id, doctor_name, date_issued) => {
    const query = `
        UPDATE prescriptions
        SET customer_id = $1, doctor_name = $2, date_issued = $3
        WHERE prescription_id = $4
        RETURNING *
    `;
    const values = [customer_id, doctor_name, date_issued, id];
    const result = await pool.query(query, values);
    return result.rows[0];
};

// Delete prescription
const deletePrescription = async (id) => {
    const query = 'DELETE FROM prescriptions WHERE prescription_id = $1 RETURNING *';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
};

module.exports = {
    createPrescription,
    getPrescriptions,
    getPrescriptionById,
    updatePrescription,
    deletePrescription
};
