require('dotenv').config();
const bcrypt = require('bcrypt');

const { getConnection } = require('../../db');
const { newUserSchema } = require('../../validations/user');
const { generateError, 
        randomString, 
        sendEmail } = require('../../helpers');

async function newUser(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    await newUserSchema.validateAsync(req.body); 

     const {
      nombre,
      apellidos,
      mail,
      fecha_nacimiento,
      login,
      password
    } = req.body;

    const [
      existingLogin
    ] = await connection.query('SELECT id FROM usuarios WHERE login=?', [
      login
    ]);
    if (existingLogin.length) {
      throw generateError('El nombre de usuario ya existe, prueba con otro!', 409);
    }
    const [
      existingEmail
    ] = await connection.query('SELECT id from usuarios where mail=?', [mail]);

    if (existingEmail.length) {
      throw generateError('Ya tienes una cuenta en PicsFy', 409);
    }
    const dbPassword = await bcrypt.hash(password, 10); 
    const registrationCode = randomString(40);
    const validationURL = `${process.env.PUBLIC_HOST}/users/validate?code=${registrationCode}`; 
    
     try {
      await sendEmail({
        email: mail,
        title: "Validacion de cuenta en PicsFy",
        content: `Para validar tu cuenta pega este enlace en tu navegador: ${validationURL}`,
      });
    } catch (error) {
      console.error(error);
      throw new Error("Error en el mail. Prueba más tarde");
    } 

    await connection.query(
      `INSERT INTO usuarios (nombre, apellidos, mail, fecha_nacimiento, login, password, primer_acceso, ultimo_acceso, registrationCode)
      VALUES (?,?,?,?,?,?,NOW(),NOW(),?) `,
      [nombre, apellidos, mail, fecha_nacimiento, login, dbPassword, registrationCode]
    );
 
    res.send({
      status: 'ok',
      message:
        'Usuario creado correctamente.Comprueba tu mail para verificar tu cuenta.'
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
module.exports = { newUser };
console.log('Veña palanteeee!!!');