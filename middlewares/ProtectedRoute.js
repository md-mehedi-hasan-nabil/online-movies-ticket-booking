const jwt = require("jsonwebtoken");

async function ProtectedRoute(req, res, next) {
  const cookies =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
  if (cookies) {
    try {
      token = cookies[process.env.COOKIE_NAME];
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;

      if (res.locals.html) {
        res.locals.loggedInUser = decode;
      }
      next();
    } catch (error) {
      if (res.locals.html) {
        res.redirect("/login");
      } else {
        res.status(401).json({
          errors: {
            common: {
              msg: "Authentication fail!",
            },
          },
        });
      }
    }
  } else {
    if (res.locals.html) {
        res.redirect("/login");
      } else {
        res.status(401).json({
          errors: {
            common: {
              msg: "Authentication fail!",
            },
          },
        });
      }
  }
}

module.exports = ProtectedRoute;
