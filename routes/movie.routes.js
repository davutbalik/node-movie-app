const express = require("express");
const router = express.Router();

//MODEL
const MovieModel = require("../models/Movie");

//GET
router.get("/", (req, res) => {
  MovieModel.find()
    .then((movieList) => {
      res.json(movieList);
    })
    .catch((errorMsg) => {
      res.json(errorMsg);
    });
});

//POST
router.post("/", function (req, res) {
  const movie = new MovieModel(req.body);
  // movie.save((err, data) => {
  //   if (err) {
  //     res.json(err);
  //   }
  //   res.json(data);
  // });
  movie
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
