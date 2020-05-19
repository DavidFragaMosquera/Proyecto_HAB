require('dotenv').config();
const { getConnection } = require('../../db');
const { generateError } = require('../../helpers');
const { newProductSchema } = require('../../validations/product');

async function newProduct(req, res, next) {

  let connection;

  try {

    const { id } = req.auth;

    connection = await getConnection();

    await newProductSchema.validateAsync(req.body);
  
    const {
      
      nombre_articulo,
      descripcion,
      precio,
      tipo,
      subtipo,
      fecha_inicio,
      
      } = req.body;
 

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
      `INSERT INTO articulos (id_usuario, nombre_articulo, descripcion, precio, tipo, subtipo, fecha_inicio ) 
      VALUES  (?,?,?,?,?,?,NOW())`,

      [
        id,
        nombre_articulo,
        descripcion,
        precio,
        tipo,
        subtipo,
        fecha_inicio    
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