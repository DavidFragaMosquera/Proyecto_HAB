const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const { generateError } = require('../helpers');

const buyProductSchema = Joi.object().keys({
   
    direccion: Joi.string()
    .required()
    .max(50)
    .min(2)
    .error(new Error('La dirección debe tener entre 2 y 50 caracteres')),

    fecha_inicio: Joi.date()
    .required()
    .format('YYYY-MM-DD')
    .utc()
    .error(new Error('La fecha es incorrecta',400)),

    fecha_fin: Joi.date()
    .required()
    .format('YYYY-MM-DD')
    .utc()
    .error(new Error('La fecha es incorrecta',400)),

});
  module.exports = { buyProductSchema };