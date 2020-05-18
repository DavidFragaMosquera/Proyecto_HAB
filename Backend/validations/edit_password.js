const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const { generateError } = require('../helpers');
const { passwordSchema } = require('./user');

const editPasswordSchema = Joi.object().keys({
  oldPassword: passwordSchema,
  newPassword: passwordSchema,
  newPasswordRepeat: Joi.any()
    .valid(Joi.ref('newPassword'))
    .error(generateError('Las contraseñas deben coincidir', 400))
});

module.exports = { editPasswordSchema };