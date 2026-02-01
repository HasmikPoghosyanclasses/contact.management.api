const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: String,
  email: String,
  phone: String
});

module.exports = mongoose.model("Contact", contactSchema);
