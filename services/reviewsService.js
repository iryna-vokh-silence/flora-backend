const Review = require('../models/review');

const getAll = async () => Review.findAll({ order: [['id', 'ASC']] });

const create = async data => Review.create(data);

module.exports = { getAll, create };
