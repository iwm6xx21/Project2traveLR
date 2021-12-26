const express = require('express')
const router = express.Router()
const Post = require('../models/post')
const User = require('../models/user')


// login and sign up route
router.get('/', (req, res)=> {
    
        res.render('index')
    })

// route to picture upload form

router.get('/new', (req, res)=> {
    res.render('new')
})

// route to post new picture upload on home page 
router.post('/home', (req,res) => {
    Post.create(req.body, (err, posts) => {
        res.redirect('/home' )
    })
})


// route to obtain new post data from database and render them to the home page
router.get('/home', (req, res)=> {
    Post.find({}, (err, posts) => {
        res.render('home', {posts})
    })
})


// route hit once user has either logged in to an existing account or registered for a new account
router.get('/home', (req, res) => {
    res.render('home')
    
})

// route for posting new user information to database and render user to home page. 

router.post('/home', async (req, res) => {
    const newUser = await User.create(req.body)
    req.session.username = newUser.username
    res.render('home')
})

// route to delete posted item




module.exports = router