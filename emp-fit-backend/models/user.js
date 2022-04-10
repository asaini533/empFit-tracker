const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String },
  googleId: { type: String },
  designation: { type: String },
  image: { type: String },
  age: { type: Number },
  email: { type: String },
  healthData: { type: Object },
});

module.exports = mongoose.model("user", userSchema);
