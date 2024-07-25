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

const getPharmacies = async (user_id) =>{
    const query = `
    SELECT *
    FROM pharmacies
    WHERE user_id = $1
    `;
    try{
        const { rows } = await pool.query(query, [user_id]);
        return rows;
    }catch(error){
        console.error('Error fetching pharmacies:', error.message);
        throw new Error('Error fetching pharmacies');
    }
}

const updatePharmacy = async (user_id, name, address, email, id) => {
    const query = `
    UPDATE pharmacies
    SET user_id = $1, name = $2, address = $3, email = $4
    WHERE pharmacy_id = $5
    RETURNING *
    `;  
    const values= [user_id, name, address, email, id]

    try{
        const { rows } = await pool.query(query, values);
        return rows[0];
    }catch(error){
        console.error('Error updating pharmacy:', error.message);
        throw new Error('Error updating pharmacy');
    }
}

const deletePharmacy = async (id) => {
    const query = `
    DELETE FROM pharmacies
    WHERE pharmacy_id = $1
    RETURNING pharmacy_id
    `;
    try{
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }catch(error){
        console.error('Error deleting pharmacy:', error.message);
        throw new Error('Error deleting pharmacy');
    }
}


module.exports = {
    createPharmacy,
    getPharmacies,
    updatePharmacy,
    deletePharmacy
}
