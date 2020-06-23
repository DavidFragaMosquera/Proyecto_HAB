const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const { generateError } = require('../helpers');

const editProductSchema = Joi.object().keys({

  descripcion: Joi.string()
    .max(1000)
    .required()
    .error(generateError('No puedes escribir más de 1000 caracteres', 400)),

  precio: Joi.number()
    .required()
    .error(generateError('El precio es obligatorio y solo puede ser de tipo numerico', 400)),

  nombre_articulo: Joi.string()
  .max(1000)
  .required()
  .error(generateError('El nombre del articulo no puede tener más de 100 caracteres', 400)),
});
module.exports = { editProductSchema };