const pool = require('../config/db');

const createMedicine = async (name, description, supplier_id, quantity, price, expiration_date) => {
  const result = await pool.query(
    'INSERT INTO medicines (name, description, supplier_id, quantity, price, expiration_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [name, description, supplier_id, quantity, price, expiration_date]
  );
  return result.rows[0];
};

const getMedicines = async () => {
  const query = `
    SELECT m.medicine_id, m.name, m.description, m.supplier_id, m.quantity, m.price, m.expiration_date, m.created_at,
           json_build_object(
             'supplier_id', s.supplier_id,
             'name', s.name,
             'contact_name', s.contact_name,
             'contact_phone', s.contact_phone,
             'contact_email', s.contact_email,
             'address', s.address
           ) AS supplier_details
    FROM medicines m
    LEFT JOIN suppliers s ON m.supplier_id = s.supplier_id
  `;

  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    throw new Error('Error fetching medicines with supplier details:', error);
  }
};

const getMedicineById = async (id) => {
  const query = `
    SELECT m.medicine_id, m.name, m.description, m.supplier_id, m.quantity, m.price, m.expiration_date, m.created_at,
           json_build_object(
             'supplier_id', s.supplier_id,
             'name', s.name,
             'contact_name', s.contact_name,
             'contact_phone', s.contact_phone,
             'contact_email', s.contact_email,
             'address', s.address
           ) AS supplier_details
    FROM medicines m
    LEFT JOIN suppliers s ON m.supplier_id = s.supplier_id
    WHERE m.medicine_id = $1
  `;

  try {
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  } catch (error) {
    throw new Error('Error fetching medicine with supplier details:', error);
  }
};

const updateMedicine = async (id, name, description, supplier_id, quantity, price, expiration_date) => {
  const query = `
    UPDATE medicines
    SET name = $1, description = $2, supplier_id = $3, quantity = $4, price = $5, expiration_date = $6
    WHERE medicine_id = $7
    RETURNING medicine_id, name, description, supplier_id, quantity, price, expiration_date, created_at,
              (SELECT json_build_object(
                  'supplier_id', s.supplier_id,
                  'name', s.name,
                  'contact_name', s.contact_name,
                  'contact_phone', s.contact_phone,
                  'contact_email', s.contact_email,
                  'address', s.address
                ) 
                FROM suppliers s
                WHERE s.supplier_id = $3) AS supplier_details
  `;

  try {
    const { rows } = await pool.query(query, [name, description, supplier_id, quantity, price, expiration_date, id]);
    return rows[0];
  } catch (error) {
    throw new Error('Error updating medicine with supplier details:', error);
  }
};


const deleteMedicine = async (id) => {
  const result = await pool.query('DELETE FROM medicines WHERE medicine_id = $1 RETURNING *', [id]);
  return result.rows[0];
};



module.exports = {
  createMedicine,
  getMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
};
