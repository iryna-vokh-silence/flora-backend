require('dotenv').config();
const app = require('./app');
const sequelize = require('./config/db');

const PORT = process.env.PORT ?? 3000;

// Спочатку підключаємось до БД, і тільки після успіху запускаємо сервер.
// sync({ alter: false }) не змінює існуючу таблицю, тільки створює якщо немає.
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection successful');
    return sequelize.sync({ alter: false });
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  });
