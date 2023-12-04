const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  feedback: {
    type: String,
  },
});

const Application = mongoose.model("Application", ApplicationSchema);
module.exports = Application;
