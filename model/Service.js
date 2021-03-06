const sequelize = require("../database/Connection");
const { DataTypes } = require("sequelize");
const Category = require("./ServiceCategory");
const Service = sequelize.define(
  "service",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: true,
        min: 1,
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Category,
        key: "id",
      },
    },
  },
  {
    // Other model options go here
    freezeTableName: true,
  }
);
//
Service.hasOne(Category, {
  foreignKey: "id",
  sourceKey: "category_id",
});

module.exports = Service;
