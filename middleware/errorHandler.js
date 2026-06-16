// Централізований обробник помилок Express.
// Має бути підключений останнім у app.js після всіх маршрутів.
const errorHandler = (err, req, res, next) => {
  const status = err.status ?? 500;
  const message = err.message ?? 'Internal Server Error';
  res.status(status).json({ message });
};

module.exports = errorHandler;
