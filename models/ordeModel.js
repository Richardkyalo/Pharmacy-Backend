// orderModel.js

const pool = require('../config/db');

const createOrder = async (customer_id, total_amount) => {
  const query = `
    INSERT INTO orders (customer_id, total_amount)
    VALUES ($1, $2)
    RETURNING *
  `;

  const values = [customer_id, total_amount];

  try {
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    throw new Error('Error creating order:', error);
  }
};

const getOrders = async () => {
  const query = `
    SELECT *
    FROM orders
  `;

  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    throw new Error('Error fetching orders:', error);
  }
};

const getOrderById = async (id) => {
  const query = `
    SELECT *
    FROM orders
    WHERE order_id = $1
  `;

  try {
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  } catch (error) {
    throw new Error('Error fetching order by ID:', error);
  }
};

const updateOrder = async (id, customer_id, total_amount) => {
  const query = `
    UPDATE orders
    SET customer_id = $1,
        total_amount = $2
    WHERE order_id = $3
    RETURNING *
  `;

  const values = [customer_id, total_amount, id];

  try {
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    throw new Error('Error updating order:', error);
  }
};

const deleteOrder = async (id) => {
  const query = `
    DELETE FROM orders
    WHERE order_id = $1
    RETURNING order_id
  `;

  try {
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  } catch (error) {
    throw new Error('Error deleting order:', error);
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
