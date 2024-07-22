const express = require('express');
const router = express.Router();
const pharmacyController = require('../controllers/pharmacyController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/create-pharmacy', authenticateToken, pharmacyController.createPharmacy);
// router.get('/get-customers', authenticateToken, pharmacyController.getCustomers);

module.exports = router;