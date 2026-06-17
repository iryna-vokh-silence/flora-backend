const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/ordersController');
const validateBody = require('../middleware/validateBody');
const { createSchema } = require('../schemas/orderSchemas');

router.post('/', validateBody(createSchema), ctrl.create);

module.exports = router;
