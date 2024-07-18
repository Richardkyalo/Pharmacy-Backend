// customerModel.js

const pool = require('../config/db');

const createCustomer = async (first_name, last_name, phone, email, address) => {
  const query = `
    INSERT INTO customers (first_name, last_name, phone, email, address)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;

  const values = [first_name, last_name, phone, email, address];

  try {
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    throw new Error('Error creating customer:', error);
  }
};

const getCustomers = async () => {
  const query = `
    SELECT *
    FROM customers
  `;

  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    throw new Error('Error fetching customers:', error);
  }
};

const getCustomerById = async (id) => {
  const query = `
    SELECT *
    FROM customers
    WHERE customer_id = $1
  `;

  try {
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  } catch (error) {
    throw new Error('Error fetching customer by ID:', error);
  }
};

const updateCustomer = async (id, first_name, last_name, phone, email, address) => {
  const query = `
    UPDATE customers
    SET first_name = $1,
        last_name = $2,
        phone = $3,
        email = $4,
        address = $5
    WHERE customer_id = $6
    RETURNING *
  `;

  const values = [first_name, last_name, phone, email, address, id];

  try {
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    throw new Error('Error updating customer:', error);
  }
};

const deleteCustomer = async (id) => {
  const query = `
    DELETE FROM customers
    WHERE customer_id = $1
    RETURNING customer_id
  `;

  try {
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  } catch (error) {
    throw new Error('Error deleting customer:', error);
  }
};

module.exports = {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
