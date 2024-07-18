const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/create-suppliers', authenticateToken, supplierController.createSupplier);
router.get('/get-suppliers', authenticateToken, supplierController.getSuppliers);
router.get('/get-single-suppliers/:id', authenticateToken, supplierController.getSupplierById);
router.put('/update-supplier/:id', authenticateToken, supplierController.updateSupplier);
router.delete('/delete-supplier/:id', authenticateToken, supplierController.deleteSupplier);

module.exports = router;
