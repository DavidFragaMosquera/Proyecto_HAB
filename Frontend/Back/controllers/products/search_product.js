require('dotenv').config();
const {
  getConnection
} = require('../../db');
const {
  generateError
} = require('../../helpers');

async function searchProduct(req, res, next) {
  let connection;
  
  try {
      
    connection = await getConnection();

    const { text } = req.query;

    const result = await connection.query(
      `SELECT nombre_articulo, descripcion , imagen, precio, tipo, subtipo, fecha_fin
  FROM articulos WHERE nombre_articulo LIKE ? OR descripcion LIKE ? 
  ORDER BY nombre_articulo`,
      [`%${text}%`, `%${text}%`]
    );

    const [articulos] = result;
    if (!articulos.length) {
      throw generateError('Lista de articulos vacia', 401);
    }

    res.send({
      staus: 'ok',
      data: articulos
    });

  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = { searchProduct };