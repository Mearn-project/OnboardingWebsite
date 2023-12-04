const User = require("../models/User");
const Email = require("../models/Email");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const {
  generateToken,
  generateRegisterToken,
  decodeRegisterToken,
} = require("../utils/generateToken");

const EMAIL_ADD = process.env.EMAIL_ADD;
const EMAIL_PWD = process.env.EMAIL_PWD;

// Visa Status Management page

const getUsers = async (req, res) => {
  try {
    // Fetch users with applicationStatus set to "Approved"
    const users = await User.find({ applicationStatus: "Approved" }).sort({
      lastName: 1,
    });

    // Send the users and total number as a JSON response
    res.json({ users, totalEmployees: users.length });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    // Check if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).json({ error: "Invalid user ID" });
    }
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getUsersByName = async (req, res) => {
  try {
    const query = req.params.name;

    // Perform a case-insensitive search for users with applicationStatus set to "Approved"
    const users = await User.find({
      $and: [
        {
          $or: [
            { firstName: { $regex: query, $options: "i" } },
            { lastName: { $regex: query, $options: "i" } },
            { preferredName: { $regex: query, $options: "i" } },
          ],
        },
        { applicationStatus: "Approved" },
      ],
    });

    res.json(users);
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Hiring Management page
const sendEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const token = generateRegisterToken(email);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_ADD,
        pass: EMAIL_PWD,
      },
    });

    console.log(__dirname);
    // href should be front-end page
    const mailOptions = {
      from: EMAIL_ADD,
      to: email,
      subject: "Registration Link",
      html: `
            <p>Hello,</p>
            <p>Click the following link to register your account: </p>
            <a href="http://localhost:3000/api/HR/register/${token}">Register your account</a>
            `,
    };
    const newEmail = new Email({
      email,
    });

    // Save the Email document to the database
    newEmail
      .save()
      .then((result) => {
        console.log("Email saved:", result);
      })
      .catch((error) => {
        console.error("Error saving email:", error);
      });
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending registration email:", err);
        return res
          .status(500)
          .json({ message: "Failed to send registration email" });
      } else {
        console.log("Registration email sent:", info.response);
        return res.status(201).json({ message: "Registration email sent" });
      }
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to send registration email" });
  }
};

const verifyRegistrationToken = async (req, res, next) => {
  const { token } = req.params;

  try {
    const decodedToken = decodeRegisterToken(token);
    if (!decodedToken) {
      return res.status(400).json({ message: "Invalid registration token" });
    }

    if (decodedToken.exp < Date.now() / 1000) {
      return res
        .status(400)
        .json({ message: "Registration token has expired" });
    }

    req.tokenData = decodedToken;
    next();
  } catch (error) {
    console.error("Failed to verify registration token:", error);
    return res.status(500).json({ message: error.message });
  }
};

const getAllSentEmails = async (req, res) => {
  try {
    // Find all emails
    const allEmails = await Email.find();

    res.json({ allEmails });
  } catch (error) {
    console.error("Error fetching emails:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getPendingApplications = async (req, res) => {
  try {
    // Find users with 'Pending' application status
    const usersWithPendingApplications = await User.find({
      applicationStatus: "Pending",
    });

    // Extract application information from each user
    const pendingApplications = usersWithPendingApplications.map(
      (user) => user.application
    );

    // Send the pending applications as a JSON response
    res.json({ pendingApplications });
  } catch (error) {
    console.error("Error fetching pending applications:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getRejectedApplications = async (req, res) => {
  try {
    // Find users with 'Rejected' application status
    const usersWithRejectedApplications = await User.find({
      applicationStatus: "Rejected",
    });

    // Extract application information from each user
    const rejectedApplications = usersWithRejectedApplications.map(
      (user) => user.application
    );

    // Send the rejected applications as a JSON response
    res.json({ rejectedApplications });
  } catch (error) {
    console.error("Error fetching rejected applications:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getApprovedApplications = async (req, res) => {
  try {
    // Find users with 'Approved' application status
    const usersWithApprovedApplications = await User.find({
      applicationStatus: "Approved",
    });

    // Extract application information from each user
    const approvedApplications = usersWithApprovedApplications.map(
      (user) => user.application
    );

    // Send the approved applications as a JSON response
    res.json({ approvedApplications });
  } catch (error) {
    console.error("Error fetching approved applications:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getApplicationById = async (req, res) => {
  try {
    const applicationId = req.params.applicationId;

    // Check if applicationId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
      return res.status(404).json({ error: "Invalid application ID" });
    }

    // Find the user with the specified application ID
    const userWithApplication = await User.findOne({
      application: applicationId,
    });

    if (!userWithApplication) {
      return res.status(404).json({ error: "Application not found" });
    }

    // Extract application information from the user
    const application = userWithApplication.application;

    return res.status(200).json({
      application,
    });
  } catch (error) {
    console.error("Error fetching application by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to approve an application by ID
const approveApplication = async (req, res) => {
  try {
    const applicationId = req.params.applicationId;

    // Check if applicationId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
      return res.status(404).json({ error: "Invalid application ID" });
    }

    // Find the user with the specified application ID
    const userWithApplication = await User.findOne({
      application: applicationId,
    });

    if (!userWithApplication) {
      return res.status(404).json({ error: "Application not found" });
    }

    // Update the application status to 'Approved'
    userWithApplication.applicationStatus = "Approved";
    await userWithApplication.save();

    return res.status(200).json({
      message: "Application approved successfully",
    });
  } catch (error) {
    console.error("Error approving application:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to reject an application by ID with feedback
const rejectApplication = async (req, res) => {
  try {
    const applicationId = req.params.applicationId;
    const feedback = req.body.feedback; // Assuming feedback is sent in the request body

    // Check if applicationId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
      return res.status(404).json({ error: "Invalid application ID" });
    }

    // Find the user with the specified application ID
    const userWithApplication = await User.findOne({
      application: applicationId,
    });

    if (!userWithApplication) {
      return res.status(404).json({ error: "Application not found" });
    }

    // Update the application status to 'Rejected', save feedback, and update the application subdocument
    userWithApplication.applicationStatus = "Rejected";
    // userWithApplication.feedback = feedback;
    userWithApplication.feedback = feedback;
    await userWithApplication.save();

    return res.status(200).json({
      message: "Application rejected successfully",
    });
  } catch (error) {
    console.error("Error rejecting application:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  getUsers,
  getUserById,
  getUsersByName,
  sendEmail,
  verifyRegistrationToken,
  getAllSentEmails,
  getPendingApplications,
  getRejectedApplications,
  getApprovedApplications,
  getApplicationById,
  approveApplication,
  rejectApplication,
};
