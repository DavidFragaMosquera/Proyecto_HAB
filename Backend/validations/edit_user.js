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

  fecha_nacimiento: Joi.date()
    .format('YYYY-MM-DD')
    .utc()
    .error(new Error('La fecha es incorrecta',400)),

  direccion: Joi.string()
    .max(50)
    .min(2)
    .error(new Error('La dirección debe tener entre 2 y 50 caracteres')),

  telefono: Joi.string()
    .max(14)
    .min(9)
    .error(new Error('El telefono debe tener entre 9 y 14 caracteres')),

  mail: Joi.string()
    .email()
    .error(new Error('Email no valido')),
  
  descripcion: Joi.string()
    .max(1000)
    .error(new Error('La descripción no puede tener más de 1000 caracteres')),

});
module.exports = {
    editUserSchema
};