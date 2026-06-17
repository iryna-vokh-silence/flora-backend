const Joi = require('joi');

const createSchema = Joi.object({
  author: Joi.string().min(1).max(255).required(),
  quote: Joi.string().min(1).max(1000).required(),
});

module.exports = { createSchema };
