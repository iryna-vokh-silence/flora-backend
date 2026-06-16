const Bouquet = require('../models/bouquet');
const HttpError = require('../helpers/HttpError');

// Увесь код роботи з БД зосереджений тут.
// Контролери лише викликають ці функції і не знають про Sequelize.

const getAll = async ({ page = 1, limit = 8 } = {}) => {
  const offset = (page - 1) * limit;
  const { rows: bouquets, count: total } = await Bouquet.findAndCountAll({
    limit,
    offset,
    order: [['id', 'ASC']],
  });
  return { bouquets, total };
};

const getById = async id => {
  const bouquet = await Bouquet.findByPk(id);
  if (!bouquet) throw new HttpError(404, 'Bouquet not found');
  return bouquet;
};

const create = async data => {
  return Bouquet.create(data);
};

const update = async (id, data) => {
  const bouquet = await Bouquet.findByPk(id);
  if (!bouquet) throw new HttpError(404, 'Bouquet not found');
  return bouquet.update(data);
};

const remove = async id => {
  const bouquet = await Bouquet.findByPk(id);
  if (!bouquet) throw new HttpError(404, 'Bouquet not found');
  await bouquet.destroy();
  return bouquet;
};

const toggleFavorite = async id => {
  const bouquet = await Bouquet.findByPk(id);
  if (!bouquet) throw new HttpError(404, 'Bouquet not found');
  return bouquet.update({ favorite: !bouquet.favorite });
};

const updatePhoto = async (id, photoURL) => {
  const bouquet = await Bouquet.findByPk(id);
  if (!bouquet) throw new HttpError(404, 'Bouquet not found');
  return bouquet.update({ photoURL });
};

module.exports = { getAll, getById, create, update, remove, toggleFavorite, updatePhoto };
