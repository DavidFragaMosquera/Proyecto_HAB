const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));


const passwordSchema = Joi.string()
  .min(6)
  .max(100)
  .required()
  .error(new Error('Field must have between 6 and 50 types'));

const newUserSchema = Joi.object().keys({
  nombre: Joi.string()
    .max(50)
    .required()
    .error(new Error('Field must have between 2 and 50 types')),
  apellidos: Joi.string()

    .max(50)
    .min(2)
    .required()
    .error(new Error('Field must have between 2 and 50 types')),
  mail: Joi.string().email().required().error(new Error('Email not valid')),
  fecha_nacimiento: Joi.date()
    .format('YYYY-MM-DD')
    .utc()
    .required()
    .error(new Error('Date is wrong')),

  password: passwordSchema
});
module.exports = {
  newUserSchema
};