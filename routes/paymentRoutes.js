const express = require("express");
const {
  isAuthenticated,
  isSignedIn,
  isAdmin,
} = require("../controllers/authController");
const {
  makePayment,
  savePayment,
  getPayment,
} = require("../controllers/paymentController");

const { getUser } = require("../controllers/userController");

const router = express.Router();
router.param("user_id", getUser);

router.post(
  "/:user_id/:userType/payment",
  isSignedIn,
  isAuthenticated,
  makePayment
);
router.post(
  "/:user_id/:userType/payment/save",
  isSignedIn,
  isAuthenticated,
  savePayment
);
router.get(
  "/:user_id/:userType/payment",
  isSignedIn,
  isAuthenticated,
  getPayment
);

module.exports = router;
