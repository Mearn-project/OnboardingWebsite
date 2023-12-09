const User = require("../models/User");
const Email = require("../models/Email");
const Visa = require("../models/Visa");
const House = require("../models/House");
const Application = require("../models/Application");
const FacilityReport = require("../models/FacilityReport");
const Comment = require("../models/Comment");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
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
    // Fetch users with applicationStatus set to "Approved" and populate the application field
    const users = await User.find({ applicationStatus: "Approved" })
      .populate("application") // This will populate the 'application' field with the actual application data
      .sort({ lastName: 1 });

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
    const user = await User.findById(userId).populate("application");

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

    // Fetch all users and populate the 'application' field
    const users = await User.find().populate("application");

    // Filter users based on the specified criteria
    const filteredUsers = users.filter((user) => {
      const application = user.application;

      return (
        user.applicationStatus === "Approved" &&
        application &&
        (application.firstName.toLowerCase().includes(query.toLowerCase()) ||
          application.lastName.toLowerCase().includes(query.toLowerCase()) ||
          application.preferredName.toLowerCase().includes(query.toLowerCase()))
      );
    });

    res.json(filteredUsers);
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
            <a href="http://localhost:4200/register/${token}">Register your account</a>
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
    }).populate("application");

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
    }).populate("application");

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
    // Find users with 'Approved' application status and populate the 'application' field
    const usersWithApprovedApplications = await User.find({
      applicationStatus: "Approved",
    }).populate("application");

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

    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    res.status(200).json({ application });
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

