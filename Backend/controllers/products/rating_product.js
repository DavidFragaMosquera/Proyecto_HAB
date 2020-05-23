require('dotenv').config();
const { getConnection } = require('../../db');
const { newRatingSchema } = require('../../validations/rating_product');
const { generateError } = require('../../helpers');

async function ratingProduct(req, res, next) {

  let connection;

  try {
    connection = await getConnection();
    await newRatingSchema.validateAsync(req.body);

    const id_usuario = req.auth.id;
    const id_articulo = req.params.id;

    const {
    valoracion,
    comentario,
    fecha
    } = req.body;

    const [current] = await connection.query(
      `SELECT id FROM pedidos WHERE id=?`,
      [id_articulo] );

    if (id_articulo.length) {
      throw generateError('Solo puedes hacer una valoracion del producto', 404);
    }

    await connection.query(
      `INSERT INTO ratings (id_usuario, id_articulo, valoracion, comentario, fecha)
       VALUES(?,?,?,?,NOW())`,
      [
        id_usuario,
        id_articulo,
        valoracion,
        comentario,
        fecha
      ]
    );

    res.send({
      status: 'ok',
      message: 'Valoracion añadida correctamente. Gracias por tu tiempo'
    });

  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
module.exports = { ratingProduct }; 