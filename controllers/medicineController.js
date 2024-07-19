const medicineModel = require('../models/medicineModel');
const supplierModel = require('../models/supplierModel'); // Import the supplier model


const createMedicine = async (req, res) => {
  const { name, description, supplier_id, quantity, price, expiration_date } = req.body;

  try {
    // Create the medicine
    const newMedicine = await medicineModel.createMedicine(
      name,
      description,
      supplier_id,
      quantity,
      price,
      expiration_date
    );

    // Fetch the supplier details
    const supplierDetails = await supplierModel.getSupplierById(supplier_id);

    // Combine medicine and supplier details
    const response = {
      ...newMedicine,
      supplier: supplierDetails,
    };

    res.status(201).json(response);
  } catch (err) {
    console.error('Error creating medicine:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const getMedicines = async (req, res) => {
  try {
    const medicines = await medicineModel.getMedicines();
    res.status(200).json(medicines);
  } catch (err) {
    console.error('Error fetching medicines:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const getMedicineById = async (req, res) => {
  const { id } = req.params;

  try {
    const medicine = await medicineModel.getMedicineById(id);
    if (!medicine) {
      return res.status(404).json({ error: 'Medicine not found' });
    }
    res.status(200).json(medicine);
  } catch (err) {
    console.error('Error fetching medicine:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const updateMedicine = async (req, res) => {
  const { id } = req.params;
  const { name, description, supplier_id, quantity, price, expiration_date } = req.body;

  try {
    const updatedMedicineRecord = await medicineModel.updateMedicine(
      id,
      name,
      description,
      supplier_id,
      quantity,
      price,
      expiration_date
    );
    if (!updatedMedicineRecord) {
      return res.status(404).json({ error: 'Medicine not found' });
    }
    res.status(200).json(updatedMedicineRecord);
  } catch (err) {
    console.error('Error updating medicine:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const deleteMedicine = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMedicine = await medicineModel.deleteMedicine(id);
    if (!deletedMedicine) {
      return res.status(404).json({ error: 'Medicine not found' });
    }
    res.status(200).json({ message: 'Medicine deleted successfully' });
  } catch (err) {
    console.error('Error deleting medicine:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createMedicine,
  getMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
};
