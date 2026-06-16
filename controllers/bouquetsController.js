const path = require('path');
const fs = require('fs/promises');
const { v4: uuidv4 } = require('uuid');
const gravatar = require('gravatar');
const service = require('../services/bouquetsService');
const HttpError = require('../helpers/HttpError');

// Контролер відповідає тільки за HTTP: читає req, викликає сервіс, відправляє res.
// Бізнес-логіка і робота з БД — у сервісі.

const getAll = async (req, res, next) => {
  try {
    // Підтримуємо обидві конвенції: json-server (_page/_limit) і REST (page/limit)
    const page = Number(req.query._page ?? req.query.page) || 1;
    const limit = Number(req.query._limit ?? req.query.limit) || 8;
    const { bouquets, total } = await service.getAll({ page, limit });
    res.set('x-total-count', total);
    res.json({ bouquets, total });
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const bouquet = await service.getById(req.params.id);
    res.json(bouquet);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    // Генеруємо photoURL через gravatar якщо не передано явно
    const photoURL =
      req.body.photoURL ??
      gravatar.url(req.body.title, { s: '400', d: 'retro' }, true);
    const bouquet = await service.create({ ...req.body, photoURL });
    res.status(201).json(bouquet);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return next(new HttpError(400, 'Body must not be empty'));
    }
    const bouquet = await service.update(req.params.id, req.body);
    res.json(bouquet);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const bouquet = await service.remove(req.params.id);
    res.json({ message: 'Bouquet deleted', bouquet });
  } catch (err) {
    next(err);
  }
};

const toggleFavorite = async (req, res, next) => {
  try {
    const bouquet = await service.toggleFavorite(req.params.id);
    res.json(bouquet);
  } catch (err) {
    next(err);
  }
};

const updatePhoto = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(new HttpError(400, 'Photo file is required'));
    }

    const { originalname, path: tempPath } = req.file;
    const ext = path.extname(originalname);
    const filename = `${uuidv4()}${ext}`;
    const photosDir = path.join(process.cwd(), 'public', 'photos');
    const finalPath = path.join(photosDir, filename);

    // Переміщуємо файл з /temp у /public/photos
    await fs.rename(tempPath, finalPath);

    const photoURL = `${process.env.BASE_URL}/photos/${filename}`;
    const bouquet = await service.updatePhoto(req.params.id, photoURL);
    res.json(bouquet);
  } catch (err) {
    // Якщо щось пішло не так — прибираємо тимчасовий файл
    if (req.file?.path) {
      await fs.unlink(req.file.path).catch(() => {});
    }
    next(err);
  }
};

module.exports = { getAll, getById, create, update, remove, toggleFavorite, updatePhoto };
