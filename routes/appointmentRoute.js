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
  getAppointmentsByDate,
  cancelAppointment,
  getAppointmentsByUser,
  getAppointmentsByServiceCount,
  getAppointmentsByServiceAndDate,
  getAppointmentByOpenStatus,
  getAppointmentsByMonth,
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
  "/:user_id/:userType/appointments/status/open",
  isSignedIn,
  isAuthenticated,
  getAppointmentByOpenStatus
);
router.post(
  "/:user_id/:userType/appointments/date",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAppointmentsByDate
);
router.post(
  "/:user_id/:userType/appointments/date/month",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAppointmentsByMonth
);
router.post(
  "/:user_id/:userType/appointments/service/count",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAppointmentsByServiceCount
);

router.post(
  "/:user_id/:userType/appointments/service/date",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAppointmentsByServiceAndDate
);
router.post(
  "/:user_id/:userType/appointment",
  isSignedIn,
  isAuthenticated,
  addAppointment
);
router.post(
  "/:user_id/:userType/appointment/cancel",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  cancelAppointment
);
router.post(
  "/:user_id/:userType/appointment/user",
  isSignedIn,
  isAuthenticated,
  getAppointmentsByUser
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
