const express = require('express');
const router = express.Router();
const prescriptionItemController = require('../controllers/prescriptionItemController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/create-prescription-item', authenticateToken, prescriptionItemController.createPrescriptionItem);
router.get('/get-prescription-items', authenticateToken, prescriptionItemController.getPrescriptionItems);
router.get('/get-prescription-item/:id', authenticateToken, prescriptionItemController.getPrescriptionItemById);
router.put('/update-prescription-item/:id', authenticateToken, prescriptionItemController.updatePrescriptionItem);
router.delete('/delete-prescription-item/:id', authenticateToken, prescriptionItemController.deletePrescriptionItem);

module.exports = router;
