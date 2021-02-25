const express = require('express')
const router = express.Router()

const DirectorModel = require('../models/Director')

router.get('/', (req,res,next)=>{
    res.json("GET request to the Director APIII")
})

router.post("/", function (req, res) {
    const newDirector = new DirectorModel(req.body);
    
    newDirector
      .save()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
          next({message:'the director was not',code:99})
        res.json(err);
      });
  });
  

  

module.exports = router;