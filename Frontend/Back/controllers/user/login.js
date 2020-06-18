require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getConnection } = require('../../db');
const { generateError } = require('../../helpers');
const { loginSchema } = require('../../validations/login');
async function loginUser(req, res, next) {

  let connection;

  try {
      
    await loginSchema.validateAsync(req.body);
    const { login, password } = req.body;
    connection = await getConnection();
    const [
      dbUser
    ] = await connection.query(
      'SELECT id, mail, password, login from usuarios where login=? AND active=1',
      [login]
    );

    if (!dbUser.length) {
      throw generateError(
        'Ningún usuario activo con este nombre de usuario. Recuerda validar tu cuenta',
        404
      );
    }

    const [user] = dbUser;
    const passwordsMath = await bcrypt.compare(password, user.password);

    if (!passwordsMath) {
      throw generateError('Password incorrecta', 401);
    }
    const tokenPayload = { id: user.id, login:user.login };

    const token = jwt.sign(tokenPayload, process.env.SECRET, {
      expiresIn: '33d'
    });
    res.send({
      status: 'ok',
      message: 'Login correcto',
      login: user.login,
      id: user.id,
      data: { token }
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = { loginUser };