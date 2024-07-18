const pool = require('../config/db');

const createSupplier = async (name, contact_name, contact_phone, contact_email, address) => {
  const result = await pool.query(
    'INSERT INTO suppliers (name, contact_name, contact_phone, contact_email, address) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [name, contact_name, contact_phone, contact_email, address]
  );
  return result.rows[0];
};

const getSuppliers = async () => {
  const result = await pool.query('SELECT * FROM suppliers');
  return result.rows;
};

const getSupplierById = async (id) => {
  const result = await pool.query('SELECT * FROM suppliers WHERE supplier_id = $1', [id]);
  return result.rows[0];
};

const updateSupplier = async (id, name, contact_name, contact_phone, contact_email, address) => {
  const result = await pool.query(
    'UPDATE suppliers SET name = $1, contact_name = $2, contact_phone = $3, contact_email = $4, address = $5 WHERE supplier_id = $6 RETURNING *',
    [name, contact_name, contact_phone, contact_email, address, id]
  );
  return result.rows[0];
};

const deleteSupplier = async (id) => {
  const result = await pool.query('DELETE FROM suppliers WHERE supplier_id = $1 RETURNING *', [id]);
  return result.rows[0];
};

module.exports = {
  createSupplier,
  getSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
};
