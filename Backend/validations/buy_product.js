const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const { generateError } = require('../helpers');

const buyProductSchema = Joi.object().keys({

    precio: Joi.number()
    .required()
    .error(generateError('El precio es obligatorio y solo puede ser de tipo numerico', 400)),
   
    direccion: Joi.string()
    .max(50)
    .min(2)
    .error(new Error('La dirección debe tener entre 2 y 50 caracteres')),

    fecha_envio: Joi.date()
    .format('YYYY-MM-DD')
    .utc()
    .error(new Error('La fecha es incorrecta',400)),

    fecha_inicio: Joi.date()
    .format('YYYY-MM-DD')
    .utc()
    .error(new Error('La fecha es incorrecta',400)),

    fecha_fin: Joi.date()
    .format('YYYY-MM-DD')
    .utc()
    .error(new Error('La fecha es incorrecta',400)),

});
  module.exports = { buyProductSchema };