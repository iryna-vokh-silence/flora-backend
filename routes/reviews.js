const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/reviewsController');
const validateBody = require('../middleware/validateBody');
const { createSchema } = require('../schemas/reviewSchemas');

router.get('/', ctrl.getAll);
router.post('/', validateBody(createSchema), ctrl.create);

module.exports = router;
