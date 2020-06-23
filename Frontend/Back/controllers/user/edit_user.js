require('dotenv').config();

const { getConnection } = require('../../db');
const { editUserSchema } = require('../../validations/edit_user');
const { generateError,
        processAndSavePhoto,
        deletePhoto } = require('../../helpers');

async function editUser(req, res, next) {
    let connection;
    try {
        await editUserSchema.validateAsync(req.body);
        connection = await getConnection();
        const { id } = req.params;
        const {  
                nombre,
                apellidos,
                fecha_nacimiento,
                direccion,
                telefono,
                mail,
                descripcion          
                 } = req.body;
                 
  /*   const [existingLogin] = await connection.query('SELECT id FROM usuarios WHERE login=?', [
      login
    ]);
    if (existingLogin.length) {
      throw generateError('El nombre de usuario ya existe, prueba con otro!', 409);
    } */

    const [current] = await connection.query(` SELECT id, imagen FROM usuarios WHERE id=?`, [id]);

    if (!current.length) {
        throw generateError(`El usuario ${id} no existe`, 404);
    }

     if (current[0].id !== req.auth.id ) {
        throw generateError('No tienes permisos para editar este usuario', 401);
    } 

    let savedFileName;

    if (req.files && req.files.imagen) {
      try {
        savedFileName = await processAndSavePhoto(req.files.imagen);

        if (current && current.imagen) {
          await deletePhoto(current.imagen);
        }
      } catch (error) {
        throw generateError('No se puede procesar la imagen. Intentalo más tarde', 400);
      }
    } else {
      savedFileName = current.imagen;
    }
   
    await connection.query(` UPDATE usuarios SET  
                            nombre=?,  
                            apellidos=?, 
                            fecha_nacimiento=?, 
                            direccion=?,
                            telefono=?, 
                            mail=?, 
                            descripcion=?, 
                            imagen=? WHERE id=?`,
        [  
          nombre,
          apellidos,
          fecha_nacimiento,
          direccion,
          telefono,
          mail,
          descripcion,
          savedFileName,
          id ]
    );

    res.send({ status: 'ok', message: 'Usuario actualizado' });

  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = { editUser };

