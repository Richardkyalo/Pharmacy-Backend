const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/create-customer', authenticateToken, customerController.createCustomer);
router.get('/get-customers', authenticateToken, customerController.getCustomers);
router.get('/get-single-customer/:id', authenticateToken, customerController.getCustomerById);
router.put('/update-customer/:id', authenticateToken, customerController.updateCustomer);
router.delete('/delete-customer/:id', authenticateToken, customerController.deleteCustomer);

module.exports = router;
