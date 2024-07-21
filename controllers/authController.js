const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, findUserByUsername, findUserByEmail, getUsers, updateUser } = require('../models/userModels');
require('dotenv').config();

const register = async (req, res) => {
  const { username, password, email, role } = req.body;
  try {
    const checkUser = await findUserByUsername(username);
    if (checkUser){
      return res.status(400).json({ error: 'Username already exists' });
    } 
    const checkUserEmail = await findUserByEmail(email);
    if (checkUserEmail){
      return res.status(400).json({ error: 'Email already exists' });
    } 
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(username,  hashedPassword, email, role);
    res.status(201).json(user); 
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const payload = {
      user_id: user.id, // Ensure the user_id is included in the payload
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ ...user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const fetchUsers = async (req, res) => {
  try {
    const users = await getUsers(req.user.id);
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateSingleUser = async (req, res) => {
  // Extract the ID from the URL parameters
  const { id } = req.params;
  const { username, email, role } = req.body;

  // console.log(req.user.user_id, id);

  try {
    // if (req.user.user_id !== id) {
    //   return res.status(403).json({ error: 'Unauthorized to update this user' });
    // }

    const updatedUser = await updateUser(username, email, role, id);

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
  register,
  login,
  fetchUsers,
  updateSingleUser  
};
