const express = require('express')
const router = express.Router()
const Post = require('../models/post')
const bycrypt = require('bcrypt')



// home route - login and signup page
router.get('/', (req, res)=> {
    res.render('index')

})


// app interface route

// router.get('/login', (req, res) => {
//     res.render('login')
// })



// router.post('/login', (req, res)=> {

// })


// router.post('/register', (req, res)=> {
    
// })




module.exports = router