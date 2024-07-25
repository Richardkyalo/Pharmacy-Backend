const express = require('express');
const router = express.Router();
const pharmacyController = require('../controllers/pharmacyController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/create-pharmacy', authenticateToken, pharmacyController.createPharmacy);
router.get('/get-pharmacies/:user_id', authenticateToken, pharmacyController.getAllPharmacies);
router.put('/update-pharmacy/:id', authenticateToken, pharmacyController.updateOnePharmacy);
router.delete('/delete-pharmacy/:id', authenticateToken, pharmacyController.deleteOnePharmacy);




module.exports = router;