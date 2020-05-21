require('dotenv').config();

const { getConnection } = require('../../db');
const { generateError } = require('../../helpers');

async function deleteUser(req, res, next) {

  let connection;

    try {
      
      connection = await getConnection();
      const { id } = req.params;
      const [ current] = await connection.query('SELECT id FROM usuarios where id=?', 
      [ id ]);

      if (!current.length) {
        throw generateError(`No existe el id ${id}`, 400);
      }

      if (current[0].id_usuario !== req.auth.id ) {
        throw generateError(
        'No tienes permiso para borrar un usuario que no es tuyo',
        401
        );
      }

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