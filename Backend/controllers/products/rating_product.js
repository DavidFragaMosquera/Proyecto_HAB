require('dotenv').config();
const { getConnection } = require('../../db');
const { newRatingSchema } = require('../../validations/rating_product');
const { generateError } = require('../../helpers');

async function ratingProduct(req, res, next) {

  let connection;

  try {
    connection = await getConnection();
    await newRatingSchema.validateAsync(req.body);

    const id_pedido = req.params.id;

    const {
    valoracion,
    comentario
    } = req.body;

    const [current] = await connection.query(`SELECT id_usuario, id_articulo FROM pedidos WHERE id=?`, 
    [id_pedido]);

    if( !current.length ){
      throw generateError('El pedido no existe', 401);
    }

    const[pedidoData] = current;

    if( req.auth.id !== pedidoData.id_usuario){
      throw generateError('No tienes permiso para valorar este pedido :(', 401);
    }

    const [existingValoration] = await connection.query(`SELECT id FROM ratings WHERE id_pedido=?`,
    [id_pedido]);

    if (existingValoration.length){
      throw generateError(' Este pedido ya ha sido valorado', 401);
    }

    await connection.query(
      `INSERT INTO ratings (id_articulo, 
                            id_pedido, 
                            valoracion, 
                            comentario, 
                            fecha)
      VALUES(?,?,?,?,NOW())`,
      [
        pedidoData.id_articulo,
        id_pedido,
        valoracion,
        comentario
      ]);

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