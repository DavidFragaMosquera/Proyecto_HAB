require('dotenv').config();

const { getConnection } = require('../../db');
const { generateError } = require('../../helpers');

async function deleteProduct(req, res, next) {

  let connection;
  try {
    const { id } = req.params;
    

    connection = await getConnection();
    const [
      current
    ] = await connection.query(
      'SELECT  id_usuario FROM articulos where id=?',
      [id]
    );

    if (!current.length) {
      throw generateError(`No existe un procucto con id ${id} 😣 `, 400);
    }

  
   if (current[0].id_usuario !== req.auth.id) {
      throw generateError('No tienes permiso para borrar este producto', 400);
    } 

    await connection.query(
      'delete from articulos where id=?',
      [id]
    );
    res.send({
      status: 'ok',
      message: `Articulo con id ${id} borrado `
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
module.exports = { deleteProduct };