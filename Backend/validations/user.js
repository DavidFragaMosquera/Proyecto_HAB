const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

//Aqui comprobamos los requerimientos de la contraseña y del usuario
const passwordSchema = Joi.string()
  .min(6)
  .max(100)
  .required()
  .error(new Error('La contraseña debe tener ente 6 y 10 caracteres'));

const newUserSchema = Joi.object().keys({
  login: Joi.string()
    .max(20)
    .min(2)
    .required()
    .error(new Error('Tu nombre de usuario debe tener entre 2 y 20 caracteres')),

  nombre: Joi.string()
    .max(50)
    .min(2)
    .required()
    .error(new Error('Tu nombre debe tener entre 2 y 50 caracteres')),

  apellidos: Joi.string()
    .max(50)
    .min(2)
    .required()
    .error(new Error('Tu apellido debe tener entre 2 y 50 caracteres')),

  mail: Joi.string().email().required().error(new Error('Email no valido')),

  fecha_nacimiento: Joi.date()
    .format('YYYY-MM-DD')
    .utc()
    .required()
    .error(new Error('La fecha es incorrecta')),

  password: passwordSchema
});
module.exports = {
  newUserSchema
};