const express = require('express')
const router = express.Router()
const bycrypt = require('bcrypt')
const User = require('../models/user')
const { redirect } = require('express/lib/response')
const Post = require('../models/post')




// // route to picture uplioad form

// router.get('/new', (req, res)=> {
//     res.render('sessions/new')
// })

// // route to post new picture upload on home page 
// router.post('/new', (req,res) => {
//     Post.create(req.body, (err, createdPost) => {
//         res.render('sessions/home')
//     })
// })

// // route hit once user has either logged in to an existing account or registered for a new account
// router.get('/home', (req, res) => {
//     res.render('sessions/home')
    
// })

// // route for posting new user information to database and render user to home page. 

// router.post('/home', async (req, res) => {
//     const newUser = await User.create(req.body)
//     req.session.username = newUser.username
//     res.render('sessions/home')
// })










module.exports = router