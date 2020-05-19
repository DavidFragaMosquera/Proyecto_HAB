require('dotenv').config();
const { getConnection } = require('../../db');
const { generateError } = require('../../helpers');

async function getAllUsers(req, res, next) {
  let connection;

  try {
    connection = await getConnection();
    
    const result = await connection.query(
      `SELECT id, 
        login,
        nombre,
        apellidos, 
        telefono, 
        mail, 
        direccion, 
        descripcion, 
        primer_acceso FROM usuarios
        ORDER BY primer_acceso`
    );

    const [usersData] = result;

    if (!usersData.length) {
      throw generateError('No existen usuarios', 401);
    }

    res.send({
      staus: 'ok',
      data: usersData
    });

  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = { getAllUsers };