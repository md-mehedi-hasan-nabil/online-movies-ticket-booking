const createError = require("http-errors");

// 404 not found handler
function notFoundHandler(req, res, next) {
  console.log("404")
  next(createError(404, "404 not found"));
}

// default error handler
function errorhandler(err, req, res, next) {
  console.log(err)
  res.locals.errors = process.env.NODE_ENV === "development" ? err : { message: err.message };
  res.status(err.status || 500);
  if (res.locals.html) {
    // html response
    res.render("error", {
      title: "Error Page",
    });
  } else {
    // json response
    res.json(res.locals.errors );
  }
}

module.exports = {
  notFoundHandler,
  errorhandler,
};
