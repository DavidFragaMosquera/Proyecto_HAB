require('dotenv').config();

const { getConnection } = require('../../db');
const { generateError } = require('../../helpers');

async function getAcquiredProducts(req, res, next) {

  let connection;

  try {

    connection = await getConnection();

    const { id } = req.params

    const [respuesta] = await connection.query(
      `SELECT p.id, p.precio, p.direccion, p.fecha_inicio, p.fecha_fin, a.imagen, a.nombre_articulo
      FROM pedidos p INNER JOIN articulos a ON a.id = p.id_articulo
      WHERE p.id_usuario=?
      ORDER BY p.fecha_fin`,
      [id]
    );

    if (!respuesta.length) {
      throw generateError('No has adquirido ningún producto todavía!', 401);
    }
    const articulosAdquiridos = respuesta;
    
    res.send({
      status: 'ok',
      data: articulosAdquiridos
    });

  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = {
    getAcquiredProducts
};