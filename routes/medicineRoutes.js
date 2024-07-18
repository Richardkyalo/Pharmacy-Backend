const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/medicineController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/createmedicine', authenticateToken, medicineController.createMedicine);
router.get('/get-medicines', authenticateToken, medicineController.getMedicines);
router.get('/get-siggle-medicine/:id', authenticateToken, medicineController.getMedicineById);
router.put('/update-single-medicine/:id', authenticateToken, medicineController.updateMedicine);
router.delete('/delete-medicine/:id', authenticateToken, medicineController.deleteMedicine);

module.exports = router;
