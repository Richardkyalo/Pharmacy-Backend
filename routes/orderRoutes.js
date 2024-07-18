const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/create-order', authenticateToken, orderController.createOrder);
router.get('/get-orders', authenticateToken, orderController.getOrders);
router.get('/get-single-order/:id', authenticateToken, orderController.getOrderById);
router.put('/update-order/:id', authenticateToken, orderController.updateOrder);
router.delete('/delete-order/:id', authenticateToken, orderController.deleteOrder);

module.exports = router;
