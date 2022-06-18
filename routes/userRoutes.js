const express = require("express");
const { isSignedIn } = require("../controllers/authController");
const { getAllUser, getUser } = require("../controllers/userController");

const router = express.Router();

router.param("user_id", getUser);
router.get("/users", isSignedIn, getAllUser);

module.exports = router;
