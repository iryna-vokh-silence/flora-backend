require('dotenv').config();
const sequelize = require('../config/db');
const Bouquet = require('../models/bouquet');

// Дані з фронтенду — поля перейменовані відповідно до моделі:
// name → title, src → photoURL, alt — не зберігається
const bouquets = [
  { title: 'Peach Meadow', description: 'A delicate blend of peach roses, tulips, and seasonal fillers — perfect for brightening any space with natural warmth.', price: '$55', photoURL: 'https://res.cloudinary.com/demo/image/upload/bouquet-1.jpg' },
  { title: 'Blush Romance', description: 'Soft pink peonies and roses arranged with eucalyptus and delicate white fillers for a timeless romantic look.', price: '$34', photoURL: 'https://res.cloudinary.com/demo/image/upload/bouquet-2.jpg' },
  { title: 'Pastel Garden', description: 'A cheerful mix of pastel-toned blooms including lavender, baby\'s breath, and soft yellow sunflowers.', price: '$40', photoURL: 'https://res.cloudinary.com/demo/image/upload/bouquet-3.jpg' },
  { title: 'Spring Elegance', description: 'Each stem is carefully selected to create a bouquet that radiates freshness, elegance, and the gentle charm of spring.', price: '$35', photoURL: 'https://res.cloudinary.com/demo/image/upload/bouquet-4.jpg' },
  { title: 'Ivory Dream', description: 'A sophisticated all-white arrangement featuring gardenias, white roses, and lisianthus with lush greenery.', price: '$62', photoURL: 'https://res.cloudinary.com/demo/image/upload/bouquet-5.jpg' },
  { title: 'Lavender Mist', description: 'A calming arrangement of lavender stems, purple statice, and soft white blooms that bring serenity to any room.', price: '$38', photoURL: 'https://res.cloudinary.com/demo/image/upload/bouquet-6.jpg' },
  { title: 'Golden Sunrise', description: 'Bright sunflowers and golden yellow chrysanthemums paired with lush greenery for a warm and joyful display.', price: '$44', photoURL: 'https://res.cloudinary.com/demo/image/upload/bouquet-7.jpg' },
  { title: 'Coral Sunset', description: 'A vibrant bouquet of coral and orange roses with deep burgundy accents, evoking the beauty of a warm evening sky.', price: '$50', photoURL: 'https://res.cloudinary.com/demo/image/upload/bouquet-8.jpg' },
  { title: 'Wildflower Charm', description: 'A loosely gathered bundle of wildflowers including chamomile, cornflowers, and poppy buds for a natural rustic feel.', price: '$32', photoURL: 'https://res.cloudinary.com/demo/image/upload/bouquet-9.jpg' },
  { title: 'Midnight Rose', description: 'Deep red and black roses arranged with dark foliage for a dramatic and luxurious statement bouquet.', price: '$75', photoURL: 'https://res.cloudinary.com/demo/image/upload/bouquet-10.jpg' },
];

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    await sequelize.sync({ alter: false });

    const count = await Bouquet.count();
    if (count > 0) {
      console.log(`Database already has ${count} bouquets. Skipping seed.`);
      process.exit(0);
    }

    await Bouquet.bulkCreate(bouquets);
    console.log(`Seeded ${bouquets.length} bouquets successfully`);
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exit(1);
  }
})();
