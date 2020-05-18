require('dotenv').config();

const { getConnection } = require('../../db');
const { generateError } = require('../../helpers');

async function getProduct(req, res, next) {
  let connection;

  try {
    connection = await getConnection();
    const { id } = req.params;

    const [result] = await connection.query(
      `SELECT id,
       nombre_articulo, 
       descripcion, 
       precio, 
       tipo, 
       subtipo, 
       fecha_inicio, 
       fecha_fin, 
       id_usuario FROM articulos WHERE id=?`,
      [id]
    );

    if (!result.length) {
      throw generateError(`No existe producto con el ${id}`, 404);
    }
    const [articulos] = result;

    const payload = {
      nombre_articulo: articulos.nombre_articulo,
      descripcion: articulos.descripcion,
      precio: articulos.precio,
      tipo: articulos.tipo,
      subtipo: articulos.subtipo,
      fecha_inicio: articulos.fecha_inicio,
      fecha_fin: articulos.fecha_fin
    };

    res.send({
      status: 'ok',
      data: payload
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = { getProduct };