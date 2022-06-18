const User = require("../model/User");
const Employee = require("../model/Employee");

exports.getUser = async (req, res, next, user_id) => {
  const { userType } = req.params;
  if (!userType) {
    res.status(403).json({
      error: "Invalid Request",
      message: "Invalid Request",
    });
  }
  let user = null;
  if (userType === "customer") {
    user = await User.findByPk(user_id, {
      attributes: {
        exclude: ["password", "salt"],
      },
    });
  } else if (userType === "employee") {
    user = await Employee.findByPk(user_id, {
      attributes: {
        exclude: ["password", "salt"],
      },
    });
  } else {
    res.status(404).json({
      error: "Invalid user",
      message: "User not found",
    });
  }

  if (!user) {
    return res.status(403).json({
      error: "Access Denied",
      message: "Access Denied",
    });
  }

  req.profile = user;
  next();
};

exports.getAllUser = (req, res) => {
  User.findAll({
    attributes: {
      exclude: ["password", "salt"],
    },
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(403).json({ error: err });
    });
};
