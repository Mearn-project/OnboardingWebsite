const express = require("express");
const { jwtValidation, checkIsHR } = require("../services/AuthMiddleware");
const {
  // Employee Profiles page
  getUsers,
  getUserById,
  getUsersByName,
  // Hiring Management page
  sendEmail,
  verifyRegistrationToken,
  getAllSentEmails,
  getPendingApplications,
  getRejectedApplications,
  getApprovedApplications,
  getApplicationById,
  approveApplication,
  rejectApplication,
  //   Visa Status Management page
  getVisaApprovedUsers,
  getVisaApprovedUsersByName,
  getVisaNotApprovedUsers,
  getVisaById,
  approveVisaOPTReceipt,
  approveVisaEAD,
  approveVisaI983,
  approveVisaI20,
  rejectVisaOPTReceipt,
  rejectVisaEAD,
  rejectVisaI983,
  rejectVisaI20,
  //Housing Management page
  getAllHouses,
  addCommentToReport,
  addHouse,
  deleteHouse,
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

// Get all users with approved visa
router.get("/visa/approved", jwtValidation, checkIsHR, getVisaApprovedUsers);

// case-insensitive search within visa-approved users,
// return a list of users with matched name(first or last or preferd name)
router.get(
  "/visa/approved/name/:name",
  jwtValidation,
  checkIsHR,
  getVisaApprovedUsersByName
);
// Get all users with non-approved visa
router.get(
  "/visa/not-approved",
  jwtValidation,
  checkIsHR,
  getVisaNotApprovedUsers
);

// Get visa details for a specific user
router.get("/visa/:userId", jwtValidation, checkIsHR, getVisaById);

// Approve OPT Receipt for a specific user
router.put(
  "/visa/:visaId/approve/optReceipt",
  jwtValidation,
  checkIsHR,
  approveVisaOPTReceipt
);

// Approve EAD for a specific user
router.put(
  "/visa/:visaId/approve/ead",
  jwtValidation,
  checkIsHR,
  approveVisaEAD
);

// Approve I-983 for a specific user
router.put(
  "/visa/:visaId/approve/i983",
  jwtValidation,
  checkIsHR,
  approveVisaI983
);

// Approve I-20 for a specific user
router.put(
  "/visa/:visaId/approve/i20",
  jwtValidation,
  checkIsHR,
  approveVisaI20
);

// Reject OPT Receipt for a specific user, can set feedback in req body
router.put(
  "/visa/:visaId/reject/optReceipt",
  jwtValidation,
  checkIsHR,
  rejectVisaOPTReceipt
);

// Reject EAD for a specific user, can set feedback in req body
router.put("/visa/:visaId/reject/ead", jwtValidation, checkIsHR, rejectVisaEAD);

// Reject I-983 for a specific user, can set feedback in req body
router.put(
  "/visa/:visaId/reject/i983",
  jwtValidation,
  checkIsHR,
  rejectVisaI983
);

// Reject I-20 for a specific user, can set feedback in req body
router.put("/visa/:visaId/reject/i20", jwtValidation, checkIsHR, rejectVisaI20);

// get all houses
router.get("/houses", jwtValidation, checkIsHR, getAllHouses);
// add commit to a report
router.post(
  "/report/:reportId/comment",
  jwtValidation,
  checkIsHR,
  addCommentToReport
);
// add a house
router.post("/houses/add", jwtValidation, checkIsHR, addHouse);
// Delete a house by ID
router.delete("/houses/:houseId", jwtValidation, checkIsHR, deleteHouse);

module.exports = router;
