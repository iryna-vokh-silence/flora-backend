const Joi = require('joi');

const createSchema = Joi.object({
  name: Joi.string().min(1).max(255).required(),
  phone: Joi.string().min(1).max(50).required(),
  address: Joi.string().max(500).optional().allow(''),
  message: Joi.string().max(1000).optional().allow(''),
});

module.exports = { createSchema };
