const pharmacyModel = require('../models/pharmacyModel');

const createPharmacy = async (req, res) => {
    const { user_id, name, address, email } = req.body;
    
    try {
        const newPharmacy = await pharmacyModel.createPharmacy(user_id, name, address, email);
        res.status(201).json(newPharmacy);
    } catch (error){
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }

}

const getAllPharmacies = async (req, res) => {
    const { user_id } = req.params;

    try {
        const pharmacies = await pharmacyModel.getPharmacies(user_id);
        res.status(200).json(pharmacies);
    }
    catch(error){
        console.error('Error while fetching pharmacies:', error);
        res.status(500).json({error: 'Internal server error'})
    }
}

const updateOnePharmacy = async (req, res) => {
    const { id } = req.params;
    const { user_id, name, address, email } = req.body;

    try{
        const updatedPharmacy = await pharmacyModel.updatePharmacy(user_id, name, address, email, id);
        res.status(200).json(updatedPharmacy);
    } catch(error){
        console.error('Error while updating pharmacies:', error);
        res.status(500).json({error: 'Internal server error'})
    }
}

const deleteOnePharmacy = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedPharmacy = await pharmacyModel.deletePharmacy(id);
        if (!deletedPharmacy) {
            return res.status(404).json({ error: 'Pharmacy not found' });
        }
        res.status(200).json({ message: 'Pharmacy deleted successfully' });
    }
    catch(error) {
        console.error('Error deleting pharmacy', error);
        res.status(500).json({error: 'Internal server error'})
    }

}

module.exports = {
    createPharmacy,
    getAllPharmacies,
    updateOnePharmacy,
    deleteOnePharmacy
}