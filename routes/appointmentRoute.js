const express = require("express");
const {
  isAuthenticated,
  isSignedIn,
  isAdmin,
} = require("../controllers/authController");
const {
  getAppointments,
  addAppointment,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointmentController");
const { getUser } = require("../controllers/userController");

const router = express.Router();

router.param("user_id", getUser);
router.get(
  "/:user_id/:userType/appointments",
  isSignedIn,
  isAuthenticated,
  getAppointments
);
router.post(
  "/:user_id/:userType/appointment",
  isSignedIn,
  isAuthenticated,
  addAppointment
);
router.put(
  "/:user_id/:userType/appointment",
  isSignedIn,
  isAuthenticated,
  updateAppointment
);
router.delete(
  "/:user_id/:userType/appointment",
  isSignedIn,
  isAuthenticated,
  deleteAppointment
);

module.exports = router;
