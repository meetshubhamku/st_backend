const User = require("../model/User");

exports.getUser = async (req, res, next, user_id) => {
  const user = await User.findByPk(user_id, {
    attributes: {
      exclude: ["password", "salt"],
    },
  });
  if (!user) {
    res.status(403).json({
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
