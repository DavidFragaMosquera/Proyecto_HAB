require('dotenv').config();

const { getConnection } = require('../../db');
const { generateError } = require('../../helpers');

async function searchPrice(req, res, next) {

  let connection;

  try {

    connection = await getConnection();

    const { number } = req.query;

    const result = await connection.query(
      `SELECT nombre_articulo, descripcion , imagen, precio, tipo, subtipo, fecha_fin
  FROM articulos WHERE precio LIKE ?  
  ORDER BY precio`,
      [`%${ number }%`]
    );

    const [priceData] = result;

    if (!priceData.length) {
      throw generateError('No existe', 401);
    }

    res.send({
      staus: 'ok',
      data: priceData
    });

  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = { searchPrice };