const express = require("express");
const {
  isAuthenticated,
  isSignedIn,
  isAdmin,
} = require("../controllers/authController");
const { makePayment } = require("../controllers/paymentController");

const { getUser } = require("../controllers/userController");

const router = express.Router();
router.param("user_id", getUser);

router.post(
  "/:user_id/:userType/payment",
  isSignedIn,
  isAuthenticated,
  makePayment
);

module.exports = router;