const getVisaApprovedUsers = async (req, res) => {
  try {
    // Fetch users with all visa fields set to "Approved"
    const users = await User.find({
      visaStatus: "Approved",
    })
      .populate("visa")
      .populate("application");

    // Send the users as a JSON response
    res.json({ users });
  } catch (error) {
    console.error("Error fetching visa-approved users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getVisaApprovedUsersByName = async (req, res) => {
  try {
    const query = req.params.name;

    // Fetch all users and populate the 'application' and 'visa' fields
    const users = await User.find().populate("application").populate("visa");

    // Filter users based on the specified criteria
    const filteredUsers = users.filter((user) => {
      const application = user.application;
      const visa = user.visa;

      return (
        visa &&
        user.visaStatus === "Approved" &&
        application &&
        (application.firstName.toLowerCase().includes(query.toLowerCase()) ||
          application.lastName.toLowerCase().includes(query.toLowerCase()) ||
          application.preferredName.toLowerCase().includes(query.toLowerCase()))
      );
    });

    res.json(filteredUsers);
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getVisaNotApprovedUsers = async (req, res) => {
  try {
    // Fetch users with visaStatus not set to "Approved"
    const users = await User.find({
      visaStatus: "Not Approved",
      visa: { $exists: true, $ne: null },
    })
      .populate("visa") // Populate the 'visa' field to get the complete visa information
      .populate("application"); // Optionally, you can populate the 'application' field as well

    // Send the users as a JSON response
    res.json({ users });
  } catch (error) {
    console.error("Error fetching visa-not-approved users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getVisaById = async (req, res) => {
  try {
    const visaId = req.params.visaId;

    const visa = await Visa.findById(visaId);

    if (!visa) {
      return res.status(404).json({ error: "Visa not found" });
    }

    res.status(200).json({ visa });
  } catch (error) {
    console.error("Error fetching visa by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const approveVisaOPTReceipt = async (req, res) => {
  try {
    const visaId = req.params.visaId;

    const visa = await Visa.findById(visaId);

    if (!visa) {
      return res.status(404).json({ error: "Visa not found" });
    }

    visa.optReceipt.status = "Approved";

    await visa.save();

    res.status(200).json({ message: "Visa OPT Receipt approved successfully" });
  } catch (error) {
    console.error("Error approving Visa OPT Receipt:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const approveVisaEAD = async (req, res) => {
  try {
    const visaId = req.params.visaId;

    const visa = await Visa.findById(visaId);

    if (!visa) {
      return res.status(404).json({ error: "Visa not found" });
    }

    visa.optEAD.status = "Approved";

    await visa.save();

    res.status(200).json({ message: "Visa EAD approved successfully" });
  } catch (error) {
    console.error("Error approving Visa EAD:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const approveVisaI983 = async (req, res) => {
  try {
    const visaId = req.params.visaId;

    const visa = await Visa.findById(visaId);

    if (!visa) {
      return res.status(404).json({ error: "Visa not found" });
    }

    visa.i983.status = "Approved";

    await visa.save();

    res.status(200).json({ message: "Visa I-983 approved successfully" });
  } catch (error) {
    console.error("Error approving Visa I-983:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const approveVisaI20 = async (req, res) => {
  try {
    const visaId = req.params.visaId;

    const visa = await Visa.findById(visaId);

    if (!visa) {
      return res.status(404).json({ error: "Visa not found" });
    }

    // Update the status of i20 in the visa
    visa.i20.status = "Approved";

    // Save the changes to the visa
    await visa.save();

    // If i20 is approved, update user's visaStatus to "Approved"
    const user = await User.findOne({ visa: visaId });

    if (user) {
      user.visaStatus = "Approved";
      await user.save();
    }

    res.status(200).json({ message: "Visa I-20 approved successfully" });
  } catch (error) {
    console.error("Error approving Visa I-20:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const rejectVisaOPTReceipt = async (req, res) => {
  try {
    const visaId = req.params.visaId;
    const { feedback } = req.body;
    const visa = await Visa.findById(visaId);

    if (!visa) {
      return res.status(404).json({ error: "Visa not found" });
    }

    visa.optReceipt.status = "Rejected";
    visa.optReceipt.feedback = feedback;
    await visa.save();

    res.status(200).json({ message: "Visa OPT Receipt rejected successfully" });
  } catch (error) {
    console.error("Error rejecting Visa OPT Receipt:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const rejectVisaEAD = async (req, res) => {
  try {
    const visaId = req.params.visaId;
    const { feedback } = req.body;
    const visa = await Visa.findById(visaId);

    if (!visa) {
      return res.status(404).json({ error: "Visa not found" });
    }

    visa.optEAD.status = "Rejected";
    visa.optEAD.feedback = feedback;
    await visa.save();

    res.status(200).json({ message: "Visa EAD rejected successfully" });
  } catch (error) {
    console.error("Error rejecting Visa EAD:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const rejectVisaI983 = async (req, res) => {
  try {
    const visaId = req.params.visaId;
    const { feedback } = req.body;
    const visa = await Visa.findById(visaId);

    if (!visa) {
      return res.status(404).json({ error: "Visa not found" });
    }

    visa.i983.status = "Rejected";
    visa.i983.feedback = feedback;
    await visa.save();

    res.status(200).json({ message: "Visa I-983 rejected successfully" });
  } catch (error) {
    console.error("Error rejecting Visa I-983:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const rejectVisaI20 = async (req, res) => {
  try {
    const visaId = req.params.visaId;
    const { feedback } = req.body;
    const visa = await Visa.findById(visaId);

    if (!visa) {
      return res.status(404).json({ error: "Visa not found" });
    }

    visa.i20.status = "Rejected";
    visa.i20.feedback = feedback;
    await visa.save();

    res.status(200).json({ message: "Visa I-983 rejected successfully" });
  } catch (error) {
    console.error("Error rejecting Visa I-983:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllHouses = async (req, res) => {
  try {
    // Fetch all houses from MongoDB and populate references
    const houses = await House.find().populate({
      path: "residents facilityReports",
      populate: {
        path: "application", // Specify the field you want to populate
        model: "User",
        options: { strictPopulate: false }, // Set strictPopulate to false
      },
    });
    res.json(houses);
  } catch (error) {
    console.error("Error fetching houses:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addCommentToReport = async (req, res) => {
  try {
    const { reportId } = req.params;
    const { description } = req.body;
    const userId = req.body.userId; // Assuming you have user information in req.user
    // Check if reportId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(reportId)) {
      return res.status(404).json({ error: "Invalid report ID" });
    }
    // Create a new Comment
    const newComment = new Comment({
      description,
      createdBy: userId,
      timestamp: Date.now(),
    });

    // Save the new comment to the database
    await newComment.save();

    // Find the facility report by ID
    const report = await FacilityReport.findById(reportId);

    if (!report) {
      return res.status(404).json({ error: "Facility report not found" });
    }

    // Push the new comment's ID to the report
    report.comments.push(newComment._id);

    // Save the updated report
    await report.save();

    res.status(200).json({ message: "Comment added successfully", report });
  } catch (error) {
    console.error("Error adding comment to report:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const addHouse = async (req, res) => {
  try {
    const { address, landlord } = req.body;

    // Check if a house with the given address already exists
    const existingHouse = await House.findOne({ address });

    if (existingHouse) {
      // If a house with the same address already exists, return an error
      return res
        .status(400)
        .json({ error: "Duplicate address. House not added." });
    }

    // Create a new house instance with the provided landlord information
    const newHouse = new House({
      address,
      residents: [],
      facilityReports: [],
      landlord,
    });

    // Save the new house to the database
    await newHouse.save();

    res
      .status(201)
      .json({ message: "House added successfully", house: newHouse });
  } catch (error) {
    console.error("Error adding house:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteHouse = async (req, res) => {
  try {
    const houseId = req.params.houseId;

    // Check if houseId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(houseId)) {
      return res.status(404).json({ error: "Invalid house ID" });
    }

    // Find the house by ID and remove it
    const deletedHouse = await House.findByIdAndDelete(houseId);

    if (!deletedHouse) {
      return res.status(404).json({ error: "House not found" });
    }

    res
      .status(200)
      .json({ message: "House deleted successfully", deletedHouse });
  } catch (error) {
    console.error("Error deleting house:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  // Employee Profiles page

  getUsers,
  getUserById,
  getUsersByName,
  //   Hiring Management page
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
};
