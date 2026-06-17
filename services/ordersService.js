const Order = require('../models/order');

const create = async data => Order.create(data);

module.exports = { create };
