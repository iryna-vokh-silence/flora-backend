const express = require('express');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const bouquetsRouter = require('./routes/bouquets');
const ordersRouter = require('./routes/orders');
const reviewsRouter = require('./routes/reviews');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Роздача статичних файлів (завантажені фото)
app.use('/photos', express.static(path.join(__dirname, 'public', 'photos')));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Маршрути
app.use('/api/bouquets', bouquetsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/reviews', reviewsRouter);


// 404 для невідомих маршрутів
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Централізований обробник помилок — завжди останнім
app.use(errorHandler);

module.exports = app;
