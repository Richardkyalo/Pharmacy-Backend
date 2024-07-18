const prescriptionModel = require('../models/prescriptionModel');

// Create Prescription
const createPrescription = async (req, res) => {
    const { customer_id, doctor_name, date_issued } = req.body;

    try {
        const newPrescription = await prescriptionModel.createPrescription(customer_id, doctor_name, date_issued);
        res.status(201).json(newPrescription);
    } catch (err) {
        console.error('Error creating prescription:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all prescriptions
const getPrescriptions = async (req, res) => {
    try {
        const prescriptions = await prescriptionModel.getPrescriptions();
        res.status(200).json(prescriptions);
    } catch (err) {
        console.error('Error fetching prescriptions:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get prescription by ID
const getPrescriptionById = async (req, res) => {
    const { id } = req.params;

    try {
        const prescription = await prescriptionModel.getPrescriptionById(id);
        if (!prescription) {
            return res.status(404).json({ error: 'Prescription not found' });
        }
        res.status(200).json(prescription);
    } catch (err) {
        console.error('Error fetching prescription:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update prescription
const updatePrescription = async (req, res) => {
    const { id } = req.params;
    const { customer_id, doctor_name, date_issued } = req.body;

    try {
        const updatedPrescription = await prescriptionModel.updatePrescription(id, customer_id, doctor_name, date_issued);
        if (!updatedPrescription) {
            return res.status(404).json({ error: 'Prescription not found' });
        }
        res.status(200).json(updatedPrescription);
    } catch (err) {
        console.error('Error updating prescription:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete prescription
const deletePrescription = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedPrescription = await prescriptionModel.deletePrescription(id);
        if (!deletedPrescription) {
            return res.status(404).json({ error: 'Prescription not found' });
        }
        res.status(200).json({ message: 'Prescription deleted successfully' });
    } catch (err) {
        console.error('Error deleting prescription:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createPrescription,
    getPrescriptions,
    getPrescriptionById,
    updatePrescription,
    deletePrescription,
};
