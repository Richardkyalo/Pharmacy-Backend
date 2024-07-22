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


module.exports = {
    createPharmacy
}