var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//model
const UserModel = require("../models/User");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post("/register", (req, res, next) => {
  const { username, password } = req.body;

  bcrypt.hash(password, 10).then(function (hash) {
    // Store hash in your password DB.
    const newUser = new UserModel({ username, password: hash });
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

router.post("/authenticate", (req, res) => {
  const { username, password } = req.body;
  UserModel.findOne({ username })
    .then((resultUser) => {
      if (!resultUser) {
        res.end("user not found");
      } else {
        bcrypt
          .compare(password, resultUser.password)
          .then((resultCompare) => {
            if (!resultCompare) {
              res.end("Authentication failed,wrong pass....");
            } else {
              const payload = { username };
              //JWT
              const token = jwt.sign(payload, req.app.get("api_secret_key"), { expiresIn: 6000 });
              res.json({ status: true, token });
            }
          })
          .catch(() => {});
      }
      //res.json(resultUser)
    })
    .catch((err) => {
      res.json(err);
    });
});


module.exports = router;
