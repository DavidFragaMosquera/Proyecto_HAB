require('dotenv').config();

const { getConnection } = require('../../db');
const { generateError } = require('../../helpers');

async function getUserProducts(req, res, next) {

  let connection;

  try {

    connection = await getConnection();

    const { id } = req.params

    const [respuesta] = await connection.query(
      `SELECT  nombre_articulo, descripcion, precio, tipo, subtipo, imagen, disponibilidad FROM articulos WHERE id_usuario=?
  ORDER BY fecha_inicio`,
      [id]
    );

    if (!respuesta.length) {
      throw generateError('No tienes ningun articulo subido, animate con el primero!!', 401);
    }
    const articulos = [respuesta];
    
    res.send({
      status: 'ok',
      data: articulos
    });

  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = {
    getUserProducts
};