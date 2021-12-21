const mongoose = require("mongoose");
const { Schema } = mongoose;

const movieSchema = new Schema(
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

const Movie = mongoose.model("movies", movieSchema);

module.exports = Movie;
