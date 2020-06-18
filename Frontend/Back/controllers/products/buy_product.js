require('dotenv').config();
const { getConnection } = require('../../db');
const { buyProductSchema } = require('../../validations/buy_product');
const { generateError,  formatDateToDB,  purchaseConfirmation } = require('../../helpers');
const { differenceInDays } = require('date-fns'); 

async function buyProduct(req, res, next) {

    let connection;

    try {
      connection = await getConnection();
      await buyProductSchema.validateAsync(req.body);

      const  id_usuario  = req.auth.id;
      const id_articulo = req.params.id; 
        
      const {
        direccion,
        fecha_inicio,
        fecha_fin
      } = req.body;

      const [current] = await connection.query(
        'SELECT disponibilidad, imagen, nombre_articulo, precio, id FROM articulos where id=?',
        [id_articulo]);

      const fecha_fin_alquiler = new Date(req.body.fecha_fin);

      const fecha_inicio_alquiler = new Date(req.body.fecha_inicio);
  
      const diasAlquiler = differenceInDays(fecha_fin_alquiler, fecha_inicio_alquiler);
    
      const precioTotal = (diasAlquiler) * (current[0].precio);
     
      if (fecha_inicio_alquiler >= fecha_fin_alquiler) {
          throw generateError(`La fecha fin no puede ser antes que la fecha inicio :S`)
      }    

      if (current[0].disponibilidad === 0){
          const fechaDisponibilidad = formatDateToDB(fecha_fin_alquiler)
          throw generateError(`Este articulo no está disponible hasta el dia ${fechaDisponibilidad}`);
      }

      if (fecha_fin_alquiler  <= new Date()){
         await connection.query (`UPDATE articulos SET disponibilidad=1, fecha_fin=NULL WHERE id=?
          `, [id_articulo]);
       }       
       
      await connection.query(
        `INSERT INTO pedidos (id_usuario, id_articulo, precio, direccion, fecha_inicio, fecha_fin) 
      VALUES  (?,?,?,?,?,?)`,
        
        [
          id_usuario,
          id_articulo,
          precioTotal,
          direccion, 
          fecha_inicio, 
          fecha_fin
        ]
      );
            
      await connection.query(`UPDATE articulos SET disponibilidad=0, fecha_fin=? where id=?`, 
      [fecha_fin, id_articulo]);
      res.send({
        status: 'ok',
        message: 'Tu compra se ha realizado correctamente. En unos momentos recibiras un mail de confirmación de la misma. Gracias por confiar en nosotros:)'
      });

      const [userData] = await connection.query(`SELECT mail FROM usuarios WHERE id=?`, [id_usuario]);
      

      try {
        await purchaseConfirmation({
          email: userData[0].mail,
          title: "Compra Picsfy",
          content: `Gracias por confiar en nosotros, aqui tienes tu procuto! ${current[0].nombre_articulo}`,
        });

      } catch (error) {
        console.error(error);
        throw new Error("Error en el mail. Prueba más tarde");
      } 

    } catch (error) {
      next(error);
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }
  module.exports = { buyProduct };