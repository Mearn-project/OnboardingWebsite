const Visa = require("../models/Visa");
const User = require("../models/User");
const fs = require("fs");
const s3 = require("../utils/aws");
const path = require("path");
const { decodeToken } = require("../utils/generateToken");

const getVisaInfo = async (req, res) => {
  try {
    let userId;
    if (req.headers.cookie) {
      const cookie = req.headers.cookie;
      const token = cookie.slice(6);
      userId = decodeToken(token);
    }

    const existUser = await User.findById(userId);
    if (!existUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = await User.findById(userId).populate("visa");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.visa);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateVisaInfo = async (req, res) => {
  try {
    let userId;
    if (req.headers.cookie) {
      const cookie = req.headers.cookie;
      const token = cookie.slice(6);
      userId = decodeToken(token);
    }

    const existUser = await User.findById(userId);
    if (!existUser) {
      return res.status(404).json({ message: "User not found" });
    }
    // const updatedFile = req.body;
    const { files } = req;
    const user = await User.findById(userId).populate("visa");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let fileUrl = "";

    const uploadPromises = Object.keys(files).map(async (key) => {
      if (Array.isArray(files[key])) {
        const file = files[key][0];
        // console.log(file)

        const fileName = file.fieldname;

        const params = {
          Bucket: "my-onboarding-project",
          Key: `${file.originalname}`,
          Body: fs.createReadStream(path.normalize(file.path)),
          ACL: "public-read",
        };

        return new Promise((resolve, reject) => {
          s3.upload(params, async (err, data) => {
            if (err) {
              // console.log(params);
              console.error("Error uploading file:", err);
              reject(err);
            } else {
              console.log("File uploaded successfully:", data.Location);

              fileUrl = data.Location;

              resolve();
            }
          });
        });
      }
    });

    try {
      await Promise.all(uploadPromises);
      // console.log(applicationDetails)

      if (updatedData === "optReceipt") {
        user.visa.optReceipt = {
          status: "Pending",
          feedback: "",
          url: fileUrl,
        };
      }
      if (updatedData === "optEAD") {
        user.visa.optEAD = {
          status: "Pending",
          feedback: "",
          url: fileUrl,
        };
      }
      if (updatedData === "i983") {
        user.visa.i983 = {
          status: "Pending",
          feedback: "",
          url: fileUrl,
        };
      }
      if (updatedData === "i20") {
        user.visa.optEAD = {
          status: "Pending",
          feedback: "",
          url: fileUrl,
        };
      }

      await user.save();

      res.json({ message: "Visa status updated successfully" });
    } catch (error) {
      console.error("Error submitting application:", error);
      res.status(500).json({ message: "Failed to submit application" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getVisaInfo, updateVisaInfo };
