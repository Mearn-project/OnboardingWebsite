const mongoose = require("mongoose");

// Define the Email schema
const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ["Registered", "Unregistered"],
    default: "Unregistered",
  },
});

// Create the Email model
const Email = mongoose.model("Email", emailSchema);

// Export the model
module.exports = Email;
