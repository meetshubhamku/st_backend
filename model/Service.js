const sequelize = require("../database/Connection");
const { DataTypes } = require("sequelize");
const ServiceCategory = require("./ServiceCategory");
const Service = sequelize.define(
  "service",
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
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: ServiceCategory,
        key: "id",
      },
    },
  },
  {
    // Other model options go here
    freezeTableName: true,
  }
);

Service.hasOne(ServiceCategory, { foreignKey: "id" });

module.exports = Service;
