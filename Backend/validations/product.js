const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const { generateError } = require('../helpers');

const newProductSchema = Joi.object().keys({

  descripcion: Joi.string()
    .max(1000)
    .required()
    .error(generateError('No puedes escribir más de 1000 caracteres', 400)),

  precio: Joi.number()
    .required()
    .error(generateError('El precio es obligatorio y solo puede ser de tipo numerico', 400)),

  tipo: Joi.string()
    .required()
    .error(generateError('Tipo de producto incorrecto', 400)),

  subtipo: Joi.string()
    .required()
    .error(generateError('Tipo de producto incorrecto', 400)),

  fecha_inicio: Joi.date()
  .format('YYYY-MM-DD')
  .utc()
  .error(generateError('Formato de fecha incorrecto', 400)),

  fecha_fin: Joi.date()
  .format('YYYY-MM-DD')
  .utc()
  .error(generateError('Formato de fecha incorrecto', 400)),

  nombre_articulo: Joi.string()
  .max(1000)
  .required()
  .error(generateError('El nombre del articulo no puede tener más de 100 caracteres', 400)),
});
module.exports = { newProductSchema };