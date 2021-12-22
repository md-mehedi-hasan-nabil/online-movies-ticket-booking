const RegisterUser = require("../models/RegisterUser");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");

function getRegisterPage(req, res, next) {
  res.render("register", {
    massage: "",
  });
}

const sanitization = [
  check("username")
    .isLength({ min: 5 })
    .withMessage("Must be at least 5 chars long")
    .trim(),
  check("email")
    .normalizeEmail()
    .isEmail()
    .withMessage("Email not valid")
    .trim()
    .custom(async (value) => {
      try {
        const user = await RegisterUser.findOne({ email: value });
      } catch {}
    }),
];

async function registerUser(req, res) {
  try {
    if (req.body.password !== req.body.retypePasword) {
      throw new Error("password not match");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new RegisterUser({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      retypePasword: req.body.retypePasword,
      mobile: req.body.mobile,
      birthday: req.body.birthday,
      gender: req.body.gender,
    });
    await newUser.save();
    res.status(500).render("register", {
      title: "Register | Create Your Account",
      massage: "SignUp successful",
    });
  } catch (err) {
    console.log(err);
    res.status(200).render("register", {
      title: "Register | Create Your Account",
      massage: "server side error!",
    });
  }
}

module.exports = {
  getRegisterPage,
  sanitization,
  registerUser,
};
