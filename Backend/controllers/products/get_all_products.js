 
require('dotenv').config();
const { getConnection } = require('../../db');
const { generateError } = require('../../helpers');

async function getAllProducts(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const result = await connection.query(
      `SELECT id, 
        nombre_articulo,
        descripcion,
        precio,
        tipo,subtipo,
        fecha_inicio,
        fecha_fin
        FROM articulos
        ORDER BY fecha_inicio`
    );

    const [productsData] = result;

    if (!productsData.length) {
      throw generateError('La lista de articulos está vacia', 401);
    }

    res.send({
      staus: 'ok',
      data: productsData
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = { getAllProducts };