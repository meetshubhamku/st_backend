const sequelize = require("../database/Connection");
const { DataTypes } = require("sequelize");
const Employee = require("./Employee");
const Service = require("./Service");
const User = require("./User");

const Appointment = sequelize.define(
  "appointment",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM([
        "Open",
        "Accepted",
        "InProcess",
        "Cancelled",
        "Closed",
      ]),
      defaultValue: "Open",
      allowNull: false,
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Employee,
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    service_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Service,
        key: "id",
      },
    },
  },
  {
    // Other model options go here
    freezeTableName: true,
  }
);

Appointment.hasOne(User, {
  foreignKey: "id",
  sourceKey: "user_id",
});
Appointment.hasOne(Service, {
  foreignKey: "id",
  sourceKey: "service_id",
});
Appointment.hasOne(Employee, {
  foreignKey: "id",
  sourceKey: "employee_id",
});
//

module.exports = Appointment;
