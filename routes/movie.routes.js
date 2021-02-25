const express = require("express");
const router = express.Router();
//MODEL
const MovieModel = require("../models/Movie");

var bodyParser = require('body-parser');
router.use(bodyParser.json());


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

// GET A MOVIE
router.get("/:movieId", (req, res, next) => {
  MovieModel.findById(req.params.movieId)
    .then((movieList) => {
      res.json(movieList);
    })
    .catch((err) => {
      next({ message: "The movie was not found!", code: 99 });
      res.json(err);
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