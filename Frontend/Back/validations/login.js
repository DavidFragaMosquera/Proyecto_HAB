const Joi = require('@hapi/joi');
const { generateError } = require('../helpers');

const loginUser = Joi.string()
  .min(2)
  .max(20)
  .required()
  .error(generateError('El nombre de usuario debe tener entre 2 y 20 caracteres', 400));

const passwordSchema = Joi.string()
  .min(6)
  .max(100)
  .required()
  .error(new Error('La contraseña debe tener ente 6 y 10 caracteres'));

  const loginSchema = Joi.object().keys({
    login: loginUser,
    password: passwordSchema
  });

  module.exports = {
    loginSchema
  };