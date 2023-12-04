const express = require("express");
const { jwtValidation, checkIsHR } = require("../services/AuthMiddleware");
const {
  getUsers,
  getUserById,
  getUsersByName,
  //   getInProgressUsers,
  //   getApprovedUsers,
  sendEmail,
  verifyRegistrationToken,
  getAllSentEmails,
  getPendingApplications,
  getRejectedApplications,
  getApprovedApplications,
  getApplicationById,
  approveApplication,
  rejectApplication,
} = require("../controllers/HRController.js");
const router = express.Router();

// return a list of all approved users
router.get("/", jwtValidation, checkIsHR, getUsers);
// return one user with specified userId
router.get("/id/:userId", jwtValidation, checkIsHR, getUserById);
// case-insensitive search within approved users,
// return a list of users with matched name(first or last or preferd name)
router.get("/name/:name", jwtValidation, checkIsHR, getUsersByName);

// router.get("/visa/inProgress", getInProgressUsers);
// router.get("/visa/approved", getApprovedUsers);

// HR generate a token and send email to an email address(in req body) to allow user to register
router.post("/register", jwtValidation, checkIsHR, sendEmail);
// get all HR sent emails (with status registered or unregistered)
router.get("/emails", jwtValidation, checkIsHR, getAllSentEmails);
// get all pending applications
router.get(
  "/applications/pending",
  jwtValidation,
  checkIsHR,
  getPendingApplications
);
// get all rejected applications
router.get(
  "/applications/rejected",
  jwtValidation,
  checkIsHR,
  getRejectedApplications
);
// get all approved applications
router.get(
  "/applications/approved",
  jwtValidation,
  checkIsHR,
  getApprovedApplications
);
// return one application with specified applicationId
router.get(
  "/applications/:applicationId",
  jwtValidation,
  checkIsHR,
  getApplicationById
);
// approve an application
router.put(
  "/applications/:applicationId/approve",
  jwtValidation,
  checkIsHR,
  approveApplication
);
// reject an application
router.put(
  "/applications/:applicationId/reject",
  jwtValidation,
  checkIsHR,
  rejectApplication
);

module.exports = router;
