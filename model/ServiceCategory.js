const sequelize = require("../database/Connection");
const { DataTypes } = require("sequelize");
const Service = require("./Service");
const ServiceCategory = sequelize.define(
  "service_category",
  {
    // Model attributes are defined here
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

module.exports = ServiceCategory;
