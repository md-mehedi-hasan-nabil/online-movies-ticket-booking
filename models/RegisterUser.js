const mongoose = require("mongoose");
const { Schema } = mongoose;

const registerUserSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user"
    },
  },
  {
    timestamps: true,
  }
);

const RegisterUser = mongoose.model("register", registerUserSchema);

module.exports = RegisterUser;
