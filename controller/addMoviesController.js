const { check, validationResult } = require("express-validator");
const path = require("path");
const { unlink } = require("fs");

const Movie = require("../models/Movie");
const upload = require("../middlewares/uploadMulterObject");

function getAddMoviesPage(req, res) {
  res.render("addMovies",);
}

function uploadFile(req, res, next) {
  // call the middleware function
  upload.any()(req, res, (err) => {
    if (err) {
      // console.log(err);
      res.status(500).json({
        errors: {
          avatar: {
            msg: err.message,
          },
        },
      });
    } else {
      next();
    }
  });
}

const sanitization = [
  check("name").isLength({ min: 1 }).withMessage("name is required"),
  check("avatar")
    .isLength({ min: 0, max: 50 })
    .withMessage("image name 50 length must be content"),
  check("movieDate").isDate().withMessage("give correct date"),
  check("price")
    .isNumeric()
    .isLength({ min: 0, max: 1000 })
    .withMessage("must be number"),
  check("description")
    .isLength({ min: 1, max: 200 })
    .withMessage("100 length must be content"),
];

function sanitizationResult(req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // remove uploaded file
    if (req.files.length > 0) {
      const { filename } = req.files[0];
      unlink(path.join(`${__dirname}/../public/uploads/${filename}`), (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
    // response error
    res.status(500).json({
      errors: mappedErrors,
    });
  }
}

function addMovie(req, res) {
  const movieData = new Movie({
    name: req.body.name,
    avatar: req.files[0].filename,
    movieDate: req.body.movieDate,
    price: req.body.price,
    description: req.body.description,
  });

  movieData.save(function (err) {
    if (err) {
      res.status(500).json({
        errors: {
          common: {
            msg: "server side error",
          },
        },
      });
    } else {
      res.status(200).json({ msg: "Movie post Successful..." });
    }
  });
}

function getAllAuthUser() {}

module.exports = {
  getAddMoviesPage,
  uploadFile,
  sanitization,
  sanitizationResult,
  addMovie,
};
