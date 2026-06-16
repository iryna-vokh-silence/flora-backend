const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/bouquetsController');
const validateBody = require('../middleware/validateBody');
const upload = require('../middleware/upload');
const { createSchema, updateSchema } = require('../schemas/bouquetSchemas');

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/', validateBody(createSchema), ctrl.create);
router.put('/:id', validateBody(updateSchema), ctrl.update);
router.delete('/:id', ctrl.remove);
router.patch('/:id/favorite', ctrl.toggleFavorite);
router.patch('/:id/photo', upload.single('photo'), ctrl.updatePhoto);

module.exports = router;
