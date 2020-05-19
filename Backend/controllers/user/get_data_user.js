require('dotenv').config();

const { getConnection } = require('../../db');
const { generateError } = require('../../helpers');

async function getUser(req, res, next) {
  let connection;

  try {
    connection = await getConnection();
    const { id } = req.params;

    const [result] = await connection.query(
      `SELECT id , primer_acceso, login,nombre,apellidos,
      fecha_nacimiento,
      direccion, telefono
      mail, descripcion,
      imagen FROM usuarios WHERE id=?`,
      [id]
    );

    if (!result.length) {
      throw generateError(`There existe usuario con id ${id}`, 404);
    }
    const [userData] = result;

    const payload = {
      primer_acceso: userData.primer_acceso,
      login: userData.login,
      nombre: userData.nombre,
      apellidos: userData.apellidos,
      fecha_nacimiento: userData.fecha_nacimiento,
      direccion: userData.direccion,
      telefono: userData.telefono,
      mail: userData.mail,
      descripcion: userData.descripcion
    };
    // AUTENTIFICAR 
  /*   if (userData.id === req.auth.id ) {
      payload.login = userData.login;
    } */
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
module.exports = { getUser };
