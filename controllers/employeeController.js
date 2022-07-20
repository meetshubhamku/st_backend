const { Op } = require("sequelize");
const Employee = require("../model/Employee");

exports.getAllEmployees = (req, res) => {
  Employee.findAll({
    where: {
      [Op.not]: [
        {
          role: 2,
        },
      ],
    },
    attributes: {
      exclude: ["password", "salt"],
    },
  })
    .then((data) => {
      return res.status(200).json({
        data,
        success: true,
      });
    })
    .catch((err) => {
      return res.status(403).json({ error: err, success: false });
    });
};
