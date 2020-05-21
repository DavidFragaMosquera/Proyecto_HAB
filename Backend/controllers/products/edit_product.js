require('dotenv').config();

const { getConnection } = require('../../db');
const { generateError, processAndSavePhoto, deletePhoto } = require('../../helpers');
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
      ` SELECT id_usuario, imagen FROM articulos WHERE id=?`,
      [id]
    );
    if (!current.length) {
      throw generateError(`El articulo con el id ${ id } no existe`, 404);
    }
    
    if (current[0].id_usuario !== req.auth.id ) {
      throw generateError(
        'No tienes permiso para editar este articulo ',
        401
      );
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

    
    await connection.query(
      `UPDATE articulos SET  
      nombre_articulo=?,
      descripcion=?,
      precio=?,
      tipo=?,
      subtipo=?,
      fecha_inicio=?,
      fecha_fin=?,
      imagen=? WHERE id=?`,
      [
        nombre_articulo,
        descripcion,
        precio,
        tipo,
        subtipo,
        fecha_inicio,
        fecha_fin,
        savedFileName,
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