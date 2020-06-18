require('dotenv').config();

const { getConnection } = require('../../db');
const { generateError } = require('../../helpers');

async function availabilityProduct(req, res, next) {

  let connection;

  try {

    connection = await getConnection();
    const { text } = req.query;

    const result = await connection.query(
      `SELECT nombre_articulo , descripcion , tipo , subtipo, imagen, precio, fecha_fin
  FROM articulos WHERE disponibilidad=0
  ORDER BY fecha_fin`
    );

    const [articlesData] = result;

    if (!articlesData.length) {
      throw generateError('Todos los productos están disponibles', 401);
    }

    res.send({
      staus: 'ok',
      data: articlesData
    });

  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = { availabilityProduct };