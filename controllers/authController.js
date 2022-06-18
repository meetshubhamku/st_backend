const User = require("../model/User");
const Employee = require("../model/Employee");
const { createHmac } = require("crypto");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const { json } = require("body-parser");
const config = require("../config.json");

// signup module
exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      params: errors.array()[0].param,
    });
  }

  let { firstname, lastname, role, password, email, is_blocked, userType } =
    req.body;
  const salt = uuidv4();
  password = pass_encryptor(password, salt); //Encrypting password

  if (userType === "employee") {
    Employee.create({
      firstname,
      lastname,
      role,
      password,
      email,
      salt,
      is_blocked,
    })
      .then((data) => {
        return res.status(200).json({
          message: "Signup successful.",
          success: true,
        });
      })
      .catch((error) => {
        return res.json({
          error: error.errors[0],
          message: error.errors[0].message,
        });
      });
  } else if (userType === "customer") {
    User.create({
      firstname,
      lastname,
      role,
      password,
      email,
      salt,
      is_blocked,
    })
      .then((data) => {
        return res.status(200).json({
          message: "Signup successful.",
          success: true,
        });
      })
      .catch((error) => {
        return res.json({
          error: error.errors[0],
          message: error.errors[0].message,
        });
      });
  }
};

exports.signin = (req, res) => {
  const { email, password, userType } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      params: errors.array()[0].param,
    });
  }

  if (userType === "customer") {
    User.findOne({ where: { email } })
      .then((data) => {
        data = data.toJSON();

        if (data.password === pass_encryptor(password, data.salt)) {
          const token = jwt.sign({ id: data.id }, config.default.SECRET);
          res.cookie("ScissorTalesToken", token, { expire: new Date() + 9999 });
          return res.json({
            success: true,
            token,
            user: {
              id: data.id,
              firstname: data.firstname,
              lastname: data.lastname,
              email: data.email,
              role: data.role,
              is_blocked: data.is_blocked,
              userType: userType,
            },
          });
        } else {
          return res.json({
            success: false,
            message: "Invalid User.",
          });
        }
      })
      .catch((error) => {
        return res.json({
          success: false,
          message: "Invalid User",
          error,
        });
      });
  } else if (userType === "employee") {
    Employee.findOne({ where: { email } })
      .then((data) => {
        data = data.toJSON();

        if (data.password === pass_encryptor(password, data.salt)) {
          const token = jwt.sign({ id: data.id }, config.default.SECRET);
          res.cookie("ScissorTalesToken", token, { expire: new Date() + 9999 });
          return res.json({
            success: true,
            token,
            user: {
              id: data.id,
              firstname: data.firstname,
              lastname: data.lastname,
              email: data.email,
              role: data.role,
              is_blocked: data.is_blocked,
              userType: userType,
            },
          });
        } else {
          return res.json({
            error: "Invalid credentials.",
          });
        }
      })
      .catch((err) => {
        return res.json({
          error: "Invalid user.",
        });
      });
  }
};

exports.signout = (req, res) => {
  res.clearCookie("ScissorTalesToken");
  res.send("Signout Successful");
};

exports.isSignedIn = expressJwt({
  secret: config.default.SECRET,
  userProperty: "auth",
});

exports.isAuthenticated = (req, res, next) => {
  const checker = req.profile && req.auth && req.profile.id == req.auth.id;
  if (!checker) {
    return res.status(403).json({
      error: "Access Denied. Please Login",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role !== 2) {
    return res.status(403).json({
      error: "Not an ADMIN, Access DENIED",
    });
  }
  next();
};

const pass_encryptor = (plainPassword, salt) => {
  return createHmac("sha256", salt).update(plainPassword).digest("hex");
};
