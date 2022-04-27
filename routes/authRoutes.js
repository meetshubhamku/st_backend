const express = require("express");
const { signup, signin, signout } = require("../controllers/authController");
const { body } = require("express-validator");

const router = express.Router();

router.post(
  "/signup",
  [
    body(
      "firstname",
      "firstname must have minimum length of 2 characters"
    ).isLength({
      min: 2,
    }),
    body(
      "firstname",
      "firstname must containe only alphabets and no space"
    ).isAlpha(),
    body(
      "lastname",
      "lastname must have minimum length of 2 characters"
    ).isLength({
      min: 2,
    }),
    body(
      "lastname",
      "lastname must containe only alphabets and no space"
    ).isAlpha(),
    body("email", "Please enter a valid email").isEmail(),
    body("role", "Role must be of type numeric").isNumeric(),
    body("password", "Password must contain minimum 6 characters").isLength({
      min: 6,
    }),
  ],
  signup
);

router.post(
  "/signin",
  [
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Password must contain minimum 6 characters").isLength({
      min: 6,
    }),
  ],
  signin
);

router.get("/signout", signout);

module.exports = router;
