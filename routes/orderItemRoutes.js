const express = require('express');
const router = express.Router();
const orderItemController = require('../controllers/oerdeItemController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/add-order-item', authenticateToken, orderItemController.addOrderItem);
router.get('/get-order-items', authenticateToken, orderItemController.getOrderItems);
router.get('/get-single-order-item/:id', authenticateToken, orderItemController.getOrderItemById);
router.put('/update-order-item/:id', authenticateToken, orderItemController.updateOrderItem);
router.delete('/delete-order-item/:id', authenticateToken, orderItemController.deleteOrderItem);

module.exports = router;
