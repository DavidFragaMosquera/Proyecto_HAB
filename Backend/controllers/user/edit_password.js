require('dotenv').config();
const bcrypt = require('bcrypt');

const { getConnection } = require('../../db');
const { editPasswordSchema } = require('../../validations/edit_password');
const { generateError } = require('../../helpers');

async function editPassword(req, res, next) {

  let connection;

  try {
    
    const { id } = req.params;
  
    connection = await getConnection();

    await editPasswordSchema.validateAsync(req.body);

    const { oldPassword, newPassword, newPasswordRepeat } = req.body;

    if (Number(id) !== req.auth.id) {
      throw generateError(
        `You can not change the password of user with id ${id}`,
        401
      );
    }

    if (oldPassword === newPassword) {
      throw generateError('La nueva contraseña no puede ser la misma que la anterior', 400);
    }

     if (newPassword !== newPasswordRepeat) {
      throw generateError('Las contraseñas deben coincidir');
    } 

    // Sacar la info del usuario de la base de datos
    const [currentUser] = await connection.query(`
      SELECT id, password from usuarios where id=?
      `,
      [id]
    );

    if (!currentUser.length) {
      throw generateError(`El usuario con el id ${id} no existe`, 404);
    }

    if (current[0].id_usuario !== req.auth.id ) {
      throw generateError(
        'No tienes permiso para editar contraseña si no te autentificas',
        401
      );
    }

    const [dbUser] = currentUser;

    const passwordsMath = await bcrypt.compare(oldPassword, dbUser.password);

    if (!passwordsMath) {
      throw generateError('Tu password antigua es incorrecta', 401);
    }

    const dbNewPassword = await bcrypt.hash(newPassword, 10);

    await connection.query(
      `
      UPDATE usuarios SET password=?, ultima_modificacion_password=now() WHERE id=?
    `,
      [dbNewPassword, id]
    );

    res.send({
      status: 'ok',
      message:
        'Contraseña cambiada, debes hacer login otra vez para autentificarte'
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = { editPassword };