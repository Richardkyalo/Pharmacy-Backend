const express = require('express');
const { register, login, fetchUsers, updateSingleUser } = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware');


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', authenticateToken, fetchUsers);
router.put('/users/:id', authenticateToken,updateSingleUser);


module.exports = router;
