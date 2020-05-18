require('dotenv').config();

const { getConnection } = require('../../db');
const { generateError } = require('../../helpers');
const { editUserSchema } = require('../../validations/edit_user');

async function editUser(req, res, next) {
    let connection;
    try {
        await editUserSchema.validateAsync(req.body);
        connection = await getConnection();
        const { id } = req.params;
        const { login, 
                nombre,
                apellidos,
                fecha_nacimiento,
                direccion,
                telefono,
                mail,
                descripcion
                } = req.body;

    const [current] = await connection.query(` SELECT id FROM usuarios WHERE id=?`, [id]);

    if (!current.length) {
        throw generateError(`El usuario ${id} no existe`, 404);
    }

    /* if (current[0].id !== req.auth.id && req.auth.role !== 'admin') {
        throw generateError('No tienes permisos para editar este usuario', 401);
    } */
    
    await connection.query(` UPDATE usuarios SET login=?, nombre=?, apellidos=?, fecha_nacimiento=?, direccion=?, telefono=?, mail=?, descripcion=? WHERE id=?`,
        [ login, 
          nombre,
          apellidos,
          fecha_nacimiento,
          direccion,
          telefono,
          mail,
          descripcion,
          id]
    );
    res.send({ status: 'ok', message: 'Usuario actualizado' });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = { editUser };

