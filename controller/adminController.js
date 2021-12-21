const { check, validationResult } = require("express-validator");
const Movie = require("../models/Movie");
const multer = require("multer");

function getAdminPage(req, res) {
  res.render("admin", { title: "Admin Dashboard", massage: "" });
}

const UPLOAD_FOLDER = "../public/uploads";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_FOLDER);
  },
  filename: function (req, file, cb) {
    const fileExtension = path.extname(file.originalname).toLowerCase();
    const fileName =
      file.originalname
        .replace(fileExtension, "")
        .toLowerCase()
        .split(" ")
        .join("-") +
      "-" +
      Date.now();
    cb(null, fileName + fileExtension);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const fileExtension = path.extname(file.originalname).toLowerCase();
    if (file.fieldname === "avatar") {
      if (
        fileExtension === ".jpg" ||
        fileExtension === ".jpeg" ||
        file.mimetype === "image/png"
      ) {
        cb(null, true);
      } else {
        cb(new Error("only support .png, .jpeg, .jpg formatted file"));
      }
    }
  },
});

function uploadFile(req, res, next) {
  upload.any()(req, res, (err) => {
    if (err) {
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
  check("movieDate"),
  check("price"),
  check("description"),
];

function addMovie(req, res) {
  const movieData = new Movie(req.body);

  // movieData.save(function (err) {
  //   if (err) {
  //     res.status(500).render("admin", {
  //       title: "Admin Dashboard",
  //       error: "data insert fail!"
  //     });
  //   }
  // });
  // // res.redirect('/admin');
  // res.status(200).render("admin", {
  //   title: "Admin Dashboard",
  //   massage: "data insert successful!"
  // });
}

module.exports = {
  getAdminPage,
  uploadFile,
  sanitization,
  addMovie,
};
