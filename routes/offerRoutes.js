const express = require("express");
const {
  isAuthenticated,
  isSignedIn,
  isAdmin,
} = require("../controllers/authController");
const {
  addOffer,
  getOffer,
  updateOffer,
  deleteOffer,
} = require("../controllers/offerController");
const { getUser } = require("../controllers/userController");
const router = express.Router();
router.param("user_id", getUser);

router.get("/:user_id/:userType/offer", isSignedIn, isAuthenticated, getOffer);

router.post(
  "/:user_id/:userType/offer",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateOffer
);

router.put(
  "/:user_id/:userType/offer",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateOffer
);

router.delete(
  "/:user_id/:userType/offer",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteOffer
);

module.exports = router;
