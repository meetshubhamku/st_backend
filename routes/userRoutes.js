const express = require("express");
const {
  isSignedIn,
  isAuthenticated,
  isAdmin,
} = require("../controllers/authController");
const {
  getAllUser,
  getUser,
  blockUser,
  unBlockUser,
} = require("../controllers/userController");

const router = express.Router();

router.param("user_id", getUser);
router.get(
  "/:user_id/:userType/users",
  isSignedIn,
  isAuthenticated,
  getAllUser
);

router.post(
  "/:user_id/:userType/user/block",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  blockUser
);
router.post(
  "/:user_id/:userType/user/unblock",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  unBlockUser
);

module.exports = router;
