require('dotenv').config();
const { getConnection } = require('../../db');
const { generateError } = require('../../helpers');
async function deleteUser(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    const { id } = req.params;
    const [
      current
    ] = await connection.query('SELECT  id FROM usuarios where id=?', [
      id
    ]);

    if (!current.length) {
      throw generateError(`No existe el id ${id}`, 400);
    }
    //con permisos de admin
  /*   if (req.auth.role !== 'admin') {
      throw generateError('No puedes eliminar este usuario', 401);
    } */

    await connection.query(`DELETE FROM usuarios  WHERE id=?`, [id]);
    res.send({
      status: 'ok',
      message: 'Usuario borrado'
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = { deleteUser };