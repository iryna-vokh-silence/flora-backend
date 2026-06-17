const service = require('../services/ordersService');

const create = async (req, res, next) => {
  try {
    const order = await service.create(req.body);
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

module.exports = { create };
