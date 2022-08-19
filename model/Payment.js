const sequelize = require("../database/Connection");
const { DataTypes } = require("sequelize");
const Category = require("./ServiceCategory");
const Appointment = require("./Appointment");
const Payment = sequelize.define(
  "payment",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    transaction_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    receipt_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    appointment_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Appointment,
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
Payment.hasOne(Appointment, {
  foreignKey: "id",
  sourceKey: "appointment_id",
});
module.exports = Payment;
