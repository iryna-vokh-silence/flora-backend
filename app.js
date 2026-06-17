const express = require('express');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const bouquetsRouter = require('./routes/bouquets');
const ordersRouter = require('./routes/orders');
const reviewsRouter = require('./routes/reviews');
const errorHandler = require('./middleware/errorHandler');
const Review = require('./models/review');

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


// Тимчасовий endpoint для сіду відгуків
app.get('/seed-reviews', async (req, res) => {
  const reviews = [
    { author: 'Emma T.', quote: 'Flora made my anniversary unforgettable with their beautiful arrangement!' },
    { author: 'Daniel R.', quote: 'Absolutely stunning bouquet! It looked even better than the photo and arrived right on time.' },
    { author: 'Olivia M.', quote: 'The service was exceptional, and the flowers were fresh!' },
    { author: 'Sophia L.', quote: 'Our wedding centerpieces were beyond what we imagined — guests are still asking who did the florals.' },
    { author: 'James K.', quote: "Ordered last minute for Mother's Day — fast delivery and the bouquet lasted over a week." },
    { author: 'Mia P.', quote: 'They styled our office opening with modern arrangements — professional, punctual, and kind.' },
  ];
  const count = await Review.count();
  if (count > 0) return res.json({ message: `Already has ${count} reviews. Skipping.` });
  await Review.bulkCreate(reviews);
  res.json({ message: `Seeded ${reviews.length} reviews` });
});

// 404 для невідомих маршрутів
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Централізований обробник помилок — завжди останнім
app.use(errorHandler);

module.exports = app;
