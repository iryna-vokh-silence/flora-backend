const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Review = sequelize.define(
  'Review',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    author: { type: DataTypes.STRING, allowNull: false },
    quote: { type: DataTypes.TEXT, allowNull: false },
  },
  { tableName: 'reviews', timestamps: false }
);

module.exports = Review;
