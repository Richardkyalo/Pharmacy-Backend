const medicineModel = require('../models/medicineModel');
const supplierModel = require('../models/supplierModel'); // Import the supplier model


const createMedicine = async (name, description, supplier_id, quantity, price, expiration_date) => {
  const query = `
    INSERT INTO medicines (name, description, supplier_id, quantity, price, expiration_date)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING 
      medicine_id,
      name,
      description,
      supplier_id,
      quantity,
      price,
      expiration_date,
      created_at,
      (SELECT json_build_object(
          'supplier_id', s.supplier_id,
          'name', s.name,
          'contact_name', s.contact_name,
          'contact_phone', s.contact_phone,
          'contact_email', s.contact_email,
          'address', s.address
        ) AS supplier
        FROM suppliers s
        WHERE s.supplier_id = $3)
      AS supplier_details
  `;
  
  const values = [name, description, supplier_id, quantity, price, expiration_date];
  
  try {
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw new Error('Error creating medicine:', error);
  }
};

const getMedicines = async (req, res) => {
  try {
    const medicines = await medicineModel.getMedicinesWithSupplierDetails();
    res.status(200).json(medicines);
  } catch (err) {
    console.error('Error fetching medicines:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const getMedicineById = async (req, res) => {
  const { id } = req.params;

  try {
    const medicine = await medicineModel.getMedicineByIdWithSupplierDetails(id);
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
    const updatedMedicine = await medicineModel.updateMedicine(
      id,
      name,
      description,
      supplier_id,
      quantity,
      price,
      expiration_date
    );

    // Fetch updated medicine with supplier details
    const updatedMedicineWithSupplier = await medicineModel.getMedicineByIdWithSupplierDetails(id);

    if (!updatedMedicineWithSupplier) {
      return res.status(404).json({ error: 'Medicine not found' });
    }
    res.status(200).json(updatedMedicineWithSupplier);
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
