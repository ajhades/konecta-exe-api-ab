const Joi = require('joi');

const noHTMLPattern = /^[^<>]*$/;

const loginSchema = Joi.object({
  username: Joi.string().pattern(noHTMLPattern).required(),
  password: Joi.string().required(),
});

module.exports = { loginSchema };
