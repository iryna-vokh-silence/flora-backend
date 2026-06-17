const service = require('../services/reviewsService');

const getAll = async (req, res, next) => {
  try {
    const reviews = await service.getAll();
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const review = await service.create(req.body);
    res.status(201).json(review);
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, create };
