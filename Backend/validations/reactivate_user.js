const Joi = require('@hapi/joi');
const { generateError } = require('../helpers');

const loginUser = Joi.string()
  .min(2)
  .max(20)
  .required()
  .error(generateError('UserName field must have between 2 and 20 types', 400));

const passwordSchema = Joi.string()
  .min(6)
  .max(100)
  .required()
  .error(new Error('La contraseña debe tener ente 6 y 10 caracteres'));

  const reactivateUserSchema = Joi.object().keys({
    login: loginUser,
    password: passwordSchema
  });

  const recoveryPasswordSchema = Joi.object().keys({
   mail: Joi.string().email().required().error(new Error('Email no valido'))
  });

  module.exports = {
    reactivateUserSchema, recoveryPasswordSchema
  };