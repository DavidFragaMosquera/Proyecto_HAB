require('dotenv').config();

const { getConnection } = require('../../db');
const { generateError } = require('../../helpers');

async function getSubcategoryProducts(req, res, next) {
  let connection;

  try {
    connection = await getConnection();
    const { tipo, subtipo } = req.params;
        
    const [result] = await connection.query(
      `SELECT id,
       nombre_articulo, 
       descripcion, 
       precio, 
       tipo, 
       subtipo, 
       fecha_inicio, 
       fecha_fin
        FROM articulos WHERE tipo=? AND subtipo=?`,
      [tipo, subtipo]
    );

    if (!result.length) {
      throw generateError(`No existen productos ${tipo}`, 404);
    }
    
    res.send({
      status: 'ok',
      data: result
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = { getSubcategoryProducts }; 