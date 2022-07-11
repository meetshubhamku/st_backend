const sequelize = require("../database/Connection");
const { DataTypes } = require("sequelize");
const Category = sequelize.define(
  "category",
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
  },
  {
    // Other model options go here
    freezeTableName: true,
  }
);

module.exports = Category;
