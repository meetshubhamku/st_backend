const express = require("express");
const {
  isAuthenticated,
  isSignedIn,
  isAdmin,
} = require("../controllers/authController");
const {
  addService,
  getAllServices,
  updateService,
  deleteService,
} = require("../controllers/serviceController");
const { getUser } = require("../controllers/userController");

const router = express.Router();

router.param("user_id", getUser);
router.get(
  "/:user_id/:userType/service",
  isSignedIn,
  isAuthenticated,
  getAllServices
);
router.post(
  "/:user_id/:userType/service",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  addService
);
router.put(
  "/:user_id/:userType/service",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateService
);
router.delete(
  "/:user_id/:userType/service",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteService
);

module.exports = router;
