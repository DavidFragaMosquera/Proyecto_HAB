require('dotenv').config();
const { getConnection } = require('../../db');
const { generateError } = require('../../helpers');

async function getRatingProducts(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const { id } = req.params
    
    const result = await connection.query(
      `SELECT  
        valoracion,
        comentario,
        fecha FROM ratings WHERE id_articulo=?
        ORDER BY fecha`, 
        [id]
    );

    const [usersData] = result;

    if (!result.length) {
      throw generateError('No existen valoraciones :(', 401);
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
module.exports = { getRatingProducts };