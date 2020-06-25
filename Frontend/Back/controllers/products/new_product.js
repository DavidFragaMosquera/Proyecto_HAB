require('dotenv').config();
const { getConnection } = require('../../db');
const { generateError, processAndSavePhoto, deletePhoto  } = require('../../helpers');
const { newProductSchema } = require('../../validations/product');

async function newProduct(req, res, next) {

  let connection;

  try {
    connection = await getConnection();
    await newProductSchema.validateAsync(req.body);
    const { id } = req.auth;
    const {
      nombre_articulo,
      descripcion,
      precio,
      tipo,
      subtipo,
      fecha_inicio   
      } = req.body;

      const [
        current
      ] = await connection.query(
        ` SELECT id_usuario, imagen FROM articulos WHERE id=?`,
        [id]
      );

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

    const [
      existingProduct
    ] = await connection.query(
      'SELECT nombre_articulo FROM articulos WHERE nombre_articulo=?',
      [nombre_articulo]
    );
    if (existingProduct.length) {
      throw generateError('Este articulo ya existe', 409);
    }
    await connection.query(
      `INSERT INTO articulos (id_usuario,imagen,nombre_articulo, descripcion, precio, tipo, subtipo, fecha_inicio ) 
      VALUES  (?,?,?,?,?,?,?,NOW())`,

      [
        id,
        savedFileName,
        nombre_articulo,
        descripcion,
        precio,
        tipo,
        subtipo,
        fecha_inicio,  
      ] 

    );

    res.send({
      status: 'ok',
      message: 'Articulo creado correctamente'
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
module.exports = { newProduct };