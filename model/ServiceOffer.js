const sequelize = require("../database/Connection");
const { DataTypes } = require("sequelize");
const Service = require("./Service");
const Offer = require("./Offer");

const ServiceOffer = sequelize.define(
  "service_offer",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    service_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Service,
        key: "id",
      },
    },
    offer_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Offer,
        key: "id",
      },
    },
  },
  {
    // Other model options go here
    freezeTableName: true,
  }
);

ServiceOffer.hasMany(Service, {
  sourceKey: "service_id",
  foreignKey: "id",
});

ServiceOffer.hasMany(Offer, {
  sourceKey: "offer_id",
  foreignKey: "id",
});

module.exports = ServiceOffer;
