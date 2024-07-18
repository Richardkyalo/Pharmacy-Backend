const orderItemModel = require('../models/orderItemModel');

const addOrderItem = async (req, res) => {
  const { order_id, medicine_id, quantity, price } = req.body;

  try {
    const newOrderItem = await orderItemModel.addOrderItem(order_id, medicine_id, quantity, price);
    res.status(201).json(newOrderItem);
  } catch (err) {
    console.error('Error adding order item:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getOrderItems = async (req, res) => {
  try {
    const orderItems = await orderItemModel.getOrderItems();
    res.status(200).json(orderItems);
  } catch (err) {
    console.error('Error fetching order items:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getOrderItemById = async (req, res) => {
  const { id } = req.params;

  try {
    const orderItem = await orderItemModel.getOrderItemById(id);
    if (!orderItem) {
      return res.status(404).json({ error: 'Order item not found' });
    }
    res.status(200).json(orderItem);
  } catch (err) {
    console.error('Error fetching order item:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateOrderItem = async (req, res) => {
  const { id } = req.params;
  const { order_id, medicine_id, quantity, price } = req.body;

  try {
    const updatedOrderItem = await orderItemModel.updateOrderItem(id, order_id, medicine_id, quantity, price);
    if (!updatedOrderItem) {
      return res.status(404).json({ error: 'Order item not found' });
    }
    res.status(200).json(updatedOrderItem);
  } catch (err) {
    console.error('Error updating order item:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteOrderItem = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOrderItem = await orderItemModel.deleteOrderItem(id);
    if (!deletedOrderItem) {
      return res.status(404).json({ error: 'Order item not found' });
    }
    res.status(200).json({ message: 'Order item deleted successfully' });
  } catch (err) {
    console.error('Error deleting order item:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  addOrderItem,
  getOrderItems,
  getOrderItemById,
  updateOrderItem,
  deleteOrderItem,
};
