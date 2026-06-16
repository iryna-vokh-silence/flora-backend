const HttpError = require('../helpers/HttpError');

// Фабрика middleware: приймає Joi-схему і повертає middleware.
// Використовується як: router.post('/', validateBody(createSchema), controller)
const validateBody = schema => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const message = error.details.map(d => d.message).join('; ');
    return next(new HttpError(400, message));
  }
  next();
};

module.exports = validateBody;
