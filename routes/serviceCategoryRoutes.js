const express = require("express");
const {
  isAuthenticated,
  isSignedIn,
  isAdmin,
} = require("../controllers/authController");
const {
  addServiceCategory,
  deleteServiceCategory,
  getAllServicesCategory,
  updateServiceCategory,
} = require("../controllers/serviceCategoryController");
const { getUser } = require("../controllers/userController");

const router = express.Router();

router.param("user_id", getUser);
router.get(
  "/:user_id/:userType/service-category",
  isSignedIn,
  isAuthenticated,
  getAllServicesCategory
);
router.post(
  "/:user_id/:userType/service-category",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  addServiceCategory
);
router.put(
  "/:user_id/:userType/service-category",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateServiceCategory
);
router.delete(
  "/:user_id/:userType/service-category",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteServiceCategory
);

module.exports = router;
