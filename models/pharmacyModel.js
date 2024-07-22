const pool = require('../config/db');

const createPharmacy = async (user_id, name, address, email) => {
    const query = `
    INSERT INTO pharmacies (user_id, name, address, email)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `;

    const values = [user_id, name, address, email];

    try {
        const { rows } = await pool.query(query, values);
        return rows[0];
    } catch (error) {
        console.error('Error creating pharmacy:', error.message);
        throw new Error('Error creating pharmacy');
    }   
};

module.exports = {
    createPharmacy
}
