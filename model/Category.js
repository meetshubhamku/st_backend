const { DataTypes } = require("sequelize");
const sequelize = require("../database/Connection");
const Category = sequelize.define(
  "category",
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    // Other model options go here
    freezeTableName: true,
  }
);
module.exports = Category;
