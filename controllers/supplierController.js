const supplierModel = require('../models/supplierModel');

const createSupplier = async (req, res) => {
  const { name, contact_name, contact_phone, contact_email, address } = req.body;

  try {
    const newSupplier = await supplierModel.createSupplier(name, contact_name, contact_phone, contact_email, address);
    res.status(201).json(newSupplier);
  } catch (err) {
    console.error('Error creating supplier:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getSuppliers = async (req, res) => {
  try {
    const suppliers = await supplierModel.getSuppliers();
    res.status(200).json(suppliers);
  } catch (err) {
    console.error('Error fetching suppliers:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getSupplierById = async (req, res) => {
  const { id } = req.params;

  try {
    const supplier = await supplierModel.getSupplierById(id);
    if (!supplier) {
      return res.status(404).json({ error: 'Supplier not found' });
    }
    res.status(200).json(supplier);
  } catch (err) {
    console.error('Error fetching supplier:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateSupplier = async (req, res) => {
  const { id } = req.params;
  const { name, contact_name, contact_phone, contact_email, address } = req.body;

  try {
    const updatedSupplier = await supplierModel.updateSupplier(id, name, contact_name, contact_phone, contact_email, address);
    if (!updatedSupplier) {
      return res.status(404).json({ error: 'Supplier not found' });
    }
    res.status(200).json(updatedSupplier);
  } catch (err) {
    console.error('Error updating supplier:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteSupplier = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSupplier = await supplierModel.deleteSupplier(id);
    if (!deletedSupplier) {
      return res.status(404).json({ error: 'Supplier not found' });
    }
    res.status(200).json({ message: 'Supplier deleted successfully' });
  } catch (err) {
    console.error('Error deleting supplier:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createSupplier,
  getSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
};
