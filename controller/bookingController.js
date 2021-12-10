const fs = require("fs");

function getBookingPage(req, res) {
  const id = req.params.id;
  fs.readFile(`${__dirname}/json/movies.json`, "utf8", function (err, data) {
    if (err) {
      res.status(404).send("file read fail");
    } else {
      const array = JSON.parse(data).find((obj) => obj._id == id);
      res.render("booking", { title: "Booking Page", data: [array] });
    }
  });
}

function ticketBooking(req, res) {
  console.log(req.body)

  res.send(req.body)
}

module.exports = {
    getBookingPage,
    ticketBooking
}
