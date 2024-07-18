const pool = require('../config/db');

const createMedicine = async (name, description, supplier_id, quantity, price, expiration_date) => {
  const result = await pool.query(
    'INSERT INTO medicines (name, description, supplier_id, quantity, price, expiration_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [name, description, supplier_id, quantity, price, expiration_date]
  );
  return result.rows[0];
};

const getMedicines = async () => {
  const result = await pool.query('SELECT * FROM medicines');
  return result.rows;
};

const getMedicineById = async (id) => {
  const result = await pool.query('SELECT * FROM medicines WHERE medicine_id = $1', [id]);
  return result.rows[0];
};

const updateMedicine = async (id, name, description, supplier_id, quantity, price, expiration_date) => {
  const result = await pool.query(
    'UPDATE medicines SET name = $1, description = $2, supplier_id = $3, quantity = $4, price = $5, expiration_date = $6 WHERE medicine_id = $7 RETURNING *',
    [name, description, supplier_id, quantity, price, expiration_date, id]
  );
  return result.rows[0];
};

const deleteMedicine = async (id) => {
  const result = await pool.query('DELETE FROM medicines WHERE medicine_id = $1 RETURNING *', [id]);
  return result.rows[0];
};
const getMedicinesWithSupplierDetails = async () => {
  const query = `
    SELECT m.medicine_id, m.name, m.description, m.supplier_id, m.quantity, m.price, m.expiration_date, m.created_at,
           json_build_object(
             'supplier_id', s.supplier_id,
             'name', s.name,
             'contact_name', s.contact_name,
             'contact_phone', s.contact_phone,
             'contact_email', s.contact_email,
             'address', s.address
           ) AS supplier_details
    FROM medicines m
    LEFT JOIN suppliers s ON m.supplier_id = s.supplier_id
  `;
  
  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    throw new Error('Error fetching medicines with supplier details:', error);
  }
};


module.exports = {
  createMedicine,
  getMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
  getMedicinesWithSupplierDetails
};
