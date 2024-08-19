const Joi = require('joi');

const noHTMLPattern = /^[^<>]*$/;

const applicationSchema = Joi.object({
  code: Joi.string().pattern(noHTMLPattern).required(),
  description: Joi.string().pattern(noHTMLPattern).required(),
  resume: Joi.string().pattern(noHTMLPattern).required(),
  employee_id: Joi.number().integer().required(),
});

module.exports = applicationSchema;
