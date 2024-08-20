const Joi = require('joi');

const noHTMLPattern = /^[^<>]*$/;

const roleSchema = Joi.object({
  name: Joi.string().alphanum().lowercase().required(),
  description: Joi.string().pattern(noHTMLPattern).required(),
});

module.exports = roleSchema;
