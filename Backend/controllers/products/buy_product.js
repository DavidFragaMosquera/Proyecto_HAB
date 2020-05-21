require('dotenv').config();
const { getConnection } = require('../../db');
const { buyProductSchema } = require('../../validations/buy_product');
const { generateError } = require('../../helpers');

async function buyProduct(req, res, next) {

    let connection;

    try {
      connection = await getConnection();
      await buyProductSchema.validateAsync(req.body);

      const  id_usuario  = req.auth.id;
      const id_articulo = req.params.id;
        
      const {
        precio,
        direccion,
        fecha_envio,
        fecha_inicio,
        fecha_fin
      } = req.body;

      const [current] = await connection.query(
        'SELECT disponibilidad, id FROM articulos where id=?',
        [id_articulo]);
      
      if (current[0].disponibilidad === 0){
          throw generateError('Este articulo no está disponible');
      }

      if (id_usuario !== req.auth.id ) {
          throw generateError('No tienes permisos para comprar. Logueate', 401);
        } 
        await connection.query(`UPDATE articulos SET disponibilidad=0, fecha_fin=? where id=?`, 
    [fecha_fin, id_articulo]);
       
      await connection.query(
        `INSERT INTO pedidos (id_usuario, id_articulo, precio, direccion, fecha_envio, fecha_inicio, fecha_fin) 
      VALUES  (?,?,?,?,?,?,?)`,
        
        [
          id_usuario,
          id_articulo,
          precio,
          direccion,
          fecha_envio, 
          fecha_inicio, 
          fecha_fin
        ]
      );
  
      res.send({
        status: 'ok',
        message: 'Tu compra se ha realizado correctamente. En unos momentos recibiras un mail de confirmación de la misma. Gracias :)'
      });

    } catch (error) {
      next(error);
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }
  module.exports = { buyProduct };