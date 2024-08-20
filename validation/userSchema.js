const Joi = require('joi');

const noHTMLPattern = /^[^<>]*$/;

const userSchema = Joi.object({
  username: Joi.string().pattern(noHTMLPattern).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role_id: Joi.number().integer().required(),
});

module.exports = userSchema;
