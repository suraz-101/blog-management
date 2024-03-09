const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "name is mandatory"] },
  email: { type: String, required: [true, "email is mandatory"], unique: true },
  password: {
    type: String,
    required: [true, "password is mandatory"],
    select: false,
  },
  phoneNumber: { type: Number },
  profilePic: { type: String },

  roles: { type: [String], enum: ["user", "admin"], default: ["user"] },
  otp: { type: Number },
});

const UserModel = new mongoose.model("users", userSchema);

module.exports = UserModel;
