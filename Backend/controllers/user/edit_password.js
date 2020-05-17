require('dotenv').config();
const bcrypt = require('bcrypt');

const { getConnection } = require('../../db');
const { editPasswordSchema } = require('../../validations/edit_password');
const { generateError } = require('../../helpers');

async function editPassword(req, res, next) {
  let connection;
  try {
    const { id } = req.params;
    // body: oldpassword, newPassword, newPasswordRepeat (opcional)
    connection = await getConnection();

    await editPasswordSchema.validateAsync(req.body);

    const { oldPassword, newPassword } = req.body;

    if (Number(id) !== req.auth.id) {
      throw generateError(
        `You can not change the password of user with id ${id}`,
        401
      );
    }

    if (oldPassword === newPassword) {
      throw generateError('New password can not be the same that old one', 400);
    }

    // Sacar la info del usuario de la base de datos
    const [currentUser] = await connection.query(`
      SELECT id, password from usuarios where id=?
      `,
      [id]
    );

    // Código un poco redundante
    if (!currentUser.length) {
      throw generateError(`The user with id ${id} does not exist`, 404);
    }

    const [dbUser] = currentUser;

    // Comprobar que la vieja password envíada sea la correcta
    // el orden es: passord sin encriptar, password encriptada
    const passwordsMath = await bcrypt.compare(oldPassword, dbUser.password);

    if (!passwordsMath) {
      throw generateError('Tu password antigua es incorrecta', 401);
    }

    // generar hash de la password
    const dbNewPassword = await bcrypt.hash(newPassword, 10);

    // actualizar la base de datos
    await connection.query(
      `
      UPDATE usuarios SET password=?, ultima_modificacion_password=now() WHERE id=?
    `,
      [dbNewPassword, id]
    );

    res.send({
      status: 'ok',
      message:
        'Password changes properly. Your tokens are not valid. You must login again.'
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = { editPassword };