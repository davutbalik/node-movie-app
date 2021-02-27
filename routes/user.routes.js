var express = require("express");
var router = express.Router();
const bcrypt = require('bcrypt');

//model
const UserModel = require("../models/User");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", (req, res, next) => {
  const { username, password } = req.body;

  bcrypt.hash(password, 10).then(function(hash) {
    // Store hash in your password DB.
    const newUser = new UserModel({ username, password:hash});
  newUser
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

  
});

module.exports = router;
