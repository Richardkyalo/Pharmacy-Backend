const pool = require('../config/db');

const createUser = async (username, hashedPassword, email, role) => {
  const result = await pool.query(
    'INSERT INTO users (username, password, email, role) VALUES ($1, $2, $3, $4) RETURNING *',
    [username, hashedPassword, email, role]
  );
  return result.rows[0];
};
const findUserByUsername= async (username) =>{
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0];
}
const findUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};
const getUsers= async ()=>{
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
}

const updateUser = async (username, email, role, id) => {
  try {
    console.log('Executing update query with:', username, email, role, id);
    const result = await pool.query('UPDATE users SET username = $1, email = $2, role= $3 WHERE user_id= $4 RETURNING *', [username, email, role, id]);
    console.log('Update result:', result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error('Error updating user:', error.message);
    throw error;
  }
};


const deleteUser = async (id)=>{
    const result = await pool.query('DELETE FROM users WHERE id = $1');
    return result.rows[0];
}

module.exports = {
  createUser,
  findUserByUsername,
  findUserByEmail,
  getUsers,
  updateUser,
  deleteUser,
};
