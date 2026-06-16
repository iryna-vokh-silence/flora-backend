const Joi = require('joi');

// createSchema — поля обов'язкові при POST.
// photoURL і favorite не вимагаються — сервер генерує їх автоматично.
const createSchema = Joi.object({
  title: Joi.string().min(1).max(255).required(),
  description: Joi.string().min(1).required(),
  price: Joi.string().min(1).max(50).required(),
  photoURL: Joi.string().uri().optional(),
  favorite: Joi.boolean().optional(),
});

// updateSchema — всі поля опціональні при PUT.
// Але хоча б одне поле має бути присутнє (перевіряється в контролері).
const updateSchema = Joi.object({
  title: Joi.string().min(1).max(255),
  description: Joi.string().min(1),
  price: Joi.string().min(1).max(50),
  photoURL: Joi.string().uri(),
  favorite: Joi.boolean(),
});

module.exports = { createSchema, updateSchema };
