require('dotenv').config();
const bcrypt = require('bcrypt');

const { getConnection } = require('../../db');
const { generateError } = require('../../helpers');
const {reactivateUserSchema} = require('../../validations/reactivate_user');

async function reactivateUser(req, res, next) {
  let connection;
  
  try {
  await reactivateUserSchema.validateAsync(req.body);
  
  const { login, password } = req.body;
  
  connection = await getConnection();
  
  const [
    db
  ] = await connection.query(
    'SELECT id, login, password from usuarios where login=? AND active=0 AND registrationCode IS null',
    [login]
  );
  
  if (!db.length) {
    throw generateError(
      'No existe ninguna cuenta desactivada con ese email',
      404
    );
  }
  
  const [usuario] = db;
  
  const passwordsMath = await bcrypt.compare(password, usuario.password);
  
  if (!passwordsMath) {
    throw generateError('La contraseña introducida es incorrecta', 401);
  }
  
  await connection.query(
    `UPDATE usuarios SET active=1 WHERE id=?
  `,
    [usuario.id]
  );
  
  // Creamos respuesta
  res.send({
    status: 'ok',
    message:
      'La reactivacion de la cuenta se ha realizado. Vuelve a loguearte para iniciar sesion'
  });
  } catch (error) {
  next(error);
  } finally {
  if (connection) connection.release();
  }
  }
module.exports = { reactivateUser };