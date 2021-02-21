const express = require("express");
const router = express.Router();

//MODEL
const MovieModel = require("../models/Movie");

//GET
router.get("/", (req, res) => {
  res.send("GET request to the moviePage");
});

//POST
router.post("/", function (req, res) {
  const movie = new MovieModel(req.body);
  movie.save((err, data) => {
    if (err) {
      res.json(err);
    }
    res.json(data);
  });
});

module.exports = router;
