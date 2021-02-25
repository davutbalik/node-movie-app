const express = require("express");
const router = express.Router();
//MODEL
const MovieModel = require("../models/Movie");

var bodyParser = require("body-parser");
router.use(bodyParser.json());

router.get("/top10", (req, res) => {
  MovieModel.find().sort({imdb_score:-1}).limit(10)
    .then((movieList) => {
      res.json(movieList);
    })
    .catch((errorMsg) => {
      res.json(errorMsg);
    });
});

router.get("/between/:startYear/:endYear", (req, res) => {
  const {startYear,endYear}=req.params;
  //gte greater than or equal lte less than or equal
  MovieModel.find({year:{"$gte":parseInt(startYear),"$lte":parseInt(endYear)}})
    .then((movieList) => {
      res.json(movieList);
    })
    .catch((errorMsg) => {
      res.json(errorMsg);
    });
});

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

router.put("/:movieId", (req, res, next) => {
  MovieModel.findByIdAndUpdate(req.params.movieId,req.body,{new:true})
    .then((data) => {res.json(data)})
    .catch((err) => {
      next({ message: "the movie was not found", code: 99 });
      res.json(err);
    });
});

router.delete('/:movieId', (req,res,next)=>{
  MovieModel.findByIdAndRemove(req.params.movieId)
  .then((data) => {res.json(data)})
  .catch((err) => {
    next({ message: "the movie was not found", code: 99 });
    res.json(err);
  });
})

module.exports = router;
