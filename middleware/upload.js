const multer = require('multer');
const path = require('path');

// Multer зберігає файл у /temp з оригінальним іменем.
// Переміщення у /public/photos відбувається в контролері після успішної обробки.
const storage = multer.diskStorage({
  destination: path.join(process.cwd(), 'temp'),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only jpeg, png and webp images are allowed'), false);
  }
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

module.exports = upload;
