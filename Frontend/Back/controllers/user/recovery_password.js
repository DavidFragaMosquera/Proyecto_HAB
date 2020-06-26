require('dotenv').config();


const { getConnection } = require('../../db');
const { generateError,
        randomString, 
        sendRecoveryPassword } = require('../../helpers');
const { recoveryPasswordSchema} = require('../../validations/reactivate_user');
const bcrypt = require('bcrypt');

async function recoveryPassword(req, res, next) {

    let connection;
    
    try {
    await recoveryPasswordSchema.validateAsync(req.body);
    
    const { mail } = req.body;
    
    connection = await getConnection();
    
    const [
      db
    ] = await connection.query(
      'SELECT id, mail, password from usuarios where mail=? and active=1',
      [mail]
    );
    
    if (!db.length) {
      throw generateError(
        'No exite ningun usuario activo con ese mail',
        404
      );
    }
    
    const [user] = db;
    
    const tempPassword = randomString(10);
    
    try {
      await sendRecoveryPassword({
        email: user.mail,
        title: 'Esta es tu nueva contraseña',
        content: `Tu nueva contraseña es ${tempPassword}. Por seguridad recomendamos que cambies tu contraseña en cuanto accedas a la pagina`
      });
    } catch (error) {
      console.error(error);
      throw new Error(
        'Se ha producido un error en el envío del mail'
      );
    }
    
    
    const tempDBPassword = await bcrypt.hash(tempPassword, 10);
    
    await connection.query('UPDATE usuarios SET password=? where id=?', [
      tempDBPassword,
      user.id
    ]);
    
    res.send({
      staus: 'ok',
      message:
        'Te hemos enviado un email con tu nueva contraseña. No olvides revisar tu carpeta de SPAM.'
    });
    } catch (error) {
    next(error);
    } finally {
    if (connection) {
    connection.release();
    }
    }
    }

    module.exports = { recoveryPassword }