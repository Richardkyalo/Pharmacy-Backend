const prescriptionItemModel = require('../models/prescriptionItemModel');

// Create Prescription Item
const createPrescriptionItem = async (req, res) => {
    const { prescription_id, medicine_id, dosage, quantity } = req.body;

    try {
        const newPrescriptionItem = await prescriptionItemModel.createPrescriptionItem(prescription_id, medicine_id, dosage, quantity);
        res.status(201).json(newPrescriptionItem);
    } catch (err) {
        console.error('Error creating prescription item:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all prescription items
const getPrescriptionItems = async (req, res) => {
    try {
        const prescriptionItems = await prescriptionItemModel.getPrescriptionItems();
        res.status(200).json(prescriptionItems);
    } catch (err) {
        console.error('Error fetching prescription items:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get prescription item by ID
const getPrescriptionItemById = async (req, res) => {
    const { id } = req.params;

    try {
        const prescriptionItem = await prescriptionItemModel.getPrescriptionItemById(id);
        if (!prescriptionItem) {
            return res.status(404).json({ error: 'Prescription item not found' });
        }
        res.status(200).json(prescriptionItem);
    } catch (err) {
        console.error('Error fetching prescription item:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update prescription item
const updatePrescriptionItem = async (req, res) => {
    const { id } = req.params;
    const { prescription_id, medicine_id, dosage, quantity } = req.body;

    try {
        const updatedPrescriptionItem = await prescriptionItemModel.updatePrescriptionItem(id, prescription_id, medicine_id, dosage, quantity);
        if (!updatedPrescriptionItem) {
            return res.status(404).json({ error: 'Prescription item not found' });
        }
        res.status(200).json(updatedPrescriptionItem);
    } catch (err) {
        console.error('Error updating prescription item:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete prescription item
const deletePrescriptionItem = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedPrescriptionItem = await prescriptionItemModel.deletePrescriptionItem(id);
        if (!deletedPrescriptionItem) {
            return res.status(404).json({ error: 'Prescription item not found' });
        }
        res.status(200).json({ message: 'Prescription item deleted successfully' });
    } catch (err) {
        console.error('Error deleting prescription item:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createPrescriptionItem,
    getPrescriptionItems,
    getPrescriptionItemById,
    updatePrescriptionItem,
    deletePrescriptionItem,
};
