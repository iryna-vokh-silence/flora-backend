require('dotenv').config();
const sequelize = require('../config/db');
const Bouquet = require('../models/bouquet');

const BASE_IMG = 'https://iryna-vokh-silence.github.io/flora/images';

const photoMap = {
  'Peach Meadow':    `${BASE_IMG}/bouquet-1@1x.jpg`,
  'Blush Romance':   `${BASE_IMG}/bouquet-2@1x.jpg`,
  'Pastel Garden':   `${BASE_IMG}/bouquet-3@1x.jpg`,
  'Spring Elegance': `${BASE_IMG}/bouquet-4@1x.jpg`,
  'Ivory Dream':     `${BASE_IMG}/bouquet-5@1x.jpg`,
  'Lavender Mist':   `${BASE_IMG}/bouquet-6@1x.jpg`,
  'Golden Sunrise':  `${BASE_IMG}/bouquet-7@1x.jpg`,
  'Coral Sunset':    `${BASE_IMG}/bouquet-8@1x.jpg`,
  'Wildflower Charm':`${BASE_IMG}/bouquet-9@1x.jpg`,
  'Midnight Rose':   `${BASE_IMG}/bouquet-10@1x.jpg`,
};

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: false });

    const bouquets = await Bouquet.findAll();
    let updated = 0;

    for (const bouquet of bouquets) {
      const photoURL = photoMap[bouquet.title];
      if (photoURL) {
        await bouquet.update({ photoURL });
        updated++;
      }
    }

    console.log(`Updated ${updated} bouquets`);
    process.exit(0);
  } catch (err) {
    console.error('Failed:', err.message);
    process.exit(1);
  }
})();
