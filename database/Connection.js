const { Sequelize } = require("sequelize");
// const user = require("./Model/User");
const sequelize = new Sequelize("scissor_tales", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
