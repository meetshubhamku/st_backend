const sequelize = require("./Connection");
const User = require("../model/User");
const Employee = require("../model/Employee");
const Category = require("../model/Category");
const Service = require("../model/Service");
const ServiceCategory = require("../model/ServiceCategory");

User.sync({
  alter: true,
});
Employee.sync({
  alter: true,
});
Category.sync({
  alter: true,
});
Service.sync({
  alter: true,
});
ServiceCategory.sync({
  alter: true,
});

module.exports = {
  sequelize,
  User,
  Employee,
  Category,
  Service,
  ServiceCategory,
};
