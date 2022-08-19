const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("scissor_tales", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
  dialectOptions: {
    // Your mysql2 options here
    timezone: "local",
  },
});

// const sequelize = new Sequelize(
//   "freedb_scissor_tales",
//   "freedb_shubham",
//   "*K%5W#n9f67%9HB",
//   {
//     host: "sql.freedb.tech",
//     dialect: "mysql",
//   }
// );

module.exports = sequelize;
