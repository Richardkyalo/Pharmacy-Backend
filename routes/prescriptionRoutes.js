const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescriptionController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/create-prescription', authenticateToken, prescriptionController.createPrescription);
router.get('/get-prescriptions', authenticateToken, prescriptionController.getPrescriptions);
router.get('/get-prescription/:id', authenticateToken, prescriptionController.getPrescriptionById);
router.put('/update-prescription/:id', authenticateToken, prescriptionController.updatePrescription);
router.delete('/delete-prescription/:id', authenticateToken, prescriptionController.deletePrescription);

module.exports = router;
