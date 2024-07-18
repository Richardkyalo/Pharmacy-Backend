const pool = require('../config/db');

const addOrderItem = async (order_id, medicine_id, quantity, price) => {
  const query = `
    INSERT INTO order_items (order_id, medicine_id, quantity, price)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;

  const values = [order_id, medicine_id, quantity, price];

  try {
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    throw new Error('Error adding order item:', error);
  }
};

const getOrderItems = async () => {
  const query = `
    SELECT *
    FROM order_items
  `;

  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    throw new Error('Error fetching order items:', error);
  }
};

const getOrderItemById = async (id) => {
  const query = `
    SELECT *
    FROM order_items
    WHERE order_item_id = $1
  `;

  try {
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  } catch (error) {
    throw new Error('Error fetching order item by ID:', error);
  }
};

const updateOrderItem = async (id, order_id, medicine_id, quantity, price) => {
  const query = `
    UPDATE order_items
    SET order_id = $1,
        medicine_id = $2,
        quantity = $3,
        price = $4
    WHERE order_item_id = $5
    RETURNING *
  `;

  const values = [order_id, medicine_id, quantity, price, id];

  try {
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    throw new Error('Error updating order item:', error);
  }
};

const deleteOrderItem = async (id) => {
  const query = `
    DELETE FROM order_items
    WHERE order_item_id = $1
    RETURNING order_item_id
  `;

  try {
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  } catch (error) {
    throw new Error('Error deleting order item:', error);
  }
};

module.exports = {
  addOrderItem,
  getOrderItems,
  getOrderItemById,
  updateOrderItem,
  deleteOrderItem,
};
