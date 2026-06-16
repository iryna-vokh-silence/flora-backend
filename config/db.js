const { Sequelize } = require('sequelize');

// Sequelize підключається до PostgreSQL через DATABASE_URL з .env.
// ssl: rejectUnauthorized: false потрібно для Neon та Render хостингів.
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

module.exports = sequelize;
