const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const { generateError } = require('../helpers');

const newRatingSchema = Joi.object().keys({

  comentario: Joi.string()
    .max(1000)
    .error(generateError('No puedes escribir más de 1000 caracteres', 400)),

  fecha: Joi.date()
    .format('YYYY-MM-DD')
    .utc()
    .error(new Error('La fecha es incorrecta',400)),

  valoracion: Joi.number()
    .min(1)
    .max(5)
    .integer()
    .required()
    .error(new Error('El numero de valoración debe estar comprendido entre 1 y 5'))   

});
module.exports = { newRatingSchema }; 