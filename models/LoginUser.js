const mongoose = require("mongoose");
const { Schema } = mongoose;

const loginUserSchema = new Schema(
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
    availableTicket: {
      type: Number,
      min: 1,
      max: 30,
      required: true,
    },
    availableDate: {
      type: Date,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const LoginUser = mongoose.model("login", loginUserSchema);

module.exports = LoginUser;
