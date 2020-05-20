require('dotenv').config();

const { getConnection } = require('../../db');
const { generateError } = require('../../helpers');
const { newProductSchema} = require('../../validations/product');

async function editProduct(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    await newProductSchema.validateAsync(req.body);
    const { id } = req.params;
    const {
      nombre_articulo, 
      descripcion, 
      precio, 
      tipo, 
      subtipo, 
      fecha_inicio, 
      fecha_fin 
    } = req.body;
    const [
      current
    ] = await connection.query(
      ` SELECT id_usuario FROM articulos WHERE id=?`,
      [id]
    );
    if (!current.length) {
      throw generateError(`El articulo con el id ${ id } no existe`, 404);
    }
    
    if (current[0].id_usuario !== req.auth.id ) {
      throw generateError(
        'No tienes permiso para actualizar este articulo ',
        401
      );
    }
    await connection.query(
      `UPDATE articulos SET  
      nombre_articulo=?,
      descripcion=?,
      precio=?,
      tipo=?,
      subtipo=?,
      fecha_inicio=?,
      fecha_fin=? WHERE id=?`,
      [
        nombre_articulo,
        descripcion,
        precio,
        tipo,
        subtipo,
        fecha_inicio,
        fecha_fin,
        id
      ]
    );

    res.send({ status: 'ok', message: 'Articulo modificado correctamente 😁' });

  } catch (error) {
    next(error);
  } finally {

    if (connection) connection.release();
  }
}
module.exports = { editProduct }; 