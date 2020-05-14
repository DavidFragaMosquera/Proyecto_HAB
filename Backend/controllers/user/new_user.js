require('dotenv').config();
const bcrypt = require('bcrypt');

const { getConnection } = require('../../db');
const { newUserSchema } = require('../../validations/user');
const { generateError, randomString, sendEmail } = require('../../helpers');

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
      password
    } = req.body;

    const [
      existingUsername
    ] = await connection.query('SELECT id FROM usuarios WHERE nombre=?', [
      nombre
    ]);
    if (existingUsername.length) {
      throw generateError('The username already exists on the DB', 409);
    }
    const [
      existingEmail
    ] = await connection.query('SELECT id from usuarios where mail=?', [mail]);

    if (existingEmail.length) {
      throw generateError('This email already exists in database', 409);
    }
    const dbPassword = await bcrypt.hash(password, 10); 
    const registrationCode = randomString(40);
    const validationURL = `${process.env.PUBLIC_HOST}/users/validate?code=${registrationCode}`; 
    
     try {
      await sendEmail({
        email: mail,
        title: "You must validate your account in the App in SQL",
        content: `For validate your account paste this URL in your browser: ${validationURL}`,
      });
    } catch (error) {
      console.error(error);
      throw new Error("Error in the mailing. Try again later.");
    } 

    await connection.query(
      `INSERT INTO usuarios (nombre, apellidos, mail, fecha_nacimiento, login, password, primer_acceso, ultimo_acceso, registrationCode)
      VALUES (?,?,?,?,'pepepe',?,NOW(),NOW(),?) `,
      [nombre, apellidos, mail, fecha_nacimiento, dbPassword, registrationCode]
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
console.log('INTERNET!!!!!');