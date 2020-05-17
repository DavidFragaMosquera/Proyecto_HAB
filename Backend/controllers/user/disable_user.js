require('dotenv').config();
const { getConnection } = require('../../db');
const { generateError, randomString } = require('../../helpers');

async function disableUser(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    const { id } = req.params;
    const [
      current
    ] = await connection.query(
      'SELECT active, id FROM usuarios where id=?',
      [id]
    );

    if (!current.length) {
      throw generateError(`No existe el id ${id}`, 400);
    }
    //this shit
    if (current[0].id !== req.auth.id && req.auth.role !== 'admin') {
        throw generateError('No tienes permisos para editar este usuario', 401);
      }

    const registrationCode = randomString(40);

    await connection.query(`UPDATE usuarios SET active=0, registrationCode=? where id=?`, 
    [registrationCode, id]);
    res.send({
      status: 'ok',
      message: 'Usuario deshabilitado'
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = { disableUser };