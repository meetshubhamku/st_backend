const Employee = require("../model/Employee");

exports.getAllEmployees = (req, res) => {
  Employee.findAll({
    attributes: {
      exclude: ["password", "salt"],
    },
  })
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(403).json({ error: err });
    });
};
