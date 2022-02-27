const sequelize = require("./Connection");
const User = require("../model/User");
const Employee = require("../model/Employee");
const Category = require("../model/Category");

User.sync();
Employee.sync();
Category.sync();

module.exports = { sequelize, User, Employee, Category };
