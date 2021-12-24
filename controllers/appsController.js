const express = require('express')
const router = express.Router()
const Post = require('../models/post')


// login and sign up route
router.get('/', (req, res)=> {
    res.render('index')

})




module.exports = router