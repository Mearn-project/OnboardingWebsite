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
    const visa = await Visa.findById(user.visa._id);
    if (!visa) {
      return res.status(404).json({ message: "User not found" });
    }

    let fileUrl = "";
    let preview = "";
    let updatedData = "";

    const uploadPromises = Object.keys(files).map(async (key) => {
      if (Array.isArray(files[key])) {
        const file = files[key][0];
        // console.log(file)

        updatedData = file.fieldname;

        const params = {
          Bucket: "revsawsbucket",
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

              const previewParams = {
                Bucket: "revsawsbucket",
                Key: `${file.originalname}`,
                ResponseContentType: "application/pdf",
                ResponseContentDisposition: "inline",
              };

              preview = s3.getSignedUrl("getObject", previewParams);

              resolve();
            }
          });
        });
      }
    });

    try {
      await Promise.all(uploadPromises);
      // console.log(applicationDetails)
      console.log(fileUrl);

      if (updatedData === "optReceipt") {
        visa.optReceipt = {
          status: "Pending",
          feedback: "",
          url: fileUrl,
          previewUrl: preview,
        };
      }
      if (updatedData === "optEAD") {
        visa.optEAD = {
          status: "Pending",
          feedback: "",
          url: fileUrl,
          previewUrl: preview,
        };
      }
      if (updatedData === "i983") {
        visa.i983 = {
          status: "Pending",
          feedback: "",
          url: fileUrl,
          previewUrl: preview,
        };
      }
      if (updatedData === "i20") {
        visa.i20 = {
          status: "Pending",
          feedback: "",
          url: fileUrl,
          previewUrl: preview,
        };
      }

      await visa.save();

      res.json({
        documentType: updatedData,
        message: "Visa status updated successfully",
      });
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
