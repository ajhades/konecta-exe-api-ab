const Joi = require('joi');

const employeeSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  hire_date: Joi.date().required(),
  salary: Joi.number().integer().required(),
  user_id: Joi.number().integer().required(),
});

module.exports = employeeSchema;
