const mongoose = require("mongoose");
const { Schema } = mongoose;

const adminSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    imageURL: {
      type: String,
      trim: true,
      required: true,
    },
    movieDate: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;
