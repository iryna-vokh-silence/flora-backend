const express = require('express');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const bouquetsRouter = require('./routes/bouquets');
const errorHandler = require('./middleware/errorHandler');
const Bouquet = require('./models/bouquet');

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

// Тимчасовий endpoint для виправлення фото
app.get('/fix-photos', async (req, res) => {
  const BASE = 'https://iryna-vokh-silence.github.io/flora/images';
  const updates = [
    [1, `${BASE}/bouquet-1@1x.jpg`],
    [2, `${BASE}/bouquet-2@1x.jpg`],
    [3, `${BASE}/bouquet-3@1x.jpg`],
    [4, `${BASE}/bouquet-4@1x.jpg`],
    [5, `${BASE}/bouquet-5@1x.jpg`],
    [6, `${BASE}/bouquet-6@1x.jpg`],
    [7, `${BASE}/bouquet-7@1x.jpg`],
    [8, `${BASE}/bouquet-8@1x.jpg`],
    [9, `${BASE}/bouquet-9@1x.jpg`],
    [10, `${BASE}/bouquet-10@1x.jpg`],
  ];
  for (const [id, photoURL] of updates) {
    await Bouquet.update({ photoURL }, { where: { id } });
  }
  res.json({ message: 'Photos fixed' });
});

// 404 для невідомих маршрутів
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Централізований обробник помилок — завжди останнім
app.use(errorHandler);

module.exports = app;
