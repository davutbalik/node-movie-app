const const express = require('express')
const router = express.Router()

const DirectorModel = require('../models/Director')

router.get('/', (req,res,next)=>{
    res.json("GET request to the Director APIII")
})

module.exports = router;