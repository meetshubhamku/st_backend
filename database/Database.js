const sequelize = require("./Connection");
const User = require("../model/User");
const Employee = require("../model/Employee");
const Service = require("../model/Service");
const Offer = require("../model/Offer");
const Category = require("../model/ServiceCategory");
const ServiceOffer = require("../model/ServiceOffer");

User.sync({
  alter: false,
});
Employee.sync({
  alter: false,
});

Category.sync({
  alter: false,
});

Service.sync({
  alter: false,
});
Offer.sync({
  alter: false,
});
ServiceOffer.sync({
  alter: false,
});

module.exports = {
  sequelize,
  User,
  Employee,
  Category,
  Service,
  Offer,
  ServiceOffer,
};
