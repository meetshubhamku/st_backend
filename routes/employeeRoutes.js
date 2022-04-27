const express = require("express");
const {
  isAuthenticated,
  isSignedIn,
} = require("../controllers/authController");
const { getAllEmployees } = require("../controllers/employeeController");

const router = express.Router();

router.get("/employees", isSignedIn, getAllEmployees);

module.exports = router;
