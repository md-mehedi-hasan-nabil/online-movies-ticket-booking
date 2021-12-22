const createError = require("http-errors");
const multer = require("multer");
const path = require("path");

const UPLOAD_FOLDER = `${__dirname}/../public/uploads`;

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
  limits: 5000000,
  fileFilter: function (req, file, cb) {
    const fileExtension = path.extname(file.originalname).toLowerCase();
    // if (file.fieldname === "avatar") {
    if (
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, true);
    } else {
      cb(createError("only support .png, .jpeg, .jpg formatted file"));
    }
    // }
  },
});

module.exports = upload;
