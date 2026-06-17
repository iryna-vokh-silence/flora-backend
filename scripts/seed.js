require('dotenv').config();
const sequelize = require('../config/db');
const Bouquet = require('../models/bouquet');
const Review = require('../models/review');

const BASE_IMG = 'https://iryna-vokh-silence.github.io/flora/images';

const bouquets = [
  { title: 'Peach Meadow', description: 'A delicate blend of peach roses, tulips, and seasonal fillers — perfect for brightening any space with natural warmth.', price: '$55', photoURL: `${BASE_IMG}/bouquet-1@1x.jpg` },
  { title: 'Blush Romance', description: 'Soft pink peonies and roses arranged with eucalyptus and delicate white fillers for a timeless romantic look.', price: '$34', photoURL: `${BASE_IMG}/bouquet-2@1x.jpg` },
  { title: 'Pastel Garden', description: 'A cheerful mix of pastel-toned blooms including lavender, baby\'s breath, and soft yellow sunflowers.', price: '$40', photoURL: `${BASE_IMG}/bouquet-3@1x.jpg` },
  { title: 'Tulip Charm', description: 'A vibrant mix of tulips in warm tones, carefully arranged for a fresh and cheerful springtime feel.', price: '$35', photoURL: `${BASE_IMG}/bouquet-4@1x.jpg` },
  { title: 'Berry Bloom', description: 'Deep berry-toned roses and dahlias with lush greenery create a rich and indulgent floral display.', price: '$62', photoURL: `${BASE_IMG}/bouquet-5@1x.jpg` },
  { title: 'Sweet Whisper', description: 'Soft pastel blooms in blush and cream tones, gently arranged for a delicate and romantic presentation.', price: '$38', photoURL: `${BASE_IMG}/bouquet-6@1x.jpg` },
  { title: 'Field Joy', description: 'A cheerful bouquet inspired by sun-drenched meadows, featuring bright mixed blooms and airy greenery.', price: '$44', photoURL: `${BASE_IMG}/bouquet-7@1x.jpg` },
  { title: 'Soft Bloom', description: 'Muted tones of dusty rose and sage create a calm, understated bouquet perfect for everyday gifting.', price: '$50', photoURL: `${BASE_IMG}/bouquet-8@1x.jpg` },
  { title: 'Spring Elegance', description: 'Each stem is carefully selected to create a bouquet that radiates freshness, elegance, and the gentle charm of spring.', price: '$32', photoURL: `${BASE_IMG}/bouquet-9@1x.jpg` },
  { title: 'Berry Chic', description: 'Bold burgundy and plum blooms combined with soft textures for a modern, fashion-forward floral statement.', price: '$75', photoURL: `${BASE_IMG}/bouquet-10@1x.jpg` },
  { title: 'Lavender Dream', description: 'A soothing blend of lavender, lilac, and white blooms that bring a tranquil, dreamy quality to any space.', price: '$45', photoURL: `${BASE_IMG}/bouquet-11@1x.jpg` },
];

const reviews = [
  { author: 'Emma T.', quote: 'Flora made my anniversary unforgettable. The bouquet was absolutely stunning and arrived perfectly fresh!' },
  { author: 'Daniel R.', quote: 'Absolutely stunning bouquet! My wife was speechless. Will definitely order again.' },
  { author: 'Olivia M.', quote: 'The service was exceptional from start to finish. Beautiful flowers, fast delivery.' },
  { author: 'Sophia L.', quote: 'Our wedding centerpieces were beyond anything we imagined. Flora truly brings creativity to life.' },
  { author: 'James K.', quote: 'Ordered last minute for Mother\'s Day and they delivered perfectly. Incredible quality!' },
  { author: 'Mia P.', quote: 'They styled our office opening event beautifully. Every guest was impressed by the floral arrangements.' },
];

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: false });

    const bouquetCount = await Bouquet.count();
    if (bouquetCount === 0) {
      await Bouquet.bulkCreate(bouquets);
      console.log(`Seeded ${bouquets.length} bouquets successfully`);
    } else {
      console.log(`Database already has ${bouquetCount} bouquets. Skipping bouquets seed.`);
    }

    const reviewCount = await Review.count();
    if (reviewCount === 0) {
      await Review.bulkCreate(reviews);
      console.log(`Seeded ${reviews.length} reviews successfully`);
    } else {
      console.log(`Database already has ${reviewCount} reviews. Skipping reviews seed.`);
    }

    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exit(1);
  }
})();
