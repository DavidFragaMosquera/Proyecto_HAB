const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const editUserSchema = Joi.object().keys({
  login: Joi.string()
    .max(20)
    .min(2)
    .error(new Error('Tu nombre de usuario debe tener entre 2 y 20 caracteres')),

  nombre: Joi.string()
    .max(50)
    .min(2)
    .error(new Error('Tu nombre debe tener entre 2 y 50 caracteres')),

  apellidos: Joi.string()
    .max(50)
    .min(2)
    .error(new Error('Tu apellido debe tener entre 2 y 50 caracteres')),

  mail: Joi.string()
        .email()
        .error(new Error('Email no valido')),

  fecha_nacimiento: Joi.date()
    .format('YYYY-MM-DD')
    .utc()
    .error(new Error('La fecha es incorrecta',400)),

});
module.exports = {
    editUserSchema
};